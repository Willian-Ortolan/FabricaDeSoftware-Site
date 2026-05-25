import { Button, Card, Form, Input, Typography, message } from "antd";
import PageShell from "../Components/PageShell";
import { useNavigate } from "react-router-dom";
import { login, getMe } from "../services/auth.service";
import { getRoleFromToken } from "../utils/auth";

const { Paragraph, Title } = Typography;

function redirectByRole(role, navigate) {
  if (role === "AdminSystem") {
    navigate("/admin");
    return true;
  }
  if (role === "Cliente") {
    navigate("/cliente");
    return true;
  }
  return false;
}

export default function Login() {
  const navigate = useNavigate();

  async function handleLogin(values) {
    try {
      const data = await login(values.email, values.senha);

      let role = getRoleFromToken(data.token);

      // Fallback: perfil vindo direto da API (mais confiável que decodificar JWT)
      if (!role) {
        const me = await getMe();
        role = me.perfil ?? me.Perfil;
      }

      if (!redirectByRole(role, navigate)) {
        message.error(
          `Perfil de usuário não reconhecido${role ? `: "${role}"` : ""}.`,
        );
      }
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem ||
        error.message ||
        "Erro ao realizar login. Verifique suas credenciais.";
      message.error(mensagem);
    }
  }

  return (
    <PageShell
      title="Login"
      subtitle="Acesse seus relatórios, histórico de serviços e solicitações."
    >
      <div style={{ maxWidth: 480 }}>
        <Card
          style={{
            borderRadius: 16,
            boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
          }}
        >
          <Title level={4} style={{ marginTop: 0, marginBottom: 6 }}>
            Entrar
          </Title>

          <Paragraph type="secondary" style={{ marginTop: 0 }}>
            Use seu e-mail e senha para acessar.
          </Paragraph>

          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="voce@exemplo.com" />
            </Form.Item>

            <Form.Item label="Senha" name="senha" rules={[{ required: true }]}>
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ borderRadius: 12, fontWeight: 600 }}
            >
              Entrar
            </Button>
          </Form>
        </Card>
      </div>
    </PageShell>
  );
}
