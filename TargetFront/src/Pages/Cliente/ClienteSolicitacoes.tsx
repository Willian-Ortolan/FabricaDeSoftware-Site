import { Card, Typography } from "antd";
import PageShell from "../../Components/PageShell";

const { Paragraph } = Typography;

export default function ClienteSolicitacoes() {
  return (
    <PageShell title="Solicitações" subtitle="Acompanhe e crie novas solicitações.">
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Paragraph type="secondary">Conteúdo em construção.</Paragraph>
      </Card>
    </PageShell>
  );
}
