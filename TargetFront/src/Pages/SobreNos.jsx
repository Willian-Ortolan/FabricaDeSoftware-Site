import { Card, Col, Row, Typography } from "antd";

import {
  RocketOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";

import PageShell from "../Components/PageShell";

const { Title, Paragraph } = Typography;

export default function SobreNos() {
  return (
    <PageShell
      title="Sobre Nós"
      subtitle="Conheça mais sobre a Target Pulverização."
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* APRESENTAÇÃO */}
        <Card
          bordered={false}
          style={{
            borderRadius: 20,
            marginBottom: 40,
          }}
        >
          <Title level={2}>
            Tecnologia que transforma o agronegócio
          </Title>

          <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
            A Target Pulverização é uma empresa especializada em
            pulverização agrícola com drones, localizada em
            Delfinópolis - MG.
          </Paragraph>

          <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
            Nosso objetivo é oferecer soluções modernas e eficientes
            para produtores rurais que buscam aumentar a produtividade,
            reduzir desperdícios e melhorar a qualidade das aplicações
            agrícolas.
          </Paragraph>

          <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
            Utilizamos drones de última geração para realizar
            pulverização, dispersão e mapeamento agrícola com alta
            precisão e segurança.
          </Paragraph>
        </Card>

        {/* MISSÃO VISÃO VALORES */}
        <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 20,
                height: "100%",
              }}
            >
              <Title level={3}>Missão</Title>

              <Paragraph>
                Levar tecnologia e inovação ao campo através de
                serviços agrícolas de alta qualidade e precisão.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 20,
                height: "100%",
              }}
            >
              <Title level={3}>Visão</Title>

              <Paragraph>
                Ser referência em pulverização agrícola com drones
                na região e contribuir para um agronegócio mais
                moderno e sustentável.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 20,
                height: "100%",
              }}
            >
              <Title level={3}>Valores</Title>

              <Paragraph>
                Compromisso, segurança, inovação, responsabilidade
                ambiental e foco nos resultados do produtor rural.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* BENEFÍCIOS */}
        <Title level={2} style={{ marginBottom: 30 }}>
          Por que utilizar drones agrícolas?
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Card
              bordered={false}
              style={{ borderRadius: 20 }}
            >
              <RocketOutlined
                style={{
                  fontSize: 40,
                  color: "#1d4ed8",
                  marginBottom: 16,
                }}
              />

              <Title level={4}>Maior produtividade</Title>

              <Paragraph>
                Aplicações rápidas e eficientes, permitindo agir
                rapidamente em momentos críticos da lavoura.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              bordered={false}
              style={{ borderRadius: 20 }}
            >
              <RadarChartOutlined
                style={{
                  fontSize: 40,
                  color: "#1d4ed8",
                  marginBottom: 16,
                }}
              />

              <Title level={4}>Precisão nas aplicações</Title>

              <Paragraph>
                Redução de desperdícios e maior uniformidade na
                aplicação dos produtos agrícolas.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              bordered={false}
              style={{ borderRadius: 20 }}
            >
              <EnvironmentOutlined
                style={{
                  fontSize: 40,
                  color: "#1d4ed8",
                  marginBottom: 16,
                }}
              />

              <Title level={4}>Sustentabilidade</Title>

              <Paragraph>
                Menor consumo de água e menor impacto ambiental
                durante as operações agrícolas.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              bordered={false}
              style={{ borderRadius: 20 }}
            >
              <SafetyCertificateOutlined
                style={{
                  fontSize: 40,
                  color: "#1d4ed8",
                  marginBottom: 16,
                }}
              />

              <Title level={4}>Mais segurança</Title>

              <Paragraph>
                Redução da exposição humana aos produtos químicos
                utilizados na pulverização.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* FECHAMENTO */}
        <Card
          bordered={false}
          style={{
            borderRadius: 20,
            marginTop: 50,
          }}
        >
          <Title level={2}>
            Especialistas em tecnologia agrícola
          </Title>

          <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
            Atendemos culturas como banana, milho, soja e café,
            oferecendo serviços personalizados de acordo com as
            necessidades de cada produtor.
          </Paragraph>

          <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
            Na Target Pulverização, acreditamos que tecnologia,
            eficiência e sustentabilidade caminham juntas para
            construir o futuro do agronegócio.
          </Paragraph>
        </Card>
      </div>
    </PageShell>
  );
}