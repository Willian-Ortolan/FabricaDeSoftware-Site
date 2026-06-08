export function normalizarCep(valor = "") {
  return String(valor).replace(/\D/g, "").slice(0, 8);
}

export function formatarCep(valor = "") {
  const digits = normalizarCep(valor);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function cepValido(valor) {
  return normalizarCep(valor).length === 8;
}

export async function buscarEnderecoPorCep(cep) {
  const digits = normalizarCep(cep);
  if (digits.length !== 8) {
    throw new Error("Informe um CEP válido com 8 dígitos");
  }

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!response.ok) {
    throw new Error("Não foi possível consultar o CEP");
  }

  const data = await response.json();
  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return {
    cep: formatarCep(data.cep ?? digits),
    logradouro: data.logradouro ?? "",
    bairro: data.bairro ?? "",
    cidade: data.localidade ?? "",
    estado: data.uf ?? "",
  };
}
