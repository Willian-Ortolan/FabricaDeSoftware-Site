import { Card, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

function CardPadrao({ Titulo, Texto, Icone, IconeTamanho = 40 }) {
  const tamanho = Number(IconeTamanho) || 40;
  return (
    <Col xs={24} md={6}>
      <Card
        style={{
          borderRadius: 16,
          textAlign: "center",
          boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
          }}
        >
          {Icone ? (
            <div
              style={{
                width: tamanho,
                height: tamanho,
                borderRadius: 8,
                backgroundColor: "#e0ecff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1d4ed8",
                fontSize: 24,
              }}
            >
              {typeof Icone === "string" ? (
                <img
                  src={Icone}
                  alt=""
                  style={{
                    width: tamanho,
                    height: tamanho,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div style={{ fontSize: tamanho, lineHeight: 1 }}>{Icone}</div>
              )}
            </div>
          ) : null}

          <Title
            level={4}
            style={{
              margin: 0,
              fontSize: 18,
            }}
          >
            {Titulo}
          </Title>
        </div>

        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            margin: "6px 0 10px",
          }}
        />

        <Paragraph
          type="secondary"
          style={{
            margin: 0,
            fontSize: 14,
          }}
        >
          {Texto}
        </Paragraph>
      </Card>
    </Col>
  );
}

export default CardPadrao;
