import { Card } from "antd";

export default function ServicosCards() {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
      <Card title="Pulverização">
        Até 50% menos uso de defensivos comparado a tratores, com aplicação mais
        precisa por drone.
      </Card>

      <Card title="Sementes">
        Até 40% mais eficiência na distribuição de sementes em áreas de difícil
        acesso.
      </Card>

      <Card title="Fertilizantes">
        Redução de até 30% no desperdício com aplicação inteligente e
        localizada.
      </Card>

      <Card title="Mapeamento">
        Análise da lavoura até 90% mais rápida com levantamento aéreo por
        drones.
      </Card>
    </div>
  );
}
