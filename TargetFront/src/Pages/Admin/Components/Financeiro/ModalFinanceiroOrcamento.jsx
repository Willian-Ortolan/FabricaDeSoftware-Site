import {
  Alert,
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  FORMAS_PAGAMENTO,
  STATUS_PAGAMENTO_COLOR,
  STATUS_PAGAMENTO_LABEL,
  TIPOS_LANCAMENTO,
  descricaoLancamento,
  formatarMoeda,
  getFinanceiroPorOrcamento,
  labelFormaPagamento,
  registrarPagamento,
  salvarFinanceiro,
} from "../../../../services/financeiro.service";
import {
  LIMITES,
  propsInputMoeda,
  regraMoedaPositiva,
  regrasTextoOpcional,
} from "../../../../utils/validacao";

export default function ModalFinanceiroOrcamento({
  idOrcamento,
  statusOrcamento,
  open,
  onClose,
  onUpdated,
}) {
  const [formCabecalho] = Form.useForm();
  const [formPagamento] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [financeiro, setFinanceiro] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState("PIX");
  const [tipoLancamento, setTipoLancamento] = useState("Normal");
  const [showPagamentoForm, setShowPagamentoForm] = useState(false);
  const valorPagoAcrescimo = Form.useWatch("Valor", formPagamento);

  const bloqueado =
    statusOrcamento === "Rejeitado" ||
    financeiro?.StatusPagamento === "Cancelado";

  const carregar = useCallback(async () => {
    if (!idOrcamento) return;
    try {
      setLoading(true);
      const data = await getFinanceiroPorOrcamento(idOrcamento);
      setFinanceiro(data);
      formCabecalho.setFieldsValue({
        VlrTotal: data.VlrTotal,
        DataVencimento: data.DataVencimento ? dayjs(data.DataVencimento) : null,
        Observacao: data.Observacao,
      });
    } catch (error) {
      message.error(error.response?.data?.mensagem || "Erro ao carregar financeiro.");
    } finally {
      setLoading(false);
    }
  }, [formCabecalho, idOrcamento]);

  useEffect(() => {
    if (open && idOrcamento) {
      carregar();
      setShowPagamentoForm(false);
      setTipoLancamento("Normal");
      formPagamento.resetFields();
      formPagamento.setFieldsValue({
        DataPagamento: dayjs(),
        FormaPagamento: "PIX",
        TipoLancamento: "Normal",
      });
      setFormaPagamento("PIX");
    }
  }, [open, idOrcamento, carregar, formPagamento]);

  async function salvarCabecalho() {
    try {
      const values = await formCabecalho.validateFields();
      setSaving(true);
      const payload = {
        Observacao: values.Observacao,
        DataVencimento: values.DataVencimento
          ? values.DataVencimento.toISOString()
          : null,
      };
      if (financeiro?.PodeAlterarValorTotal) {
        payload.VlrTotal = values.VlrTotal;
      }
      const data = await salvarFinanceiro(idOrcamento, payload);
      setFinanceiro(data);
      message.success("Dados financeiros salvos.");
      onUpdated?.();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(error.response?.data?.mensagem || "Erro ao salvar financeiro.");
    } finally {
      setSaving(false);
    }
  }

  async function confirmarPagamento() {
    try {
      const values = await formPagamento.validateFields();
      setSaving(true);

      const payload = {
        TipoLancamento: values.TipoLancamento,
        DataPagamento: values.DataPagamento.toISOString(),
        Observacao: values.Observacao,
      };

      if (values.TipoLancamento === "Normal") {
        payload.Valor = values.Valor;
        payload.FormaPagamento = values.FormaPagamento;
        payload.FormaPagamentoOutro =
          values.FormaPagamento === "Outro" ? values.FormaPagamentoOutro : null;
      }

      if (values.TipoLancamento === "QuitacaoDesconto") {
        payload.Valor = values.Valor;
        payload.ValorDesconto = values.ValorDesconto;
        payload.FormaPagamento = values.FormaPagamento;
        payload.FormaPagamentoOutro =
          values.FormaPagamento === "Outro" ? values.FormaPagamentoOutro : null;
      }

      if (values.TipoLancamento === "Acrescimo") {
        payload.ValorAcrescimo = values.ValorAcrescimo;
        payload.Valor = values.Valor || 0;
        if (payload.Valor > 0) {
          payload.FormaPagamento = values.FormaPagamento;
          payload.FormaPagamentoOutro =
            values.FormaPagamento === "Outro" ? values.FormaPagamentoOutro : null;
        }
      }

      const data = await registrarPagamento(idOrcamento, payload);
      setFinanceiro(data);
      formPagamento.resetFields();
      formPagamento.setFieldsValue({
        DataPagamento: dayjs(),
        FormaPagamento: "PIX",
        TipoLancamento: "Normal",
      });
      setFormaPagamento("PIX");
      setTipoLancamento("Normal");
      setShowPagamentoForm(false);
      message.success("Lançamento registrado.");
      onUpdated?.();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(error.response?.data?.mensagem || "Erro ao registrar lançamento.");
    } finally {
      setSaving(false);
    }
  }

  const pagamentosColumns = [
    {
      title: "Data",
      dataIndex: "DataPagamento",
      render: (d) => dayjs(d).format("DD/MM/YYYY"),
    },
    {
      title: "Lançamento",
      render: (_, record) => descricaoLancamento(record),
    },
    {
      title: "Forma",
      render: (_, record) => labelFormaPagamento(record),
    },
    {
      title: "Obs.",
      dataIndex: "Observacao",
      render: (v) => v || "—",
    },
  ];

  const exigeFormaPagamento =
    tipoLancamento === "Normal" ||
    tipoLancamento === "QuitacaoDesconto" ||
    (tipoLancamento === "Acrescimo" && (valorPagoAcrescimo ?? 0) > 0);

  return (
    <Modal
      title={`Financeiro — Orçamento #${idOrcamento}`}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="fechar" onClick={onClose}>
          Fechar
        </Button>,
      ]}
      width={760}
      destroyOnClose
    >
      <Spin spinning={loading}>
        {financeiro && (
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="Cliente">{financeiro.Cliente}</Descriptions.Item>
              <Descriptions.Item label="Situação orçamento">
                {financeiro.StatusOrcamento}
              </Descriptions.Item>
              <Descriptions.Item label="Valor total">
                {formatarMoeda(financeiro.VlrTotal)}
              </Descriptions.Item>
              <Descriptions.Item label="Valor pago">
                {formatarMoeda(financeiro.VlrPago)}
              </Descriptions.Item>
              <Descriptions.Item label="Descontos">
                {formatarMoeda(financeiro.VlrDesconto)}
              </Descriptions.Item>
              <Descriptions.Item label="Saldo">
                {formatarMoeda(financeiro.Saldo)}
              </Descriptions.Item>
              <Descriptions.Item label="Pagamento" span={2}>
                <Tag color={STATUS_PAGAMENTO_COLOR[financeiro.StatusPagamento] || "default"}>
                  {STATUS_PAGAMENTO_LABEL[financeiro.StatusPagamento] ||
                    financeiro.StatusPagamento}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {!financeiro.PodeAlterarValorTotal && (
              <Alert
                type="info"
                showIcon
                message="Orçamento aprovado: o valor total não pode ser alterado. Use acréscimo para serviços extras."
              />
            )}

            <Form form={formCabecalho} layout="vertical" disabled={bloqueado}>
              <Form.Item
                name="VlrTotal"
                label="Valor total a cobrar"
                rules={[regraMoedaPositiva("Valor total")]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled={bloqueado || !financeiro.PodeAlterarValorTotal}
                  {...propsInputMoeda}
                />
              </Form.Item>
              <Form.Item name="DataVencimento" label="Data de vencimento">
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item name="Observacao" label="Observação" rules={regrasTextoOpcional()}>
                <Input.TextArea rows={2} maxLength={LIMITES.OBSERVACAO} showCount />
              </Form.Item>
              <Button type="primary" onClick={salvarCabecalho} loading={saving} disabled={bloqueado}>
                Salvar cobrança
              </Button>
            </Form>

            <div>
              <Space style={{ marginBottom: 12, justifyContent: "space-between", width: "100%" }}>
                <strong>Lançamentos</strong>
                {!bloqueado && financeiro.StatusPagamento !== "Pago" && (
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => setShowPagamentoForm((v) => !v)}
                  >
                    Novo lançamento
                  </Button>
                )}
              </Space>

              {showPagamentoForm && !bloqueado && (
                <Form
                  form={formPagamento}
                  layout="vertical"
                  style={{
                    marginBottom: 16,
                    padding: 16,
                    background: "#f8fafc",
                    borderRadius: 12,
                  }}
                >
                  <Form.Item
                    name="TipoLancamento"
                    label="Tipo de lançamento"
                    rules={[{ required: true, message: "Selecione o tipo" }]}
                  >
                    <Select
                      options={TIPOS_LANCAMENTO}
                      onChange={(v) => {
                        setTipoLancamento(v);
                        formPagamento.setFieldsValue({ Valor: null, ValorDesconto: null, ValorAcrescimo: null });
                      }}
                    />
                  </Form.Item>

                  {tipoLancamento === "Normal" && (
                    <Form.Item
                      name="Valor"
                      label="Valor pago"
                      rules={[regraMoedaPositiva("Valor pago")]}
                    >
                      <InputNumber style={{ width: "100%" }} {...propsInputMoeda} />
                    </Form.Item>
                  )}

                  {tipoLancamento === "QuitacaoDesconto" && (
                    <>
                      <Alert
                        type="warning"
                        showIcon
                        style={{ marginBottom: 12 }}
                        message={`Saldo em aberto: ${formatarMoeda(financeiro.Saldo)}`}
                      />
                      <Form.Item
                        name="Valor"
                        label="Valor pago pelo cliente"
                        rules={[regraMoedaPositiva("Valor pago")]}
                      >
                        <InputNumber style={{ width: "100%" }} {...propsInputMoeda} />
                      </Form.Item>
                      <Form.Item
                        name="ValorDesconto"
                        label="Valor do desconto concedido"
                        rules={[regraMoedaPositiva("Desconto")]}
                      >
                        <InputNumber style={{ width: "100%" }} {...propsInputMoeda} />
                      </Form.Item>
                    </>
                  )}

                  {tipoLancamento === "Acrescimo" && (
                    <>
                      <Form.Item
                        name="ValorAcrescimo"
                        label="Valor do acréscimo (a adicionar ao total)"
                        rules={[regraMoedaPositiva("Acréscimo")]}
                      >
                        <InputNumber style={{ width: "100%" }} {...propsInputMoeda} />
                      </Form.Item>
                      <Form.Item
                        name="Valor"
                        label="Valor pago agora (opcional)"
                        rules={[
                          {
                            validator: (_, value) => {
                              if (value == null || value === "" || value === 0) {
                                return Promise.resolve();
                              }
                              if (Number(value) < 0) {
                                return Promise.reject(new Error("Valor inválido"));
                              }
                              if (Number(value) > LIMITES.MOEDA_MAX) {
                                return Promise.reject(new Error("Valor excede o limite"));
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <InputNumber style={{ width: "100%" }} min={0} {...propsInputMoeda} />
                      </Form.Item>
                    </>
                  )}

                  <Form.Item
                    name="DataPagamento"
                    label="Data"
                    rules={[{ required: true, message: "Informe a data" }]}
                  >
                    <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                  </Form.Item>

                  {exigeFormaPagamento && (
                    <>
                      <Form.Item
                        name="FormaPagamento"
                        label="Forma de pagamento"
                        rules={[{ required: true, message: "Selecione a forma" }]}
                      >
                        <Select
                          options={FORMAS_PAGAMENTO}
                          onChange={setFormaPagamento}
                        />
                      </Form.Item>
                      {formaPagamento === "Outro" && (
                        <Form.Item
                          name="FormaPagamentoOutro"
                          label="Descreva a forma"
                          rules={[{ required: true, message: "Descreva a forma de pagamento" }]}
                        >
                          <Input maxLength={LIMITES.FORMA_PAGAMENTO_OUTRO} placeholder="Ex.: Cheque, Cartão..." />
                        </Form.Item>
                      )}
                    </>
                  )}

                  <Form.Item name="Observacao" label="Observação" rules={regrasTextoOpcional()}>
                    <Input.TextArea rows={2} maxLength={LIMITES.OBSERVACAO} showCount />
                  </Form.Item>
                  <Space>
                    <Button type="primary" onClick={confirmarPagamento} loading={saving}>
                      Confirmar
                    </Button>
                    <Button onClick={() => setShowPagamentoForm(false)}>Cancelar</Button>
                  </Space>
                </Form>
              )}

              <Table
                rowKey="IdPagamento"
                columns={pagamentosColumns}
                dataSource={financeiro.Pagamentos || []}
                pagination={false}
                size="small"
                locale={{ emptyText: "Nenhum lançamento registrado" }}
              />
            </div>

            {bloqueado && (
              <p style={{ color: "#64748b", margin: 0 }}>
                Orçamentos rejeitados ou financeiros cancelados não permitem alterações.
              </p>
            )}
          </Space>
        )}
      </Spin>
    </Modal>
  );
}
