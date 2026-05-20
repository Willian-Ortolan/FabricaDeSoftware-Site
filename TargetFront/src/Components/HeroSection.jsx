import { Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";

import BannerHome from "../assets/Banner_Home.png";
import { ButtonNossosServicos } from "./ConhecaServicosButton/ButtonNossosServicos";

export default function HeroSection() {

  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: 520,
        backgroundImage: `linear-gradient(90deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.8) 38%, rgba(15,23,42,0.15) 70%), url(${BannerHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex",
        alignItems: "center",
        padding: "72px 72px 64px",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 620 }}>
        <Tag
          color="#1d4ed8"
          style={{
            borderRadius: 999,
            padding: "6px 14px",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Pulverização e Mapeamento Aéreo
        </Tag>

        <h1
          style={{
            fontSize: 40,
            lineHeight: 1.15,
            margin: 0,
            fontWeight: 700,
          }}
        >
          Pulverização e Mapeamento Aéreo de Alta Precisão
        </h1>

        <p
          style={{
            marginTop: 16,
            fontSize: 16,
            maxWidth: 520,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          A tecnologia dos drones transformando a agricultura, com economia de
          insumos e monitoramento em tempo real da sua lavoura.
        </p>

        <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
          
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/contratar")}
            style={{
              background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
              borderRadius: 999,
              fontWeight: 600,
              paddingInline: 28,
              boxShadow: "0 12px 25px rgba(37,99,235,0.45)",
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