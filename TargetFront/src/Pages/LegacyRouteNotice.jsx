import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageShell from "../Components/PageShell";

export default function LegacyRouteNotice({ titulo, descricao }) {
  const navigate = useNavigate();

  return (
    <PageShell title={titulo ?? "Rota antiga"} subtitle={descricao}>
      <Alert
        type="info"
        showIcon
        message="Esta rota foi descontinuada"
        description="O sistema agora é multi-empresa. Acesse pelo link da sua empresa (ex.: /e/sua-empresa) ou entre em contato com o administrador."
        style={{ marginBottom: 24 }}
      />
      <Button type="primary" onClick={() => navigate("/")}>
        Voltar
      </Button>
    </PageShell>
  );
}
