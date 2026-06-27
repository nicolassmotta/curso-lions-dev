export function documentoSeguro(documento) {
  if (!documento) {
    return documento;
  }

  if (typeof documento.toJSON === "function") {
    return documento.toJSON();
  }

  return documento;
}

export function listaSegura(documentos) {
  const lista = [];

  for (const documento of documentos) {
    lista.push(documentoSeguro(documento));
  }

  return lista;
}
