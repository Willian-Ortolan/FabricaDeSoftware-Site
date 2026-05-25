import { Button, Card, Col, Form, Input, Row, Typography, message } from "antd";
import PageShell from "../Components/PageShell";
import { enviarContato } from "../services/contato.service";

const { Paragraph, Title } = Typography;

export default function Contratar() {
  const [form] = Form.useForm();

  async function handleSubmit(values) {
    try {
      await enviarContato(values);
      message.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      form.resetFields();
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem || "Erro ao enviar solicitação. Tente novamente.";
      message.error(mensagem);
    }
  }

  return (
    <PageShell
      title="Contratar"
      subtitle="Conte um pouco sobre sua necessidade e retornaremos o mais rápido possível."
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={10}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
              height: "100%",
            }}
          >
            <Title level={4} style={{ marginBottom: 8 }}>
              Atendimento consultivo
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Vamos indicar o melhor serviço (mapeamento, pulverização ou monitoramento) de acordo
              com sua área e objetivo.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={14}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              Formulário de contato
            </Title>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
                    <Input placeholder="Seu nome" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Telefone" name="telefone" rules={[{ required: true }]}>
                    <Input placeholder="(00) 00000-0000" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="E-mail" name="email" rules={[{ type: "email" }]}>
                <Input placeholder="voce@exemplo.com" />
              </Form.Item>
              <Form.Item label="Mensagem" name="mensagem">
                <Input.TextArea rows={5} placeholder="Descreva sua demanda..." />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ borderRadius: 12, fontWeight: 600 }}
              >
                Enviar solicitação
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageShell>
  );
}
