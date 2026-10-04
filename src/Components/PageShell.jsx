import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function PageShell({ title, subtitle, actions, children }) {
  return (
    <div className="page-shell">
      <Card>
        <Title level={2} style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>
          {title}
        </Title>

        {subtitle && (
          <Paragraph style={{ marginBottom: 20 }}>{subtitle}</Paragraph>
        )}

        {actions && (
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {actions}
          </div>
        )}

        {children}
      </Card>
    </div>
  );
}
