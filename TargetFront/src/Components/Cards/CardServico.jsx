import { Card, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

function CardServico({ Icone, Titulo, Descricao, IconeTamanho = 40 }) {
  const tamanho = Number(IconeTamanho) || 40;
  return (
    <Col xs={24} md={8}>
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
          padding: 0,
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
          {Descricao}
        </Paragraph>
      </Card>
    </Col>
  );
}

export default CardServico;
