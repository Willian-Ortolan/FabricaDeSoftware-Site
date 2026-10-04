import { Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

// Item da seção "Como Funciona": ícone em destaque e texto abaixo, sem borda de card.
function ComoFuncionaStep({ Icone, Titulo, Descricao, Tamanho = 48 }) {
  const tamanho = Number(Tamanho) || 48;
  return (
    <Col xs={24} md={6}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
          }}
        >
          {Icone ? (
            typeof Icone === "string" ? (
              <img
                src={Icone}
                alt=""
                style={{ width: tamanho, height: tamanho, objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  fontSize: tamanho,
                  color: "#1d4ed8",
                  lineHeight: 1,
                }}
              >
                {Icone}
              </div>
            )
          ) : null}
        </div>

        <Title level={5} style={{ marginBottom: 6 }}>
          {Titulo}
        </Title>
        <Paragraph type="secondary" style={{ margin: 0 }}>
          {Descricao}
        </Paragraph>
      </div>
    </Col>
  );
}

export default ComoFuncionaStep;
