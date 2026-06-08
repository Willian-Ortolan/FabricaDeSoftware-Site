export function normalizarBusca(texto) {
  return (texto || "").trim().toLowerCase();
}

export function contemTexto(valor, busca) {
  if (!busca) return true;
  return String(valor ?? "").toLowerCase().includes(busca);
}

export function parseDataBr(dataStr) {
  const [dia, mes, ano] = (dataStr || "").split("/").map(Number);
  if (!dia || !mes || !ano) return 0;
  return new Date(ano, mes - 1, dia).getTime();
}

export function opcoesUnicas(lista, campo) {
  return [...new Set(lista.map((item) => item[campo]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .map((valor) => ({ value: valor, label: valor }));
}

export function filtrarSolicitacoes(lista, { propriedade, servico, status }) {
  return lista.filter((item) => {
    const prop = item.propriedade ?? item.Propriedade ?? "";
    const st = item.status ?? item.Status ?? "";
    const servicos = item.servicos ?? item.Servicos ?? [];
    const resumoServico = item.servico ?? item.Servico ?? "";

    if (status && st !== status) return false;
    if (propriedade && prop !== propriedade) return false;

    if (servico) {
      const matchServico =
        resumoServico === servico ||
        servicos.some(
          (s) => (s.servico ?? s.Servico ?? "") === servico,
        );
      if (!matchServico) return false;
    }

    return true;
  });
}

export function opcoesServicosSolicitacao(lista) {
  const valores = new Set();
  lista.forEach((item) => {
    (item.servicos ?? item.Servicos ?? []).forEach((s) => {
      const nome = s.servico ?? s.Servico;
      if (nome) valores.add(nome);
    });
  });
  return [...valores]
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .map((valor) => ({ value: valor, label: valor }));
}

export function filtrarHistoricoOrcamentos(lista, { propriedade, servico, status }) {
  return lista.filter((item) => {
    const prop = item.propriedade ?? item.Propriedade ?? "";
    const serv = item.servico ?? item.Servico ?? "";
    const st = item.status ?? item.Status ?? "";

    if (status && st !== status) return false;
    if (propriedade && prop !== propriedade) return false;
    if (servico && serv !== servico) return false;
    return true;
  });
}

export const STATUS_HISTORICO_CLIENTE_OPCOES = [
  { value: "Pendente", label: "Pendente" },
  { value: "Agendado", label: "Agendado" },
  { value: "Concluído", label: "Concluído" },
];

export function filtrarOrcamentos(lista, { cliente, propriedade, status }) {
  const buscaCliente = normalizarBusca(cliente);
  const buscaPropriedade = normalizarBusca(propriedade);

  return lista.filter((item) => {
    if (status && item.Status !== status) return false;
    if (!contemTexto(item.Cliente, buscaCliente)) return false;
    if (
      buscaPropriedade &&
      !contemTexto(item.Fazenda, buscaPropriedade) &&
      !contemTexto(item.Cidade, buscaPropriedade)
    ) {
      return false;
    }
    return true;
  });
}

export function filtrarFinanceiro(lista, { cliente, propriedade, status }) {
  const buscaCliente = normalizarBusca(cliente);
  const buscaPropriedade = normalizarBusca(propriedade);

  return lista.filter((item) => {
    if (status && item.StatusPagamento !== status) return false;
    if (!contemTexto(item.Cliente, buscaCliente)) return false;
    if (
      buscaPropriedade &&
      !contemTexto(item.Fazenda, buscaPropriedade) &&
      !contemTexto(item.Cidade, buscaPropriedade)
    ) {
      return false;
    }
    return true;
  });
}

export const STATUS_ORCAMENTO_OPCOES = [
  { value: "Pendente", label: "Pendente" },
  { value: "AguardandoCliente", label: "Aguard. Cliente" },
  { value: "Agendado", label: "Agendado" },
  { value: "Aprovado", label: "Aprovado" },
  { value: "Rejeitado", label: "Rejeitado" },
  { value: "RespondidoAoCliente", label: "Respondido ao cliente" },
  { value: "Concluído", label: "Concluído" },
];
