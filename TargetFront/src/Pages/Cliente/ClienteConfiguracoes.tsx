import { Card, Typography } from "antd";
import PageShell from "../../Components/PageShell";

const { Paragraph } = Typography;

export default function ClienteConfiguracoes() {
  return (
    <PageShell title="Configurações" subtitle="Ajuste preferências da sua conta.">
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Paragraph type="secondary">Conteúdo em construção.</Paragraph>
      </Card>
    </PageShell>
  );
}
