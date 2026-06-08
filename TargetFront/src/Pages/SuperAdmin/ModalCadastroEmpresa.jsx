import { Col, Divider, Form, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import FormularioEndereco from "../../Components/FormularioEndereco/FormularioEndereco";
import ModalPadrao from "../../Components/ModalPadrao/ModalPadrao";
import { criarAdminEmpresa, criarEmpresa } from "../../services/superAdmin.service";
import { montarEnderecoCompleto } from "../../utils/endereco";
import {
  LIMITES,
  formatarCnpj,
  formatarTelefone,
  normalizarCnpj,
  normalizarTelefone,
  propsInputCnpj,
  propsInputTelefone,
  regrasCnpj,
  regrasEmail,
  regrasSenha,
  regrasTelefone,
  regrasTexto,
} from "../../utils/validacao";

export default function ModalCadastroEmpresa({ open, onClose, onSaved }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({ enderecoManual: false });
    }
  }, [open, form]);

  const salvar = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const endereco = montarEnderecoCompleto({
        logradouro: values.logradouro,
        numero: values.numero,
        complemento: values.complemento,
        bairro: values.bairro,
        cidade: values.cidade,
        estado: values.estado,
        cep: values.enderecoManual ? "" : values.cep,
      });

      const empresa = await criarEmpresa({
        nome: values.nome,
        cnpj: normalizarCnpj(values.cnpj),
        slug: values.slug?.trim().toLowerCase(),
        telefone: normalizarTelefone(values.telefone),
        endereco,
      });

      const empresaId = empresa.id ?? empresa.Id;
      await criarAdminEmpresa(empresaId, {
        nome: values.adminNome,
        email: values.adminEmail,
        senha: values.adminSenha,
      });

      message.success("Empresa e administrador criados com sucesso");
      onSaved?.();
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.mensagem ||
        err.message ||
        "Erro ao cadastrar empresa";
      if (!err.errorFields) message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalPadrao
      open={open}
      onClose={onClose}
      onConfirm={salvar}
      title="Nova empresa"
      confirmText="Cadastrar"
      loading={loading}
      width={840}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome da empresa"
          name="nome"
          rules={regrasTexto("Nome", LIMITES.NOME)}
        >
          <Input placeholder="Ex.: Agro Norte" maxLength={LIMITES.NOME} />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={14}>
            <Form.Item
              label="CNPJ"
              name="cnpj"
              rules={regrasCnpj()}
              normalize={formatarCnpj}
              tooltip="Formato 00.000.000/0000-00 — 14 caracteres alfanuméricos (salvo sem máscara)"
            >
              <Input {...propsInputCnpj} />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
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

        <FormularioEndereco />

        <Divider />

        <Row gutter={16}>
          <Col xs={24} md={10}>
            <Form.Item
              label="Nome do admin"
              name="adminNome"
              rules={regrasTexto("Nome", LIMITES.NOME)}
            >
              <Input placeholder="Nome completo" maxLength={LIMITES.NOME} />
            </Form.Item>
          </Col>
          <Col xs={24} md={7}>
            <Form.Item label="Senha do admin" name="adminSenha" rules={regrasSenha()}>
              <Input.Password placeholder="Senha inicial" />
            </Form.Item>
          </Col>
          <Col xs={24} md={7}>
            <Form.Item
              label="Slug (URL)"
              name="slug"
              rules={[
                { required: true, message: "Informe o slug" },
                {
                  pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: "Use apenas letras minúsculas, números e hífens",
                },
              ]}
            >
              <Input placeholder="agro-norte" maxLength={80} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="E-mail do admin" name="adminEmail" rules={regrasEmail()}>
          <Input placeholder="admin@empresa.com" maxLength={200} />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
