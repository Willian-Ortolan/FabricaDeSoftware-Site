import { Card, Col, Typography } from "antd";

const { Text } = Typography;

export default function CardAdmin({ Titulo, onClick, active = false }) {
  return (
    <Col xs={24} sm={12} md={6}>
      <Card
        hoverable
        onClick={onClick}
        style={{
          borderRadius: 16,
          cursor: "pointer",
          boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
          border: active ? "2px solid #1677ff" : "1px solid #f0f0f0",
          background: active ? "#f0f7ff" : "#fff",
          transition: "all 0.2s ease",
          textAlign: "center",
          minHeight: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text strong style={{ fontSize: 15 }}>
          {Titulo}
        </Text>
      </Card>
    </Col>
  );
}
