export function mapSolicitacaoPayload(values) {
  return {
    fazenda: values.fazenda,
    nome: values.nome,
    telefone: values.telefone,
    servicos: (values.servicos || []).map((s) => ({
      tipo: s.tipo,
      area: s.area,
      data: s.data?.toISOString?.() ?? s.data,
    })),
  };
}
