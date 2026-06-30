const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { pathToFileURL } = require("node:url");
const Module = require("node:module");

const workspaceRoot = path.resolve(__dirname, "..");

function findMarkdownPdfExtension() {
  const roots = [
    process.env.VSCODE_EXTENSIONS,
    path.join(os.homedir(), ".vscode", "extensions"),
    path.join(os.homedir(), ".vscode-insiders", "extensions"),
  ].filter(Boolean);

  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    const candidates = fs
      .readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name.startsWith("yzane.markdown-pdf-"))
      .map((entry) => path.join(root, entry.name, "dist", "extension.js"))
      .filter((file) => fs.existsSync(file))
      .sort()
      .reverse();

    if (candidates.length > 0) return candidates[0];
  }

  throw new Error("Extensao VS Code 'yzane.markdown-pdf' nao encontrada.");
}

function findBrowserExecutable() {
  const candidates = [
    process.env.MARKDOWN_PDF_EXECUTABLE,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].filter(Boolean);

  const executable = candidates.find((candidate) => fs.existsSync(candidate));
  if (!executable) {
    throw new Error("Chrome, Chromium ou Edge nao encontrado. Defina MARKDOWN_PDF_EXECUTABLE.");
  }
  return executable;
}

function listMarkdownSourcesForTrackedPdfs() {
  const output = execFileSync("git", ["ls-files", "*.pdf"], {
    cwd: workspaceRoot,
    encoding: "utf8",
  });

  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .map((pdf) => pdf.replace(/\.pdf$/i, ".md"))
    .filter((markdown) => fs.existsSync(path.join(workspaceRoot, markdown)));
}

function makeUri(filePath) {
  const resolved = path.resolve(filePath);
  return { fsPath: resolved, toString: () => pathToFileURL(resolved).href };
}

async function main() {
  const extensionPath = findMarkdownPdfExtension();
  const browserExecutable = findBrowserExecutable();
  const markdownFiles = listMarkdownSourcesForTrackedPdfs();

  if (markdownFiles.length === 0) {
    throw new Error("Nenhum PDF rastreado com Markdown correspondente foi encontrado.");
  }

  const commands = new Map();
  const config = {
    type: ["pdf"],
    convertOnSave: false,
    convertOnSaveExclude: [],
    outputDirectory: "",
    outputDirectoryRelativePathFile: false,
    sanitize: "none",
    styles: [],
    stylesRelativePathFile: false,
    includeDefaultStyles: true,
    highlight: true,
    highlightStyle: "",
    breaks: false,
    emoji: true,
    executablePath: browserExecutable,
    chromium: { autoDownload: false },
    scale: 1,
    displayHeaderFooter: true,
    headerTemplate:
      "<div style=\"font-size: 9px; margin-left: 1cm;\"> <span class='title'></span></div> <div style=\"font-size: 9px; margin-left: auto; margin-right: 1cm; \">%%ISO-DATE%%</div>",
    footerTemplate:
      "<div style=\"font-size: 9px; margin: 0 auto;\"> <span class='pageNumber'></span> / <span class='totalPages'></span></div>",
    printBackground: true,
    orientation: "portrait",
    pageRanges: "",
    format: "A4",
    width: "",
    height: "",
    margin: { top: "1.5cm", right: "1cm", bottom: "1cm", left: "1cm" },
    quality: 100,
    clip: { x: null, y: null, width: null, height: null },
    omitBackground: false,
    plantumlOpenMarker: "@startuml",
    plantumlCloseMarker: "@enduml",
    plantumlServer: "http://www.plantuml.com/plantuml",
    StatusbarMessageTimeout: 10000,
    "markdown-it-include": { enable: true },
    mermaidServer: "",
    math: { enabled: true, katex: { macros: {} } },
    debug: false,
  };
  config.get = (key) => config[key];

  const vscode = {
    commands: {
      registerCommand(name, callback) {
        commands.set(name, callback);
        return { dispose() {} };
      },
    },
    workspace: {
      getConfiguration() {
        return config;
      },
      getWorkspaceFolder() {
        return { uri: makeUri(workspaceRoot), name: path.basename(workspaceRoot), index: 0 };
      },
      onDidSaveTextDocument() {
        return { dispose() {} };
      },
    },
    window: {
      activeTextEditor: null,
      setStatusBarMessage() {
        return { dispose() {} };
      },
      showWarningMessage(message) {
        if (message) console.warn(String(message));
      },
      showErrorMessage(message, error) {
        console.error(String(message || ""), error || "");
      },
      withProgress(_options, task) {
        return task();
      },
    },
    ProgressLocation: { Notification: 15 },
    env: { language: "pt-BR" },
    Uri: { file: makeUri },
  };

  const originalLoad = Module._load;
  Module._load = function patchedLoad(request, parent, isMain) {
    if (request === "vscode") return vscode;
    return originalLoad.apply(this, arguments);
  };

  const extension = require(extensionPath);
  const cachePath = path.join(os.tmpdir(), "curso-lions-dev-markdown-pdf-cache");
  fs.mkdirSync(cachePath, { recursive: true });
  extension.activate({
    subscriptions: [],
    globalStorageUri: makeUri(cachePath),
    globalStoragePath: cachePath,
  });

  const exportPdf = commands.get("extension.markdown-pdf.pdf");
  if (!exportPdf) throw new Error("Comando extension.markdown-pdf.pdf nao registrado.");

  for (const relativeFile of markdownFiles) {
    const absoluteFile = path.resolve(workspaceRoot, relativeFile);
    if (!absoluteFile.toLowerCase().startsWith(workspaceRoot.toLowerCase())) {
      throw new Error(`Markdown fora do workspace: ${absoluteFile}`);
    }

    const pdfFile = absoluteFile.replace(/\.md$/i, ".pdf");
    if (fs.existsSync(pdfFile)) fs.rmSync(pdfFile, { force: true });

    const uri = makeUri(absoluteFile);
    vscode.window.activeTextEditor = {
      document: {
        languageId: "markdown",
        uri,
        fileName: absoluteFile,
        isUntitled: false,
        getText: () => fs.readFileSync(absoluteFile, "utf8"),
      },
    };

    console.log(`Gerando PDF: ${relativeFile}`);
    await exportPdf();

    if (!fs.existsSync(pdfFile) || fs.statSync(pdfFile).size === 0) {
      throw new Error(`PDF nao foi gerado: ${pdfFile}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
