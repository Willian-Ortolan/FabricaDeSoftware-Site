import { Button } from "antd";

export default function HeroSection() {
  return (
    <div
      style={{
        height: "500px",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508614589041-895b88991e3e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        padding: "60px",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ fontSize: 42 }}>
          Pulverização e Mapeamento Aéreo de Alta Precisão
        </h1>
        <p>A tecnologia dos drones transformando a agricultura.</p>

        <div style={{ marginTop: 20 }}>
          <Button type="primary" size="large">
            Solicitar Orçamento
          </Button>
          <Button size="large" style={{ marginLeft: 10 }}>
            Conheça os Serviços
          </Button>
        </div>
      </div>
    </div>
  );
}
