import { Alert, Card, Col, DatePicker, Empty, Row, Segmented, Select, Spin, Typography } from "antd";
import { Area } from "@ant-design/plots";
import { useEffect, useMemo, useState } from "react";
import { getHistoricoOperacoes, getPropriedades } from "../../../services/cliente.service";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const tipos = [
  { key: "pulverizacao", titulo: "Pulverização", color: "#1677ff" },
  { key: "solidos", titulo: "Sólidos", color: "#52c41a" },
  { key: "mapeamento", titulo: "Mapeamentos", color: "#ff4d4f" },
];

const opcoesPeriodo = [
  { label: "Semanal", value: "semanal" },
  { label: "Mensal", value: "mensal" },
  { label: "Período", value: "periodo" },
];

const opcoesStatus = [
  { value: "Agendado", label: "Agendado" },
  { value: "Concluído", label: "Concluído" },
  { value: "Pendente", label: "Pendente" },
  { value: "AguardandoCliente", label: "Aguardando aprovação" },
  { value: "Rejeitado", label: "Rejeitado" },
  { value: "Aprovado", label: "Aprovado" },
  { value: "RespondidoAoCliente", label: "Respondido ao cliente" },
];

function normalizarRespostaGrafico(resposta) {
  const pontos = resposta?.pontos ?? resposta?.Pontos ?? [];
  const total = Number(resposta?.total ?? resposta?.Total ?? 0);

  const dados = pontos.map((ponto) => ({
    rotulo: ponto.rotulo ?? ponto.Rotulo ?? "",
    valor: Number(ponto.valor ?? ponto.Valor ?? 0),
  }));

  return { dados, total };
}

function buildConfig(dados, color) {
  return {
    data: dados,
    xField: "rotulo",
    yField: "valor",
    smooth: true,
    height: 280,
    autoFit: true,
    color,
    animation: false,
    style: {
      fill: `linear-gradient(-90deg, #ffffff 0%, ${color} 100%)`,
    },
    line: { style: { lineWidth: 3, stroke: color } },
    point: {
      size: 4,
      shape: "circle",
      style: { fill: "#fff", stroke: color, lineWidth: 2 },
    },
    axis: {
      y: { title: false },
      x: { title: false },
    },
    legend: false,
  };
}

async function carregarPropriedades() {
  const propriedades = await getPropriedades();
  return (propriedades || [])
    .map((item) => ({
      id: item.id ?? item.Id,
      nome: (item.nome ?? item.Nome)?.trim(),
    }))
    .filter((item) => item.id && item.nome)
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

function GraficoOperacaoTipo({ tipo, titulo, color, propriedades }) {
  const [periodo, setPeriodo] = useState("mensal");
  const [propriedadeId, setPropriedadeId] = useState(null);
  const [statusSelecionados, setStatusSelecionados] = useState([]);
  const [range, setRange] = useState(null);
  const [dados, setDados] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const rangeKey =
    periodo === "periodo" && range?.[0] && range?.[1]
      ? `${range[0].format("YYYY-MM-DD")}_${range[1].format("YYYY-MM-DD")}`
      : "";

  const statusKey = statusSelecionados.join(",");

  const opcoesPropriedade = useMemo(
    () => [
      { value: "", label: "Todas as fazendas" },
      ...propriedades.map((item) => ({
        value: String(item.id),
        label: item.nome,
      })),
    ],
    [propriedades],
  );

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      if (periodo === "periodo" && !rangeKey) {
        if (!cancelado) {
          setDados([]);
          setTotal(0);
          setErro(null);
          setLoading(false);
        }
        return;
      }

      try {
        if (!cancelado) {
          setLoading(true);
          setErro(null);
        }

        const params = { periodo };
        if (propriedadeId) params.propriedadeId = Number(propriedadeId);
        if (statusSelecionados.length > 0) params.status = statusSelecionados;
        if (periodo === "periodo" && rangeKey) {
          const [dataInicio, dataFim] = rangeKey.split("_");
          params.dataInicio = dataInicio;
          params.dataFim = dataFim;
        }

        const resposta = await getHistoricoOperacoes(tipo, params);
        if (!cancelado) {
          const { dados: serie, total: totalOperacoes } = normalizarRespostaGrafico(resposta);
          setDados(serie);
          setTotal(totalOperacoes);
        }
      } catch (err) {
        if (!cancelado) {
          setDados([]);
          setTotal(0);
          setErro(
            err.response?.data?.mensagem ||
              err.response?.data?.message ||
              err.message ||
              "Erro ao carregar gráfico",
          );
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [tipo, periodo, propriedadeId, statusKey, rangeKey]);

  const chartConfig = useMemo(() => buildConfig(dados, color), [dados, color]);

  const chartKey = useMemo(
    () =>
      [
        tipo,
        periodo,
        propriedadeId ?? "todas",
        statusKey || "todos-status",
        rangeKey || "sem-range",
        total,
        dados.map((item) => `${item.rotulo}:${item.valor}`).join("|"),
      ].join("__"),
    [tipo, periodo, propriedadeId, statusKey, rangeKey, total, dados],
  );

  const aguardandoPeriodo = periodo === "periodo" && !rangeKey;
  const legendaPeriodo =
    periodo === "semanal"
      ? "Semana atual (seg–dom)"
      : periodo === "mensal"
        ? "Últimos 12 meses"
        : "Período personalizado";

  const temDados = total > 0;

  return (
    <Card
      size="small"
      title={titulo}
      styles={{ header: { borderBottomColor: color } }}
      extra={
        <Text type="secondary" style={{ fontSize: 12 }}>
          {total} op.
        </Text>
      }
    >
      <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <Select
          size="small"
          placeholder="Todas as fazendas"
          value={propriedadeId ?? ""}
          onChange={(valor) => setPropriedadeId(valor || null)}
          options={opcoesPropriedade}
          showSearch
          optionFilterProp="label"
        />
        <Select
          size="small"
          mode="multiple"
          allowClear
          placeholder="Todos os status"
          value={statusSelecionados}
          onChange={setStatusSelecionados}
          options={opcoesStatus}
          maxTagCount="responsive"
        />
        <Segmented
          size="small"
          options={opcoesPeriodo}
          value={periodo}
          onChange={setPeriodo}
          block
        />
        <Text type="secondary" style={{ fontSize: 11 }}>
          {legendaPeriodo}
        </Text>
        {periodo === "periodo" && (
          <RangePicker
            size="small"
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            value={range}
            onChange={setRange}
            placeholder={["Data inicial", "Data final"]}
          />
        )}
      </div>

      {erro && (
        <Alert type="error" message={erro} showIcon style={{ marginBottom: 12 }} />
      )}

      <Spin spinning={loading}>
        {aguardandoPeriodo ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Selecione o intervalo de datas"
            style={{ padding: "48px 0" }}
          />
        ) : !temDados ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sem dados para exibir"
            style={{ padding: "48px 0" }}
          />
        ) : (
          <div style={{ width: "100%", minHeight: 280 }}>
            <Area key={chartKey} {...chartConfig} />
          </div>
        )}
      </Spin>
    </Card>
  );
}

export default function HistoricoOperacoes() {
  const [propriedades, setPropriedades] = useState([]);
  const [loadingPropriedades, setLoadingPropriedades] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoadingPropriedades(true);
        setPropriedades(await carregarPropriedades());
      } catch {
        setPropriedades([]);
      } finally {
        setLoadingPropriedades(false);
      }
    }
    load();
  }, []);

  return (
    <Card title="Histórico de Operações">
      <Spin spinning={loadingPropriedades}>
        <Row gutter={[16, 16]}>
          {tipos.map((t) => (
            <Col xs={24} lg={8} key={t.key}>
              <GraficoOperacaoTipo
                tipo={t.key}
                titulo={t.titulo}
                color={t.color}
                propriedades={propriedades}
              />
            </Col>
          ))}
        </Row>
      </Spin>
    </Card>
  );
}
