import { Card, Row, Col, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import HeroSection from "../Components/HeroSection";
import CardPadrao from "../Components/Cards/CardPadrao";
import CardServico from "../Components/Cards/CardServico";
import ComoFuncionaStep from "../Components/ComoFuncionaStep";
import GotaAguaVetor from "../assets/GotaAguaVetor.png";
import { GiPlantWatering, GiForest, GiTakeMyMoney } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import { LuMapPinned } from "react-icons/lu";
import { PiMapTrifoldFill, PiDrone } from "react-icons/pi";
import { FaRegClipboard, FaChartLine } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiTreasureMapLine } from "react-icons/ri";
import { useEmpresaOptional } from "../contexts/EmpresaContext";

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();
  const empresa = useEmpresaOptional();
  const contratarPath = empresa?.path ? empresa.path("contratar") : "/contratar";
  const corPrimaria = empresa?.corPrimaria ?? "#1d4ed8";

  return (
    <>
      <HeroSection />

      <main
        style={{
          backgroundColor: "#f3f6fb",
        }}
      >
        <section className="page-section page-section--compact">
          <Row gutter={[24, 24]}>
            <CardServico
              Icone={<LuMapPinned />}
              Titulo="Mapeamento Aéreo"
              Descricao="Imagens NDVI, ortomosaicos e relatórios completos da sua área produtiva."
            />

            <CardServico
              Icone={<GiPlantWatering />}
              Titulo="Pulverização de Precisão"
              Descricao="Aplicação direcionada, reduzindo desperdícios e impacto ambiental."
            />

            <CardServico
              Icone={<GiForest />}
              Titulo="Monitoramento Agrícola"
              Descricao="Acompanhamento constante da lavoura com dados precisos para decisão rápida."
            />
          </Row>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div className="page-section" style={{ position: "relative" }}>
            <Title
              level={3}
              style={{ textAlign: "center", marginBottom: 40, marginTop: 0 }}
            >
              Como Funciona
            </Title>

            <div className="como-funciona-arrows">
              {/* As setas são posicionadas exatamente no meio entre os 4 cards */}
              <FiArrowRight
                style={{
                  position: "absolute",
                  left: "25%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#9ca3af",
                  fontSize: 32,
                }}
              />
              <FiArrowRight
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#9ca3af",
                  fontSize: 32,
                }}
              />
              <FiArrowRight
                style={{
                  position: "absolute",
                  left: "75%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#9ca3af",
                  fontSize: 32,
                }}
              />
            </div>

            <Row
              gutter={[24, 32]}
              justify="center"
              style={{ position: "relative", zIndex: 1 }}
            >
              <ComoFuncionaStep
                Icone={<RiTreasureMapLine />}
                Titulo="Planejamento da Missão"
                Descricao="Definimos área, rota e objetivos da operação."
              />

              <ComoFuncionaStep
                Icone={<PiDrone />}
                Titulo="Voo Automático"
                Descricao="Drones executam o plano com total precisão."
              />

              <ComoFuncionaStep
                Icone={<FaRegClipboard />}
                Titulo="Coleta de Dados"
                Descricao="Captura de imagens, índices e telemetria da área."
              />

              <ComoFuncionaStep
                Icone={<FaChartLine />}
                Titulo="Relatório Inteligente"
                Descricao="Entregamos insights e mapas para o produtor."
              />
            </Row>
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#f3f6fb",
          }}
        >
          <div className="page-section">
            <Title
              level={3}
              style={{ textAlign: "center", marginBottom: 32, marginTop: 0 }}
            >
              Nossos Diferenciais
            </Title>

            <Row gutter={[24, 24]}>
              <CardPadrao
                Icone={<MdOutlineWaterDrop atering />}
                IconeTamanho={64}
                Titulo={"Economia de até 80% em água"}
                Texto={"Otimize uso de insumos e reduza custos operacionais."}
              />

              <CardPadrao
                Icone={<TbTargetArrow />}
                IconeTamanho={64}
                Titulo={"Precisão Centimétrica"}
                Texto={"Navegação guiada por RTK e mapas de alta resolução."}
              />

              <CardPadrao
                Icone={<GiForest />}
                IconeTamanho={64}
                Titulo={"Menos Impacto Ambiental"}
                Texto={"Menor contato humano com defensivos e menor deriva."}
              />

              <CardPadrao
                Icone={<LuMapPinned />}
                IconeTamanho={64}
                Titulo={"Cobertura Rápida de Grandes Áreas"}
                Texto={
                  "Alta produtividade por hora com operações automatizadas."
                }
              />
            </Row>
          </div>
        </section>

        <section
          style={{
            backgroundImage: `linear-gradient(90deg, ${corPrimaria} 0%, ${corPrimaria}cc 60%, ${corPrimaria} 100%)`,
          }}
        >
          <div className="home-cta-bar">
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
                Fale com um consultor
                {empresa?.nome ? ` ${empresa.nome}` : " AgroDrones"} e descubra o melhor plano para
                sua fazenda.
              </Paragraph>
            </div>

            <Button
              type="primary"
              size="large"
              onClick={() => navigate(contratarPath)}
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
      </main>
    </>
  );
}
