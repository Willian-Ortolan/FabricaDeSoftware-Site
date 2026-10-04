import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useEmpresaOptional } from "../../contexts/EmpresaContext";

export function ButtonNossosServicos() {
  const navigate = useNavigate();
  const empresa = useEmpresaOptional();
  const servicosPath = empresa?.path ? empresa.path("servicos") : "/servicos";

  return (
    <Button
      size="large"
      onClick={() => navigate(servicosPath)}
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
