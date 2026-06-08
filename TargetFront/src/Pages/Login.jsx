import { Button, Card, Form, Input, Typography, message } from "antd";
import PageShell from "../Components/PageShell";
import { useNavigate, useParams } from "react-router-dom";
import { login, getMe } from "../services/auth.service";
import { getRoleFromToken, normalizeRole, removeToken, ROLES } from "../utils/auth";
import { regrasEmail, regrasSenha } from "../utils/validacao";
import { useEmpresaOptional } from "../contexts/EmpresaContext";
import { homePathAfterLogin } from "../utils/tenantPaths";

const { Paragraph, Title } = Typography;

function resolveRole(token, me) {
  let role = getRoleFromToken(token);
  if (!role && me) {
    role = normalizeRole(me.perfil ?? me.Perfil);
  }
  return role;
}

function resolveSlug(me, urlSlug, empresaSlugProp) {
  return (
    empresaSlugProp ??
    urlSlug ??
    me?.empresaSlug ??
    me?.EmpresaSlug ??
    null
  );
}

export default function Login({ mode, empresaSlug: empresaSlugProp }) {
  const navigate = useNavigate();
  const { slug: urlSlug } = useParams();
  const empresaCtx = useEmpresaOptional();
  const isSuperAdmin = mode === "super-admin";
  const slug = isSuperAdmin ? undefined : (empresaSlugProp ?? urlSlug);

  const titulo = isSuperAdmin
    ? "Super Administrador"
    : empresaCtx?.nome
      ? `Login — ${empresaCtx.nome}`
      : "Login";

  const subtitulo = isSuperAdmin
    ? "Acesso exclusivo à gestão de empresas da plataforma."
    : "Acesse seus relatórios, histórico de serviços e solicitações.";

  async function handleLogin(values) {
    try {
      const data = await login(values.email, values.senha, slug);
      const me = await getMe();
      const role = resolveRole(data.token, me);
      const empresaSlug = resolveSlug(me, urlSlug, slug);

      if (isSuperAdmin && role !== ROLES.SUPER_ADMIN) {
        removeToken();
        message.error("Esta área é exclusiva para Super Administrador.");
        return;
      }

      if (!isSuperAdmin && role === ROLES.SUPER_ADMIN) {
        removeToken();
        message.error(
          "Super Administrador não pode entrar pelo login da empresa. Use a página inicial da plataforma.",
        );
        return;
      }

      const destino = homePathAfterLogin(role, empresaSlug);
      if (destino === "/" && role !== "SuperAdmin") {
        message.error(
          `Perfil não reconhecido${role ? `: "${role}"` : ""}.`,
        );
        return;
      }

      navigate(destino);
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem ||
        error.message ||
        "Erro ao realizar login. Verifique suas credenciais.";
      message.error(mensagem);
    }
  }

  const formulario = (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
        maxWidth: 480,
        width: "100%",
      }}
    >
      <Title level={4} style={{ marginTop: 0, marginBottom: 6 }}>
        Entrar
      </Title>

      <Paragraph type="secondary" style={{ marginTop: 0 }}>
        Use seu e-mail e senha para acessar.
      </Paragraph>

      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item label="E-mail" name="email" rules={regrasEmail()}>
          <Input placeholder="voce@exemplo.com" maxLength={200} />
        </Form.Item>

        <Form.Item label="Senha" name="senha" rules={regrasSenha()}>
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          style={{ borderRadius: 12, fontWeight: 600 }}
        >
          Entrar
        </Button>
      </Form>
    </Card>
  );

  if (isSuperAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32, color: "white" }}>
          <Title level={2} style={{ color: "white", marginBottom: 8 }}>
            {titulo}
          </Title>
          <Paragraph style={{ color: "#cbd5e1", marginBottom: 0 }}>{subtitulo}</Paragraph>
        </div>
        {formulario}
      </div>
    );
  }

  return (
    <PageShell title={titulo} subtitle={subtitulo}>
      <div style={{ maxWidth: 480 }}>{formulario}</div>
    </PageShell>
  );
}
