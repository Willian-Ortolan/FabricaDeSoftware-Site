import { Button, Card, Form, Input, Typography } from "antd";
import PageShell from "../Components/PageShell";
import { useNavigate } from "react-router-dom";
import api from "./LoginServices.jsx";

const { Paragraph, Title } = Typography;

export default function Login() {
  const navigate = useNavigate();

  async function HandleLogin(values) {
    try {
      const response = await api.post("https://localhost:7289/api/auth/login", {
        email: values.email,
        senha: values.senha,
      });

      // TOKEN
      const token = response.data.token;

      // SALVAR TOKEN
      localStorage.setItem("token", token);

      // DECODIFICAR JWT
      const payload = JSON.parse(atob(token.split(".")[1]));

      // ROLE
      const role =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // REDIRECIONAR
      if (role === "AdminSystem") {
        navigate("/admin");
      } else if (role === "Cliente") {
        navigate("/cliente");
      }
    } catch (error) {
      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      alert("Erro ao realizar login");
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

          <Form layout="vertical" onFinish={HandleLogin}>
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
