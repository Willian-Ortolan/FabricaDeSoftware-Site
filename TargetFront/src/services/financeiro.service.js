import api from "./api";

export async function getFinanceiro(status) {
  const { data } = await api.get("/admin/financeiro", {
    params: status ? { status } : undefined,
  });
  return data;
}

export async function getFinanceiroPorOrcamento(idOrcamento) {
  const { data } = await api.get(`/admin/financeiro/orcamento/${idOrcamento}`);
  return data;
}

export async function salvarFinanceiro(idOrcamento, payload) {
  const { data } = await api.put(
    `/admin/financeiro/orcamento/${idOrcamento}`,
    payload,
  );
  return data;
}

export async function registrarPagamento(idOrcamento, payload) {
  const { data } = await api.post(
    `/admin/financeiro/orcamento/${idOrcamento}/pagamentos`,
    payload,
  );
  return data;
}

export const FORMAS_PAGAMENTO = [
  { value: "PIX", label: "PIX" },
  { value: "Transferencia", label: "Transferência" },
  { value: "Dinheiro", label: "Dinheiro" },
  { value: "Boleto", label: "Boleto" },
  { value: "Outro", label: "Outro" },
];

export const TIPOS_LANCAMENTO = [
  { value: "Normal", label: "Pagamento normal" },
  { value: "QuitacaoDesconto", label: "Quitação com desconto" },
  { value: "Acrescimo", label: "Acréscimo (serviço extra)" },
];

export const TIPO_LANCAMENTO_LABEL = {
  Normal: "Normal",
  QuitacaoDesconto: "Quitação c/ desconto",
  Acrescimo: "Acréscimo",
};

export const STATUS_PAGAMENTO_LABEL = {
  AReceber: "A receber",
  Parcial: "Parcial",
  Pago: "Pago",
  Cancelado: "Cancelado",
};

export const STATUS_PAGAMENTO_COLOR = {
  AReceber: "orange",
  Parcial: "gold",
  Pago: "green",
  Cancelado: "red",
};

export function formatarMoeda(valor) {
  return (valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function labelFormaPagamento(pagamento) {
  if (pagamento.FormaPagamento === "Acrescimo") return "—";
  if (pagamento.FormaPagamento === "Outro" && pagamento.FormaPagamentoOutro) {
    return pagamento.FormaPagamentoOutro;
  }
  const item = FORMAS_PAGAMENTO.find((f) => f.value === pagamento.FormaPagamento);
  return item?.label || pagamento.FormaPagamento;
}

export function descricaoLancamento(pagamento) {
  const tipo = TIPO_LANCAMENTO_LABEL[pagamento.TipoLancamento] || pagamento.TipoLancamento;

  if (pagamento.TipoLancamento === "Acrescimo") {
    return `${tipo}: +${formatarMoeda(pagamento.ValorAcrescimo)}`;
  }

  if (pagamento.TipoLancamento === "QuitacaoDesconto") {
    return `${tipo}: ${formatarMoeda(pagamento.Valor)} + desc. ${formatarMoeda(pagamento.ValorDesconto)}`;
  }

  return `${tipo}: ${formatarMoeda(pagamento.Valor)}`;
}
