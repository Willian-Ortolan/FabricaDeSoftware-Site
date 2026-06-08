import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import ModalPadrao from "../../../../Components/ModalPadrao/ModalPadrao";
import { criarUsuario } from "../../../../services/admin.service";
import {
  LIMITES,
  regrasEmail,
  regrasSenha,
  regrasTexto,
} from "../../../../utils/validacao";

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
      await criarUsuario({ ...values, perfil: "Cliente" });
      message.success("Cliente cadastrado com sucesso");
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
      title="Cadastrar novo cliente"
      confirmText="Cadastrar"
      loading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="perfil" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Nome completo"
          name="nome"
          rules={regrasTexto("Nome", LIMITES.NOME)}
        >
          <Input placeholder="Nome do cliente" maxLength={LIMITES.NOME} />
        </Form.Item>

        <Form.Item label="E-mail" name="email" rules={regrasEmail()}>
          <Input placeholder="cliente@exemplo.com" maxLength={200} />
        </Form.Item>

        <Form.Item label="Senha" name="senha" rules={regrasSenha()}>
          <Input.Password placeholder="Senha de acesso" />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
