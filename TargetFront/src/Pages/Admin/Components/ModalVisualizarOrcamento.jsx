import { Alert, Button, Descriptions, Divider, List, Modal, Space, Tag } from "antd";
import dayjs from "dayjs";
import PrevisaoClima from "../../../Components/Clima/PrevisaoClima";
import {
  STATUS_PAGAMENTO_COLOR,
  STATUS_PAGAMENTO_LABEL,
  formatarMoeda,
} from "../../../services/financeiro.service";

const TIPO_SERVICO_LABEL = {
  mapeamento: "Mapeamento",
  pulverizacao: "Pulverização",
  solidos: "Aplicação de Sólidos",
};

function statusTag(status) {
  const map = {
    Pendente: "orange",
    AguardandoCliente: "gold",
    Agendado: "green",
    Aprovado: "blue",
    Rejeitado: "red",
    RespondidoAoCliente: "cyan",
    "Concluído": "default",
  };
  const labels = {
    AguardandoCliente: "Aguard. Cliente",
    RespondidoAoCliente: "Respondido ao cliente",
  };
  return <Tag color={map[status] || "default"}>{labels[status] || status}</Tag>;
}

function pagamentoTag(record) {
  if (record.Status === "Rejeitado") return <Tag color="red">Cancelado</Tag>;
  if (!record.StatusPagamento) return <Tag>Sem registro</Tag>;
  return (
    <Tag color={STATUS_PAGAMENTO_COLOR[record.StatusPagamento] || "default"}>
      {STATUS_PAGAMENTO_LABEL[record.StatusPagamento] || record.StatusPagamento}
    </Tag>
  );
}

function obterDataOperacao(orcamento) {
  if (orcamento.DataAgendada) return orcamento.DataAgendada;
  const primeiroServico = orcamento.Servicos?.[0];
  if (primeiroServico?.data) return primeiroServico.data;
  return orcamento.DataSolicitada;
}

function obterCidadeClima(orcamento) {
  return orcamento.Cidade || orcamento.Fazenda || undefined;
}

export default function ModalVisualizarOrcamento({
  orcamento,
  open,
  onClose,
  footerExtra,
}) {
  if (!orcamento) return null;

  const dataOperacao = obterDataOperacao(orcamento);
  const cidadeClima = obterCidadeClima(orcamento);
  const areaTotal = (orcamento.Servicos || []).reduce(
    (acc, s) => acc + (Number(s.area) || 0),
    0,
  );

  return (
    <Modal
      title={`Orçamento #${orcamento.IdOrcamento}`}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="fechar" onClick={onClose}>
          Fechar
        </Button>,
        ...(footerExtra ? [footerExtra] : []),
      ]}
      width={720}
      destroyOnClose
    >
      <Descriptions bordered size="small" column={2}>
        <Descriptions.Item label="Situação" span={2}>
          <Space wrap>
            {statusTag(orcamento.Status)}
            {orcamento.ClienteNovo && <Tag color="purple">Cliente novo</Tag>}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Cliente">{orcamento.NomeContato || orcamento.Cliente}</Descriptions.Item>
        <Descriptions.Item label="Telefone">{orcamento.Telefone || "—"}</Descriptions.Item>
        {orcamento.EmailCliente && (
          <Descriptions.Item label="E-mail" span={2}>
            {orcamento.EmailCliente}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Propriedade / Fazenda" span={2}>
          {orcamento.Fazenda || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Cidade">{orcamento.Cidade || "—"}</Descriptions.Item>
        <Descriptions.Item label="Área total">
          {areaTotal > 0 ? `${areaTotal.toLocaleString("pt-BR")} ha` : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Valor estimado">
          {formatarMoeda(orcamento.VlrEstimado)}
        </Descriptions.Item>
        <Descriptions.Item label="Pagamento">{pagamentoTag(orcamento)}</Descriptions.Item>
        {orcamento.StatusPagamento && (
          <>
            <Descriptions.Item label="Valor pago">
              {formatarMoeda(orcamento.VlrPago ?? 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Saldo">
              {formatarMoeda(orcamento.Saldo ?? 0)}
            </Descriptions.Item>
          </>
        )}
        <Descriptions.Item label="Data solicitação">
          {orcamento.DataSolicitada
            ? dayjs(orcamento.DataSolicitada).format("DD/MM/YYYY")
            : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Data agendada">
          {orcamento.DataAgendada
            ? dayjs(orcamento.DataAgendada).format("DD/MM/YYYY")
            : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Aprov. admin">
          {orcamento.AprovadoAdmin ? "Sim" : "Não"}
        </Descriptions.Item>
        <Descriptions.Item label="Aprov. cliente">
          {orcamento.AprovadoCliente ? "Sim" : "Não"}
        </Descriptions.Item>
      </Descriptions>

      {orcamento.ObservacaoCliente && (
        <Alert
          type="warning"
          showIcon
          style={{ marginTop: 16 }}
          message="Observação para o cliente"
          description={orcamento.ObservacaoCliente}
        />
      )}

      <Divider orientation="left" style={{ marginTop: 20 }}>
        Serviços solicitados
      </Divider>

      <List
        bordered
        dataSource={orcamento.Servicos || []}
        locale={{ emptyText: "Nenhum serviço informado" }}
        renderItem={(item) => (
          <List.Item>
            <Space direction="vertical" size={2} style={{ width: "100%" }}>
              <strong>{TIPO_SERVICO_LABEL[item.tipo] || item.tipo}</strong>
              <span>Área: {item.area} ha</span>
              <span>
                Data execução:{" "}
                {item.data ? dayjs(item.data).format("DD/MM/YYYY") : "—"}
              </span>
              <span>Valor: {formatarMoeda(item.valor ?? 0)}</span>
            </Space>
          </List.Item>
        )}
      />

      <Divider orientation="left" style={{ marginTop: 20 }}>
        Previsão do tempo
        {dataOperacao && (
          <span style={{ fontWeight: 400, fontSize: 13, marginLeft: 8 }}>
            — {dayjs(dataOperacao).format("DD/MM/YYYY")}
          </span>
        )}
      </Divider>

      {dataOperacao ? (
        <PrevisaoClima cidade={cidadeClima} data={dataOperacao} />
      ) : (
        <Alert type="info" showIcon message="Sem data de operação para consultar o clima." />
      )}
    </Modal>
  );
}
