function lerCampo(item, ...chaves) {
  for (const chave of chaves) {
    const valor = item?.[chave];
    if (valor !== undefined && valor !== null && valor !== "") {
      return valor;
    }
  }
  return undefined;
}

function mapServicoItem(s, fallbackData = "") {
  return {
    tipo: lerCampo(s, "tipo", "Tipo") ?? "",
    servico: lerCampo(s, "servico", "Servico") ?? "",
    area: Number(lerCampo(s, "area", "Area") ?? 0),
    dataExecucao:
      lerCampo(s, "dataExecucao", "DataExecucao", "data", "Data") ??
      fallbackData ??
      "",
    precoPorHa: Number(lerCampo(s, "precoPorHa", "PrecoPorHa") ?? 0),
    valor: Number(lerCampo(s, "valor", "Valor") ?? 0),
  };
}

export function mapSolicitacaoFromApi(item) {
  const id = Number(
    lerCampo(item, "id", "Id", "key", "Key") ?? 0,
  );
  const dataExecucao =
    lerCampo(item, "data", "Data") ??
    "";

  let servicos = (item?.servicos ?? item?.Servicos ?? []).map((s) =>
    mapServicoItem(s, dataExecucao),
  );

  const servicoResumo = lerCampo(item, "servico", "Servico") ?? "";

  if (servicos.length === 0 && servicoResumo) {
    servicos = [
      mapServicoItem(
        {
          servico: servicoResumo,
          area: lerCampo(item, "areaTotal", "AreaTotal", "area", "Area"),
          dataExecucao,
          valor: lerCampo(item, "vlrEstimado", "VlrEstimado"),
        },
        dataExecucao,
      ),
    ];
  }

  const vlrEstimado =
    Number(lerCampo(item, "vlrEstimado", "VlrEstimado") ?? 0) ||
    servicos.reduce((acc, s) => acc + s.valor, 0);

  const areaTotal =
    Number(lerCampo(item, "areaTotal", "AreaTotal") ?? 0) ||
    servicos.reduce((acc, s) => acc + s.area, 0);

  return {
    id,
    propriedade:
      lerCampo(item, "propriedade", "Propriedade", "fazenda", "Fazenda") ??
      "",
    nomeContato:
      lerCampo(item, "nomeContato", "NomeContato", "nome", "Nome") ?? "",
    telefone: lerCampo(item, "telefone", "Telefone") ?? "",
    cidade: lerCampo(item, "cidade", "Cidade") ?? "",
    dataSolicitacao:
      lerCampo(
        item,
        "dataSolicitacao",
        "DataSolicitacao",
        "dataCriacao",
        "DataCriacao",
      ) ?? dataExecucao,
    vlrEstimado,
    areaTotal,
    servico:
      servicoResumo ||
      servicos
        .map((s) => s.servico)
        .filter(Boolean)
        .join(", "),
    data: dataExecucao,
    status: lerCampo(item, "status", "Status") ?? "",
    observacaoCliente:
      lerCampo(item, "observacaoCliente", "ObservacaoCliente") ?? null,
    servicos,
    podeEditar: Boolean(item?.podeEditar ?? item?.PodeEditar),
    podeExcluir: Boolean(item?.podeExcluir ?? item?.PodeExcluir),
    podeAprovar: Boolean(item?.podeAprovar ?? item?.PodeAprovar),
  };
}

export function mapSolicitacoesFromApi(lista) {
  return (Array.isArray(lista) ? lista : []).map(mapSolicitacaoFromApi);
}

export function mapSolicitacaoPayload(values) {
  return {
    fazenda: values.fazenda,
    nome: values.nome,
    telefone: values.telefone,
    cidade: values.cidade?.trim() || undefined,
    servicos: (values.servicos || []).map((s) => ({
      tipo: s.tipo,
      area: s.area,
      data: s.data?.toISOString?.() ?? s.data,
    })),
  };
}
