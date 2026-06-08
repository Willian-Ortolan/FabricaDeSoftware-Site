import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import ModalPadrao from "../../../../Components/ModalPadrao/ModalPadrao";
import { alterarSenhaUsuario } from "../../../../services/admin.service";
import { regrasSenha } from "../../../../utils/validacao";

export default function ModalAlterarSenha({ open, onClose, usuario, onSaved }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const salvar = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await alterarSenhaUsuario(usuario.id, values.novaSenha);
      message.success("Senha alterada com sucesso");
      onSaved?.();
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.mensagem ||
        err.message ||
        "Erro ao alterar senha";
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
      title={`Alterar senha — ${usuario?.nome ?? ""}`}
      confirmText="Salvar senha"
      loading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Nova senha" name="novaSenha" rules={regrasSenha()}>
          <Input.Password placeholder="Nova senha de acesso" />
        </Form.Item>

        <Form.Item
          label="Confirmar nova senha"
          name="confirmarSenha"
          dependencies={["novaSenha"]}
          rules={[
            { required: true, message: "Confirme a senha" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("novaSenha") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("As senhas não coincidem"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Repita a nova senha" />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
