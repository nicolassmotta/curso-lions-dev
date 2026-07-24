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

function listMarkdownFromArgs() {
  const args = process.argv.slice(2).filter(Boolean);
  if (args.length === 0) return null;

  return args.map((arg) => {
    const absolute = path.resolve(workspaceRoot, arg);
    const relative = path.relative(workspaceRoot, absolute);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error(`Markdown fora do workspace: ${arg}`);
    }
    if (!/\.md$/i.test(absolute)) {
      throw new Error(`Nao e um arquivo .md: ${arg}`);
    }
    if (!fs.existsSync(absolute)) {
      throw new Error(`Markdown nao encontrado: ${arg}`);
    }
    return relative.split(path.sep).join("/");
  });
}

function makeUri(filePath) {
  const resolved = path.resolve(filePath);
  return { fsPath: resolved, toString: () => pathToFileURL(resolved).href };
}

async function main() {
  const extensionPath = findMarkdownPdfExtension();
  const browserExecutable = findBrowserExecutable();
  const markdownFiles = listMarkdownFromArgs() || listMarkdownSourcesForTrackedPdfs();

  if (markdownFiles.length === 0) {
    throw new Error("Nenhum PDF rastreado com Markdown correspondente foi encontrado.");
  }

  const commands = new Map();

  const simboloPath = path.join(__dirname, "marca", "simbolo_preto.png");
  const simboloDataUri = fs.existsSync(simboloPath)
    ? `data:image/png;base64,${fs.readFileSync(simboloPath).toString("base64")}`
    : "";

  const headerTemplate = `<div style="width: 100%; box-sizing: border-box; padding: 0 1cm 5px 1cm; border-bottom: 1.5px solid #E16D34; font-family: 'Segoe UI', Arial, sans-serif; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        ${simboloDataUri ? `<img src="${simboloDataUri}" style="height: 26px; width: auto; margin-right: 8px;" />` : ""}
        <div style="line-height: 1.1;">
          <div style="font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #000000;">LIONS<span style="color: #E16D34;">DEV</span></div>
          <div style="font-size: 7px; letter-spacing: 0.5px; color: #6B7280;">Curso de Programa&ccedil;&atilde;o</div>
        </div>
      </div>
      <span style="font-size: 8px; color: #6B7280;">P&aacute;gina <span class="pageNumber"></span> de <span class="totalPages"></span></span>
    </div>`;

  const footerTemplate = `<div style="width: 100%; box-sizing: border-box; padding: 0 1cm; font-family: 'Segoe UI', Arial, sans-serif; font-size: 8px; color: #6B7280; text-align: center;">
      Professor Nicolas Cardoso Motta &nbsp;&bull;&nbsp; LIONS<span style="color: #E16D34; font-weight: 700;">DEV</span>
    </div>`;

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
    headerTemplate,
    footerTemplate,
    printBackground: true,
    orientation: "portrait",
    pageRanges: "",
    format: "A4",
    width: "",
    height: "",
    margin: { top: "2.2cm", right: "1cm", bottom: "1.5cm", left: "1cm" },
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
