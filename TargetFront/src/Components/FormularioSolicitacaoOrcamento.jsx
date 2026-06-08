import {
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
import { useEmpresaOptional } from "../contexts/EmpresaContext";
import {
  desabilitarDatasPassadas,
  formatarTelefone,
  propsInputArea,
  propsInputTelefone,
  regraAreaPositiva,
  regrasDataExecucao,
  regrasTelefone,
  regrasTexto,
  LIMITES,
} from "../utils/validacao";

const { Text } = Typography;

export const precoServico = {
  mapeamento: 100,
  pulverizacao: 150,
  solidos: 200,
};

export function calcularValorServico(tipo, area, precosCustom) {
  if (!tipo || !area) return 0;
  const tabela = precosCustom ?? precoServico;
  const preco = tabela[tipo] ?? 0;
  return preco * area;
}

export default function FormularioSolicitacaoOrcamento({ primeiroContato = false }) {
  const form = Form.useFormInstance();
  const empresa = useEmpresaOptional();
  const precosEmpresa = empresa?.precos
    ? {
        mapeamento:
          empresa.precos.mapeamento ?? empresa.precos.Mapeamento ?? precoServico.mapeamento,
        pulverizacao:
          empresa.precos.pulverizacao ??
          empresa.precos.Pulverizacao ??
          precoServico.pulverizacao,
        solidos:
          empresa.precos.solidos ?? empresa.precos.Solidos ?? precoServico.solidos,
      }
    : null;
  const servicos = Form.useWatch("servicos", form) || [];

  const totalGeral = servicos.reduce((acc, s) => {
    return acc + calcularValorServico(s?.tipo, s?.area, precosEmpresa);
  }, 0);

  return (
    <>
      {primeiroContato ? (
        <>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Fazenda"
                name="fazenda"
                rules={regrasTexto("Fazenda", LIMITES.FAZENDA)}
              >
                <Input placeholder="Nome da propriedade" maxLength={LIMITES.FAZENDA} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Cidade"
                name="cidade"
                rules={regrasTexto("Cidade", LIMITES.CIDADE)}
              >
                <Input placeholder="Cidade da propriedade" maxLength={LIMITES.CIDADE} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Telefone"
                name="telefone"
                rules={regrasTelefone(false)}
                normalize={formatarTelefone}
              >
                <Input {...propsInputTelefone} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Nome para contato"
            name="nome"
            rules={regrasTexto("Nome", LIMITES.NOME)}
          >
            <Input placeholder="Seu nome" maxLength={LIMITES.NOME} />
          </Form.Item>
        </>
      ) : (
        <>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Fazenda"
                name="fazenda"
                rules={regrasTexto("Fazenda", LIMITES.FAZENDA)}
              >
                <Input placeholder="Nome da propriedade" maxLength={LIMITES.FAZENDA} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Nome para contato"
                name="nome"
                rules={regrasTexto("Nome", LIMITES.NOME)}
              >
                <Input placeholder="Seu nome" maxLength={LIMITES.NOME} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Telefone"
            name="telefone"
            rules={regrasTelefone(false)}
            normalize={formatarTelefone}
          >
            <Input {...propsInputTelefone} />
          </Form.Item>
        </>
      )}

      <Form.List name="servicos">
        {(fields, { add }) => (
          <>
            {fields.map((field, index) => {
              const servico = servicos[index] || {};
              const valor = calcularValorServico(
                servico.tipo,
                servico.area,
                precosEmpresa,
              );
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
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Serviço"
                        name={[field.name, "tipo"]}
                        rules={[{ required: true }]}
                      >
                        <Select
                          placeholder="Selecione"
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

                    <Col xs={24} md={6}>
                      <Form.Item
                        label="Área (ha)"
                        name={[field.name, "area"]}
                        rules={[regraAreaPositiva("Área")]}
                      >
                        <InputNumber style={{ width: "100%" }} {...propsInputArea} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={6}>
                      <Form.Item
                        label="Data execução"
                        name={[field.name, "data"]}
                        rules={regrasDataExecucao()}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          format="DD/MM/YYYY"
                          disabledDate={desabilitarDatasPassadas}
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      xs={24}
                      md={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {completo && index === fields.length - 1 && (
                        <Button
                          type="text"
                          icon={<PlusCircleOutlined style={{ fontSize: 26 }} />}
                          onClick={() => add()}
                          aria-label="Adicionar serviço"
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
          marginBottom: 16,
        }}
      >
        Total estimado: R$ {totalGeral.toLocaleString("pt-BR")}
      </div>
    </>
  );
}
