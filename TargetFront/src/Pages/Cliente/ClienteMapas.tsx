import { Card, Typography } from "antd";
import PageShell from "../../Components/PageShell";

const { Paragraph } = Typography;

export default function ClienteMapas() {
  return (
    <PageShell title="Mapas Gerados" subtitle="Visualize e baixe os mapas gerados.">
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Paragraph type="secondary">Conteúdo em construção.</Paragraph>
      </Card>
    </PageShell>
  );
}
