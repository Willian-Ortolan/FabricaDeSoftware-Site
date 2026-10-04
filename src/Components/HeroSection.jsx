import { Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEmpresaOptional } from "../contexts/EmpresaContext";

import BannerHome from "../assets/Banner_Home.png";
import { ButtonNossosServicos } from "./ConhecaServicosButton/ButtonNossosServicos";

export default function HeroSection() {
  const navigate = useNavigate();
  const empresa = useEmpresaOptional();
  const contratarPath = empresa?.path ? empresa.path("contratar") : "/contratar";
  const corPrimaria = empresa?.corPrimaria ?? "#1d4ed8";
  const nome = empresa?.nome;

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.8) 38%, rgba(15,23,42,0.15) 70%), url(${BannerHome})`,
      }}
    >
      <div style={{ maxWidth: 620, width: "100%" }}>
        <Tag
          color={corPrimaria}
          style={{
            borderRadius: 999,
            padding: "6px 14px",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Pulverização e Mapeamento Aéreo
        </Tag>

        <h1>
          {nome
            ? `${nome} — Pulverização e Mapeamento Aéreo`
            : "Pulverização e Mapeamento Aéreo de Alta Precisão"}
        </h1>

        <p
          style={{
            marginTop: 16,
            fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
            maxWidth: 520,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          A tecnologia dos drones transformando a agricultura, com economia de
          insumos e monitoramento em tempo real da sua lavoura.
        </p>

        <div className="hero-actions">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(contratarPath)}
            style={{
              background: `linear-gradient(90deg, ${corPrimaria} 0%, ${corPrimaria}dd 100%)`,
              borderRadius: 999,
              fontWeight: 600,
              paddingInline: 28,
              boxShadow: `0 12px 25px ${corPrimaria}73`,
            }}
          >
            Solicitar Orçamento
          </Button>

          <ButtonNossosServicos />
        </div>
      </div>
    </section>
  );
}
