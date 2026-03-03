import { Card, Row, Col, Typography, Button } from "antd";
import HeroSection from "../Components/HeroSection";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <>
      <HeroSection />

      <main
        style={{
          backgroundColor: "#f3f6fb",
        }}
      >
        <section
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "32px 40px 40px",
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
                }}
              >
                <Title level={4} style={{ marginBottom: 8 }}>
                  Mapeamento Aéreo
                </Title>
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  Imagens NDVI, ortomosaicos e relatórios completos da sua
                  área produtiva.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
                }}
              >
                <Title level={4} style={{ marginBottom: 8 }}>
                  Pulverização de Precisão
                </Title>
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  Aplicação direcionada, reduzindo desperdícios e impacto
                  ambiental.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
                }}
              >
                <Title level={4} style={{ marginBottom: 8 }}>
                  Monitoramento Agrícola
                </Title>
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  Acompanhamento constante da lavoura com dados precisos para
                  decisão rápida.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "40px 40px 36px",
            }}
          >
            <Title
              level={3}
              style={{ textAlign: "center", marginBottom: 32, marginTop: 0 }}
            >
              Como Funciona
            </Title>

            <Row gutter={24} justify="center">
              <Col xs={24} md={6}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      backgroundColor: "#e0ecff",
                      margin: "0 auto 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      color: "#2563eb",
                    }}
                  >
                    1
                  </div>
                  <Title level={5} style={{ marginBottom: 6 }}>
                    Planejamento da Missão
                  </Title>
                  <Paragraph type="secondary">
                    Definimos área, rota e objetivos da operação.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      backgroundColor: "#e0ecff",
                      margin: "0 auto 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      color: "#2563eb",
                    }}
                  >
                    2
                  </div>
                  <Title level={5} style={{ marginBottom: 6 }}>
                    Voo Automático
                  </Title>
                  <Paragraph type="secondary">
                    Drones executam o plano com total precisão.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      backgroundColor: "#e0ecff",
                      margin: "0 auto 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      color: "#2563eb",
                    }}
                  >
                    3
                  </div>
                  <Title level={5} style={{ marginBottom: 6 }}>
                    Coleta de Dados
                  </Title>
                  <Paragraph type="secondary">
                    Captura de imagens, índices e telemetria da área.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      backgroundColor: "#e0ecff",
                      margin: "0 auto 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      color: "#2563eb",
                    }}
                  >
                    4
                  </div>
                  <Title level={5} style={{ marginBottom: 6 }}>
                    Relatório Inteligente
                  </Title>
                  <Paragraph type="secondary">
                    Entrega de insights e mapas para o produtor.
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#f3f6fb",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "40px 40px 24px",
            }}
          >
            <Title
              level={3}
              style={{ textAlign: "center", marginBottom: 32, marginTop: 0 }}
            >
              Nossos Diferenciais
            </Title>

            <Row gutter={24}>
              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 16,
                    textAlign: "center",
                    boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
                  }}
                >
                  <Title level={5}>Economia de até 80% em água</Title>
                  <Paragraph type="secondary">
                    Otimize uso de insumos e reduza custos operacionais.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 16,
                    textAlign: "center",
                    boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
                  }}
                >
                  <Title level={5}>Precisão Centimétrica</Title>
                  <Paragraph type="secondary">
                    Navegação guiada por RTK e mapas de alta resolução.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 16,
                    textAlign: "center",
                    boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
                  }}
                >
                  <Title level={5}>Menos Impacto Ambiental</Title>
                  <Paragraph type="secondary">
                    Menor contato humano com defensivos e menor deriva.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 16,
                    textAlign: "center",
                    boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
                  }}
                >
                  <Title level={5}>Cobertura Rápida de Grandes Áreas</Title>
                  <Paragraph type="secondary">
                    Alta produtividade por hora com operações automatizadas.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        <section
          style={{
            backgroundImage:
              "linear-gradient(90deg, #1d4ed8 0%, #1e40af 60%, #1d4ed8 100%)",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "32px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              color: "white",
            }}
          >
            <div>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: "white",
                }}
              >
                Pronto para otimizar sua produção?
              </Title>
              <Paragraph
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Fale com um consultor AgroDrones e descubra o melhor plano para
                sua fazenda.
              </Paragraph>
            </div>

            <Button
              type="primary"
              size="large"
              style={{
                borderRadius: 999,
                paddingInline: 30,
                backgroundColor: "#0f172a",
                borderColor: "#0f172a",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Fale com um Consultor
            </Button>
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#0b1f4a",
          }}
        >
          <div
            style={{
              maxWidth: 820,
              margin: "0 auto",
              padding: "24px 40px 32px",
              textAlign: "center",
            }}
          >
            <Title
              level={4}
              style={{
                marginTop: 0,
                marginBottom: 16,
                color: "white",
              }}
            >
              Pronto para otimizar sua produção?
            </Title>
            <Button
              type="primary"
              size="large"
              style={{
                borderRadius: 999,
                paddingInline: 30,
                backgroundColor: "#2563eb",
                borderColor: "#2563eb",
                fontWeight: 600,
              }}
            >
              Fale com um Consultor
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
