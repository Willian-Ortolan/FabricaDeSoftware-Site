import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import PageShell from "../Components/PageShell";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageShell title="Página não encontrada" subtitle="A rota acessada não existe.">
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, não encontramos essa página."
        extra={
          <Button type="primary" onClick={() => navigate("/")} style={{ borderRadius: 12 }}>
            Voltar para Home
          </Button>
        }
      />
    </PageShell>
  );
}

