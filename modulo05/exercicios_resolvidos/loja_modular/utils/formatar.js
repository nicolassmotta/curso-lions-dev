function formatarReal(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

export default formatarReal;
