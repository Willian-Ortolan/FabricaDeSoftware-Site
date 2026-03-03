import { Card, Typography } from "antd";
import PageShell from "../../Components/PageShell";

const { Paragraph } = Typography;

export default function ClienteRelatorios() {
  return (
    <PageShell title="Relatórios" subtitle="Acesse seus relatórios de operações.">
      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Paragraph type="secondary">Conteúdo em construção.</Paragraph>
      </Card>
    </PageShell>
  );
}
