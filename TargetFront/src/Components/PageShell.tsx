import { Card, Typography } from "antd";
import type { ReactNode } from "react";

const { Title, Paragraph } = Typography;

type PageShellProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function PageShell({
  title,
  subtitle,
  actions,
  children,
}: PageShellProps) {
  return (
    <main style={{ backgroundColor: "#f3f6fb", minHeight: "100%" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 40px" }}>
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            marginBottom: 20,
          }}
          styles={{ body: { padding: 20 } }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <Title level={3} style={{ margin: 0 }}>
                {title}
              </Title>
              {subtitle ? (
                <Paragraph type="secondary" style={{ marginTop: 6, marginBottom: 0 }}>
                  {subtitle}
                </Paragraph>
              ) : null}
            </div>
            {actions ? <div style={{ flex: "0 0 auto" }}>{actions}</div> : null}
          </div>
        </Card>

        {children}
      </div>
    </main>
  );
}

