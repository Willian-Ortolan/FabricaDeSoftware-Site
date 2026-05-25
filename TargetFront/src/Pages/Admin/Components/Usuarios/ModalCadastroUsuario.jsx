import { Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import ModalPadrao from "../../../../Components/ModalPadrao/ModalPadrao";
import { criarUsuario } from "../../../../services/admin.service";

export default function ModalCadastroUsuario({ open, onClose, onSaved }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({ perfil: "Cliente" });
    }
  }, [open, form]);

  const salvar = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await criarUsuario(values);
      message.success("Usuário cadastrado com sucesso");
      onSaved?.();
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.mensagem ||
        err.message ||
        "Erro ao cadastrar usuário";
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
      title="Cadastrar novo usuário"
      confirmText="Cadastrar"
      loading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome completo"
          name="nome"
          rules={[{ required: true, message: "Informe o nome" }]}
        >
          <Input placeholder="Nome do usuário" />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Informe o e-mail" },
            { type: "email", message: "E-mail inválido" },
          ]}
        >
          <Input placeholder="usuario@exemplo.com" />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha"
          rules={[
            { required: true, message: "Informe a senha" },
            { min: 6, message: "Mínimo de 6 caracteres" },
          ]}
        >
          <Input.Password placeholder="Senha de acesso" />
        </Form.Item>

        <Form.Item
          label="Perfil"
          name="perfil"
          rules={[{ required: true, message: "Selecione o perfil" }]}
        >
          <Select
            options={[
              { value: "Cliente", label: "Cliente" },
              { value: "AdminSystem", label: "Administrador" },
            ]}
          />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
