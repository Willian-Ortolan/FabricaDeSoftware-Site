import { Card, Typography } from "antd";
import GridEmpresas from "./GridEmpresas";

const { Title, Paragraph } = Typography;

export default function SuperAdminPanel() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2} style={{ marginTop: 0 }}>
        Empresas
      </Title>
      <Paragraph type="secondary">
        Gerencie empresas, administradores e acesso ao sistema multi-tenant.
      </Paragraph>
      <Card style={{ borderRadius: 16 }}>
        <GridEmpresas />
      </Card>
    </div>
  );
}
