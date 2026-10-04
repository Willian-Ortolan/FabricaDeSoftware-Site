import { Button, Card, Col, Form, Row, Typography, message } from "antd";

import PageShell from "../Components/PageShell";

import FormularioSolicitacaoOrcamento from "../Components/FormularioSolicitacaoOrcamento";

import { solicitarOrcamentoPublico } from "../services/publicOrcamento.service";

import { mapSolicitacaoPayload } from "../utils/solicitacao";

import { useEmpresa } from "../contexts/EmpresaContext";



const { Paragraph, Title } = Typography;



export default function Contratar() {

  const [form] = Form.useForm();

  const empresa = useEmpresa();



  async function handleSubmit(values) {

    try {

      const payload = mapSolicitacaoPayload(values);

      await solicitarOrcamentoPublico(empresa.slug, payload);

      message.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");

      form.resetFields();

      form.setFieldsValue({ servicos: [{}] });

    } catch (error) {

      const mensagem =

        error.response?.data?.mensagem || "Erro ao enviar solicitação. Tente novamente.";

      message.error(mensagem);

    }

  }



  return (

    <PageShell

      title="Solicitar orçamento"

      subtitle={`Informe os dados da propriedade e dos serviços desejados. ${empresa.nome} retornará o mais rápido possível.`}

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

              Vamos indicar o melhor serviço (mapeamento, pulverização ou aplicação de sólidos)

              de acordo com sua área e objetivo.

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

              Dados da solicitação

            </Title>



            <Form

              form={form}

              layout="vertical"

              onFinish={handleSubmit}

              initialValues={{ servicos: [{}] }}

            >

              <FormularioSolicitacaoOrcamento primeiroContato />

              <Button

                type="primary"

                htmlType="submit"

                size="large"

                style={{ borderRadius: 12, fontWeight: 600 }}

              >

                Solicitar orçamento

              </Button>

            </Form>

          </Card>

        </Col>

      </Row>

    </PageShell>

  );

}

