import { Card, Typography } from "antd";
import PageShell from "../../Components/PageShell";

const { Paragraph } = Typography;

export default function ClientePropriedades() {
  return (
    <PageShell title="Propriedades" subtitle="Gerencie suas propriedades cadastradas.">
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Paragraph type="secondary">Conteúdo em construção.</Paragraph>
      </Card>
    </PageShell>
  );
}
