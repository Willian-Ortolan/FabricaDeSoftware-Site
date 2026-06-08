import { Form, Input, message, Typography } from "antd";
import { useEffect, useState } from "react";
import ModalPadrao from "../../Components/ModalPadrao/ModalPadrao";
import { criarAdminEmpresa } from "../../services/superAdmin.service";
import {
  LIMITES,
  regrasEmail,
  regrasSenha,
  regrasTexto,
} from "../../utils/validacao";

const { Text } = Typography;

export default function ModalCriarAdmin({ open, onClose, onSaved, empresa }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const salvar = async () => {
    if (!empresa?.id) return;
    try {
      const values = await form.validateFields();
      setLoading(true);
      await criarAdminEmpresa(empresa.id, values);
      message.success("Administrador criado com sucesso");
      onSaved?.();
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.mensagem ||
        err.message ||
        "Erro ao criar administrador";
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
      title={`Novo admin — ${empresa?.nome ?? ""}`}
      confirmText="Cadastrar"
      loading={loading}
    >
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Máximo de 2 administradores por empresa.
      </Text>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome"
          name="nome"
          rules={regrasTexto("Nome", LIMITES.NOME)}
        >
          <Input maxLength={LIMITES.NOME} />
        </Form.Item>
        <Form.Item label="E-mail" name="email" rules={regrasEmail()}>
          <Input maxLength={200} />
        </Form.Item>
        <Form.Item label="Senha" name="senha" rules={regrasSenha()}>
          <Input.Password />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
