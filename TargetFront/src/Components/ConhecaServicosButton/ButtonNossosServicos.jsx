import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function ButtonNossosServicos() {

  const navigate = useNavigate();

  return (
    <Button
      size="large"
      onClick={() => navigate("/servicos")}
      style={{
        borderRadius: 999,
        paddingInline: 26,
        borderColor: "rgba(255,255,255,0.6)",
        color: "white",
        backgroundColor: "rgba(15,23,42,0.55)",
      }}
    >
      Conheça os Serviços
    </Button>
  );
}