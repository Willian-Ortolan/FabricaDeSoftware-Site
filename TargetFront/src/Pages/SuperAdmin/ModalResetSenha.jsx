import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import ModalPadrao from "../../Components/ModalPadrao/ModalPadrao";
import { resetSenhaUsuario } from "../../services/superAdmin.service";
import { regrasSenha } from "../../utils/validacao";

export default function ModalResetSenha({ open, onClose, onSaved, usuario }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const salvar = async () => {
    if (!usuario?.id) return;
    try {
      const { novaSenha } = await form.validateFields();
      setLoading(true);
      await resetSenhaUsuario(usuario.id, novaSenha);
      message.success("Senha redefinida com sucesso");
      onSaved?.();
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.mensagem ||
        err.message ||
        "Erro ao redefinir senha";
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
      title={`Redefinir senha — ${usuario?.nome ?? usuario?.email ?? ""}`}
      confirmText="Salvar"
      loading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Nova senha" name="novaSenha" rules={regrasSenha()}>
          <Input.Password />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
