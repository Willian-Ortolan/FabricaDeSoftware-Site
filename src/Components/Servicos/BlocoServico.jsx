import { Button, Card, List, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function BlocoServico({
  titulo,
  introducao,
  itens = [],
  fechamento,
  textoBotao = "Solicitar Orçamento",
  icone,
  imagem,
}) {

  const navigate = useNavigate();

  return (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
        marginBottom: 32,
      }}
      styles={{ body: { padding: 24 } }}
    >
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* COLUNA DO TEXTO */}
        <div style={{ flex: 1 }}>
          {icone ? (
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
              }}
            >
              {typeof icone === "string" ? (
                <img
                  src={icone}
                  alt=""
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: "#e0ecff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1d4ed8",
                    fontSize: 24,
                  }}
                >
                  {icone}
                </div>
              )}
            </div>
          ) : null}

          <Title level={4} style={{ marginTop: 0, marginBottom: 12 }}>
            {titulo}
          </Title>

          <Paragraph type="secondary" style={{ marginBottom: 16 }}>
            {introducao}
          </Paragraph>

          <List
            dataSource={itens}
            bordered={false}
            style={{ marginBottom: 16 }}
            renderItem={(item) => (
              <List.Item style={{ border: "none", padding: "4px 0" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <CheckOutlined
                    style={{
                      color: "#16a34a",
                      marginTop: 5,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: 14,
                    }}
                  >
                    {item}
                  </span>
                </span>
              </List.Item>
            )}
          />

          <Paragraph type="secondary" style={{ marginBottom: 20 }}>
            {fechamento}
          </Paragraph>

          <Button
            type="primary"
            onClick={() => navigate("/contratar")}
            style={{
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
              border: "none",
              fontWeight: 600,
              paddingInline: 24,
            }}
          >
            {textoBotao}
          </Button>
        </div>

        {/* COLUNA DA IMAGEM */}
        {imagem && (
          <div style={{ flex: 1 }}>
            <img
              src={imagem}
              alt={titulo}
              style={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
}

export default BlocoServico;