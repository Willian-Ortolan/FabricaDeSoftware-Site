import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function PageShell({ title, subtitle, actions, children }) {
  return (
    <div style={{ padding: 40 }}>
      <Card>
        <Title level={2}>{title}</Title>

        {subtitle && (
          <Paragraph style={{ marginBottom: 20 }}>{subtitle}</Paragraph>
        )}

        {actions && <div style={{ marginBottom: 20 }}>{actions}</div>}

        {children}
      </Card>
    </div>
  );
}
