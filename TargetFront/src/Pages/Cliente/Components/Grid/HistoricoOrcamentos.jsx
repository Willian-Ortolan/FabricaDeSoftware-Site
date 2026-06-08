import { Card, Spin, Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import BarraFiltrosGrid from "../../../../Components/GridPadrao/BarraFiltrosGrid";
import GridPadrao from "../../../../Components/GridPadrao/GridPadrao";
import { getHistoricoOrcamentos } from "../../../../services/cliente.service";
import {
  filtrarHistoricoOrcamentos,
  opcoesUnicas,
  parseDataBr,
  STATUS_HISTORICO_CLIENTE_OPCOES,
} from "../../../../utils/filtroGrid";

function normalizarLista(lista) {
  return (lista || []).map((item) => ({
    id: item.id ?? item.Id,
    data: item.data ?? item.Data ?? "",
    propriedade: item.propriedade ?? item.Propriedade ?? "",
    servico: item.servico ?? item.Servico ?? "",
    status: item.status ?? item.Status ?? "",
  }));
}

function renderStatus(status) {
  let color = "default";
  if (status === "Concluído") color = "green";
  if (status === "Agendado") color = "blue";
  if (status === "Pendente") color = "orange";
  return <Tag color={color}>{status}</Tag>;
}

const columns = [
  {
    title: "Data",
    dataIndex: "data",
    key: "data",
    sorter: (a, b) => parseDataBr(a.data) - parseDataBr(b.data),
    defaultSortOrder: "descend",
  },
  {
    title: "Propriedade",
    dataIndex: "propriedade",
    key: "propriedade",
    sorter: (a, b) => a.propriedade.localeCompare(b.propriedade, "pt-BR"),
  },
  {
    title: "Serviço",
    dataIndex: "servico",
    key: "servico",
    sorter: (a, b) => a.servico.localeCompare(b.servico, "pt-BR"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status, "pt-BR"),
    render: renderStatus,
  },
];

export default function HistoricoOrcamentos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroPropriedade, setFiltroPropriedade] = useState("");
  const [filtroServico, setFiltroServico] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getHistoricoOrcamentos();
      setData(normalizarLista(result));
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const opcoesPropriedade = useMemo(
    () => opcoesUnicas(data, "propriedade"),
    [data],
  );

  const opcoesServico = useMemo(() => opcoesUnicas(data, "servico"), [data]);

  const dataFiltrada = useMemo(
    () =>
      filtrarHistoricoOrcamentos(data, {
        propriedade: filtroPropriedade,
        servico: filtroServico,
        status: filtroStatus,
      }),
    [data, filtroPropriedade, filtroServico, filtroStatus],
  );

  function limparFiltros() {
    setFiltroPropriedade("");
    setFiltroServico("");
    setFiltroStatus("");
  }

  return (
    <Spin spinning={loading}>
      <Card title="Evolução das Operações">
        <BarraFiltrosGrid
          showCliente={false}
          showServico
          propriedade={filtroPropriedade}
          onPropriedadeChange={setFiltroPropriedade}
          propriedadeOptions={opcoesPropriedade}
          servico={filtroServico}
          onServicoChange={setFiltroServico}
          servicoOptions={opcoesServico}
          status={filtroStatus}
          onStatusChange={setFiltroStatus}
          statusOptions={STATUS_HISTORICO_CLIENTE_OPCOES}
          statusPlaceholder="Status"
          onLimpar={limparFiltros}
        />
        <GridPadrao
          columns={columns}
          data={dataFiltrada}
          rowKey="id"
          pageSize={10}
          showSizeChanger={false}
          scroll={{ x: 720 }}
        />
      </Card>
    </Spin>
  );
}
