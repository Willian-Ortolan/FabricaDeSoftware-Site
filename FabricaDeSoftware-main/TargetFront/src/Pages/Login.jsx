import { Button, Card, Form, Input, Typography } from "antd";
import PageShell from "../Components/PageShell";
import { useNavigate } from "react-router-dom";

const { Paragraph, Title } = Typography;

export default function Login() {
  const navigate = useNavigate();

  function HandleLogin(values) {
    const { email, senha } = values;

    if (email === "cliente@target.com.br" && senha === "124578") {
      navigate("/cliente"); // tela futura
    } else if (email === "admin@target.com.br" && senha === "147258") {
      navigate("/admin"); // tela admin
    } else {
      alert("E-mail ou senha inválidos");
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
