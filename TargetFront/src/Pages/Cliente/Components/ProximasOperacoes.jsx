import { Card, Tag } from "antd";

export default function ProximasOperacoes() {
  return (
    <Card title="Próximas Operações Agendadas">
      <div style={{ marginBottom: 20 }}>
        <b>Fazenda Primavera</b>
        <div>25/04/2024 às 08:00</div>
        <Tag color="blue">AGENDADO</Tag>
      </div>

      <div>
        <b>Fazenda São Jorge</b>
        <div>29/04/2024 às 07:30</div>
        <Tag color="blue">AGENDADO</Tag>
      </div>
    </Card>
  );
}
