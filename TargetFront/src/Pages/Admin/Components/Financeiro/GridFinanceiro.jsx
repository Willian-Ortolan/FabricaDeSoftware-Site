import { Button, Spin, Tag, message } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import GridPadrao from "../../../../Components/GridPadrao/GridPadrao";
import BarraFiltrosGrid from "../../../../Components/GridPadrao/BarraFiltrosGrid";
import ModalFinanceiroOrcamento from "./ModalFinanceiroOrcamento";
import {
  STATUS_PAGAMENTO_COLOR,
  STATUS_PAGAMENTO_LABEL,
  formatarMoeda,
  getFinanceiro,
} from "../../../../services/financeiro.service";
import { filtrarFinanceiro } from "../../../../utils/filtroGrid";

const STATUS_PAGAMENTO_OPCOES = [
  { value: "AReceber", label: "A receber" },
  { value: "Parcial", label: "Parcial" },
  { value: "Pago", label: "Pago" },
  { value: "Cancelado", label: "Cancelado" },
];

export default function GridFinanceiro() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscaCliente, setBuscaCliente] = useState("");
  const [buscaPropriedade, setBuscaPropriedade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [modalOrcamento, setModalOrcamento] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getFinanceiro();
      setData(result);
    } catch (error) {
      message.error(error.response?.data?.mensagem || "Erro ao carregar financeiro.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const dataFiltrada = useMemo(
    () =>
      filtrarFinanceiro(data, {
        cliente: buscaCliente,
        propriedade: buscaPropriedade,
        status: filtroStatus,
      }),
    [data, buscaCliente, buscaPropriedade, filtroStatus],
  );

  function limparFiltros() {
    setBuscaCliente("");
    setBuscaPropriedade("");
    setFiltroStatus("");
  }

  const columns = [
    { title: "Nº", dataIndex: "IdOrcamento" },
    { title: "Cliente", dataIndex: "Cliente" },
    {
      title: "Propriedade",
      dataIndex: "Fazenda",
      render: (fazenda) => fazenda || "—",
    },
    {
      title: "Valor total",
      dataIndex: "VlrTotal",
      render: formatarMoeda,
    },
    {
      title: "Valor pago",
      dataIndex: "VlrPago",
      render: formatarMoeda,
    },
    {
      title: "Saldo",
      dataIndex: "Saldo",
      render: formatarMoeda,
    },
    {
      title: "Status",
      dataIndex: "StatusPagamento",
      render: (status) => (
        <Tag color={STATUS_PAGAMENTO_COLOR[status] || "default"}>
          {STATUS_PAGAMENTO_LABEL[status] || status}
        </Tag>
      ),
    },
    {
      title: "Vencimento",
      dataIndex: "DataVencimento",
      render: (d) => (d ? dayjs(d).format("DD/MM/YYYY") : "—"),
    },
    {
      title: "Ações",
      render: (_, record) => (
        <Button
          icon={<DollarOutlined />}
          onClick={() => setModalOrcamento(record)}
        >
          Gerenciar
        </Button>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <BarraFiltrosGrid
          cliente={buscaCliente}
          onClienteChange={setBuscaCliente}
          propriedade={buscaPropriedade}
          onPropriedadeChange={setBuscaPropriedade}
          status={filtroStatus}
          onStatusChange={setFiltroStatus}
          statusOptions={STATUS_PAGAMENTO_OPCOES}
          statusPlaceholder="Status do pagamento"
          onLimpar={limparFiltros}
        />

        <GridPadrao
          columns={columns}
          data={dataFiltrada}
          rowKey="IdFinanceiro"
        />
      </Spin>

      <ModalFinanceiroOrcamento
        idOrcamento={modalOrcamento?.IdOrcamento}
        statusOrcamento={modalOrcamento?.StatusOrcamento}
        open={!!modalOrcamento}
        onClose={() => setModalOrcamento(null)}
        onUpdated={carregar}
      />
    </>
  );
}
