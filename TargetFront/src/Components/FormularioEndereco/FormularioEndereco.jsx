import { Checkbox, Col, Form, Input, Row, Select, Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  buscarEnderecoPorCep,
  cepValido,
  formatarCep,
  normalizarCep,
} from "../../utils/cep";
import { UFS_BR } from "../../utils/endereco";
import { LIMITES, regrasTexto } from "../../utils/validacao";

const propsInputCep = {
  placeholder: "00000-000",
  maxLength: 9,
  inputMode: "numeric",
  autoComplete: "postal-code",
};

export default function FormularioEndereco() {
  const form = Form.useFormInstance();
  const enderecoManual = Form.useWatch("enderecoManual", form);
  const cepValor = Form.useWatch("cep", form);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [logradouroManual, setLogradouroManual] = useState(false);
  const ultimoCepConsultado = useRef("");

  const limparEnderecoAuto = () => {
    form.setFieldsValue({
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: undefined,
    });
    setLogradouroManual(false);
  };

  const consultarCep = async (valorCep) => {
    const digits = normalizarCep(valorCep);
    if (
      enderecoManual ||
      digits.length !== 8 ||
      ultimoCepConsultado.current === digits
    ) {
      return;
    }

    ultimoCepConsultado.current = digits;

    try {
      setBuscandoCep(true);
      const endereco = await buscarEnderecoPorCep(valorCep);
      form.setFieldsValue({
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado || undefined,
      });
      setLogradouroManual(!endereco.logradouro);

      if (!endereco.logradouro) {
        message.info("CEP localizado. Informe o endereço manualmente.");
      }
    } catch (err) {
      ultimoCepConsultado.current = "";
      limparEnderecoAuto();
      message.error(err.message || "Erro ao consultar CEP");
    } finally {
      setBuscandoCep(false);
    }
  };

  useEffect(() => {
    if (!cepValor) {
      setLogradouroManual(false);
      ultimoCepConsultado.current = "";
      return;
    }

    if (!enderecoManual && cepValido(cepValor)) {
      consultarCep(cepValor);
    }
  }, [cepValor, enderecoManual]);

  const handleCepChange = () => {
    if (!cepValido(form.getFieldValue("cep"))) {
      limparEnderecoAuto();
    }
  };

  const handleEnderecoManualChange = (event) => {
    const marcado = event.target.checked;
    form.setFieldValue("enderecoManual", marcado);

    if (marcado) {
      form.setFieldValue("cep", "");
      ultimoCepConsultado.current = "";
      limparEnderecoAuto();
      return;
    }

    ultimoCepConsultado.current = "";
    limparEnderecoAuto();
  };

  const enderecoBloqueado = !enderecoManual && !logradouroManual;
  const cidadeEstadoBloqueados = !enderecoManual;

  return (
    <>
      <Form.Item name="enderecoManual" valuePropName="checked" initialValue={false}>
        <Checkbox onChange={handleEnderecoManualChange}>
          Não sei o CEP — preencher endereço manualmente
        </Checkbox>
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="CEP"
            name="cep"
            normalize={formatarCep}
            rules={[
              {
                validator: (_, value) => {
                  if (form.getFieldValue("enderecoManual")) {
                    return Promise.resolve();
                  }
                  if (cepValido(value)) return Promise.resolve();
                  return Promise.reject(new Error("Informe um CEP válido"));
                },
              },
            ]}
          >
            <Input
              {...propsInputCep}
              disabled={enderecoManual}
              onChange={handleCepChange}
              suffix={buscandoCep ? <Spin size="small" /> : null}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item
            label="Número"
            name="numero"
            rules={[{ required: true, message: "Informe o número" }]}
          >
            <Input placeholder="123" maxLength={20} />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item label="Complemento" name="complemento">
            <Input placeholder="Sala, bloco..." maxLength={100} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="bairro" hidden>
        <Input />
      </Form.Item>

      <Form.Item
        label="Endereço"
        name="logradouro"
        rules={
          enderecoManual || logradouroManual
            ? regrasTexto("Endereço", LIMITES.NOME)
            : [
                {
                  validator: (_, value) => {
                    if (form.getFieldValue("enderecoManual")) {
                      return Promise.resolve();
                    }
                    if (value?.trim()) return Promise.resolve();
                    return Promise.reject(
                      new Error("Consulte o CEP para preencher o endereço"),
                    );
                  },
                },
              ]
        }
      >
        <Input
          placeholder="Rua, avenida..."
          maxLength={LIMITES.NOME}
          disabled={enderecoBloqueado}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Form.Item
            label="Cidade"
            name="cidade"
            rules={
              enderecoManual
                ? regrasTexto("Cidade", LIMITES.CIDADE)
                : [
                    {
                      validator: (_, value) => {
                        if (form.getFieldValue("enderecoManual")) {
                          return Promise.resolve();
                        }
                        if (value?.trim()) return Promise.resolve();
                        return Promise.reject(
                          new Error("Consulte o CEP para preencher a cidade"),
                        );
                      },
                    },
                  ]
            }
          >
            <Input
              placeholder="Cidade"
              maxLength={LIMITES.CIDADE}
              disabled={cidadeEstadoBloqueados}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item
            label="Estado"
            name="estado"
            rules={
              enderecoManual
                ? [{ required: true, message: "Selecione o estado" }]
                : [
                    {
                      validator: (_, value) => {
                        if (form.getFieldValue("enderecoManual")) {
                          return Promise.resolve();
                        }
                        if (value) return Promise.resolve();
                        return Promise.reject(
                          new Error("Consulte o CEP para preencher o estado"),
                        );
                      },
                    },
                  ]
            }
          >
            <Select
              placeholder="UF"
              options={UFS_BR.map((uf) => ({ value: uf, label: uf }))}
              showSearch
              optionFilterProp="label"
              disabled={cidadeEstadoBloqueados}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
