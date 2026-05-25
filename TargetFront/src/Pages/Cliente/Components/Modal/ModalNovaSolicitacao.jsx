import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Typography,
  Button,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import dayjs from "dayjs";

const { Text } = Typography;

const precoServico = {
  mapeamento: 100,
  pulverizacao: 150,
  solidos: 200,
};

const servicoParaTipo = {
  Mapeamento: "mapeamento",
  Pulverização: "pulverizacao",
  "Aplicação de Sólidos": "solidos",
  Adubação: "solidos",
};

export default function ModalNovaSolicitacao({ open, onClose, onSave, initialData }) {
  const [form] = Form.useForm();
  const servicos = Form.useWatch("servicos", form) || [];

  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        fazenda: initialData.propriedade,
        servicos: [
          {
            tipo: servicoParaTipo[initialData.servico] || "pulverizacao",
            area: undefined,
            data: initialData.data
              ? dayjs(initialData.data, "DD/MM/YYYY")
              : undefined,
          },
        ],
      });
    } else if (open) {
      form.resetFields();
      form.setFieldsValue({ servicos: [{}] });
    }
  }, [open, initialData, form]);

  const calcularValor = (tipo, area) => {
    if (!tipo || !area) return 0;
    return precoServico[tipo] * area;
  };

  const totalGeral = servicos.reduce((acc, s) => {
    return acc + calcularValor(s?.tipo, s?.area);
  }, 0);

  return (
    <Modal
      title={initialData ? "Editar Solicitação" : "Nova Solicitação"}
      open={open}
      onCancel={onClose}
      onOk={() => form.validateFields().then(onSave)}
      okText={initialData ? "Salvar" : "Enviar Pré-Orçamento"}
      width={750}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ servicos: [{}] }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Fazenda"
              name="fazenda"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Nome para contato"
              name="nome"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Telefone" name="telefone">
          <Input />
        </Form.Item>

        <Form.List name="servicos">
          {(fields, { add }) => (
            <>
              {fields.map((field, index) => {
                const servico = servicos[index] || {};
                const valor = calcularValor(servico.tipo, servico.area);
                const completo = servico.tipo && servico.area && servico.data;

                return (
                  <div
                    key={field.key}
                    style={{
                      border: "1px solid #eee",
                      padding: 16,
                      borderRadius: 10,
                      marginBottom: 16,
                    }}
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="Serviço"
                          name={[field.name, "tipo"]}
                          rules={[{ required: true }]}
                        >
                          <Select
                            options={[
                              { value: "mapeamento", label: "Mapeamento" },
                              { value: "pulverizacao", label: "Pulverização" },
                              {
                                value: "solidos",
                                label: "Aplicação de Sólidos",
                              },
                            ]}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          label="Área (ha)"
                          name={[field.name, "area"]}
                          rules={[{ required: true }]}
                        >
                          <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          label="Data execução"
                          name={[field.name, "data"]}
                          rules={[{ required: true }]}
                        >
                          <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>

                      <Col
                        span={4}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {completo && index === fields.length - 1 && (
                          <Button
                            type="text"
                            icon={
                              <PlusCircleOutlined style={{ fontSize: 26 }} />
                            }
                            onClick={() => add()}
                          />
                        )}
                      </Col>
                    </Row>

                    <Text strong>
                      Valor estimado: R$ {valor.toLocaleString("pt-BR")}
                    </Text>
                  </div>
                );
              })}
            </>
          )}
        </Form.List>

        <div
          style={{
            textAlign: "right",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Total estimado: R$ {totalGeral.toLocaleString("pt-BR")}
        </div>
      </Form>
    </Modal>
  );
}
