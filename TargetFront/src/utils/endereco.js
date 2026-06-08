import { formatarCep, normalizarCep } from "./cep";

export const UFS_BR = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export function montarEnderecoCompleto({
  logradouro = "",
  numero = "",
  complemento = "",
  bairro = "",
  cidade = "",
  estado = "",
  cep = "",
} = {}) {
  const partes = [];

  if (logradouro?.trim()) {
    let linha = logradouro.trim();
    if (numero?.trim()) linha += `, ${numero.trim()}`;
    if (complemento?.trim()) linha += ` - ${complemento.trim()}`;
    partes.push(linha);
  }

  if (bairro?.trim()) partes.push(bairro.trim());

  if (cidade?.trim() && estado?.trim()) {
    partes.push(`${cidade.trim()}/${estado.trim()}`);
  } else if (cidade?.trim()) {
    partes.push(cidade.trim());
  }

  const cepNormalizado = normalizarCep(cep);
  if (cepNormalizado) {
    partes.push(`CEP ${formatarCep(cepNormalizado)}`);
  }

  return partes.join(" - ").slice(0, 500);
}
