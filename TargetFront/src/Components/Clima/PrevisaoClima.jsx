import {
  CloudOutlined,
  SunOutlined,
  ThunderboltOutlined,
  LoadingOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Alert, Tag } from "antd";
import { useEffect, useState } from "react";
import { getPrevisaoDia } from "../../services/clima.service";

function iconeClima(code) {
  if (code === 0 || code === 1) return <SunOutlined />;
  if (code >= 95) return <ThunderboltOutlined />;
  return <CloudOutlined />;
}

const ESTILOS = {
  ok: {
    box: { background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534" },
    tag: "success",
    alert: "success",
    titulo: "Condições favoráveis para operação",
  },
  atencao: {
    box: { background: "#fff7ed", border: "1px solid #fed7aa", color: "#c2410c" },
    tag: "warning",
    alert: "warning",
    titulo: "Atenção ao voar",
  },
  critico: {
    box: { background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" },
    tag: "error",
    alert: "error",
    titulo: "Condições desfavoráveis para voo",
  },
};

export default function PrevisaoClima({ cidade, data, compact = false }) {
  const [previsao, setPrevisao] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!data) return;

    let ativo = true;

    async function carregar() {
      try {
        setLoading(true);
        setErro(false);
        const result = await getPrevisaoDia(cidade, data);
        if (ativo) setPrevisao(result);
      } catch {
        if (ativo) {
          setErro(true);
          setPrevisao(null);
        }
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [cidade, data]);

  if (loading) {
    return (
      <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
        <LoadingOutlined spin /> Carregando clima...
      </div>
    );
  }

  if (erro || !previsao) {
    return (
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
        Previsão indisponível
      </div>
    );
  }

  const alertas = previsao.alertas;
  const nivel = alertas?.nivel ?? "ok";
  const tema = ESTILOS[nivel] ?? ESTILOS.ok;

  if (compact) {
    return (
      <div style={{ marginTop: 4 }}>
        <div
          style={{
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
            padding: nivel !== "ok" ? "4px 6px" : 0,
            borderRadius: 6,
            ...tema.box,
          }}
        >
          {iconeClima(previsao.code)}
          <span>
            {Math.round(previsao.tempMax)}°C · {previsao.chuvaPct ?? 0}% chuva ·{" "}
            {Math.round(previsao.ventoKmh ?? 0)} km/h vento
          </span>
        </div>
        <Tag
          icon={nivel === "ok" ? <CheckCircleOutlined /> : <WarningOutlined />}
          color={tema.tag}
          style={{ marginTop: 4, fontSize: 10, lineHeight: "18px" }}
        >
          {alertas?.rotulo}
        </Tag>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      {nivel !== "ok" && (
        <Alert
          type={tema.alert}
          showIcon
          icon={<WarningOutlined />}
          message={tema.titulo}
          description={
            alertas.mensagens?.length > 0 ? (
              <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
                {alertas.mensagens.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            ) : null
          }
          style={{ marginBottom: 10 }}
        />
      )}

      {nivel === "ok" && (
        <Alert
          type="success"
          showIcon
          message={tema.titulo}
          style={{ marginBottom: 10 }}
        />
      )}

      <div
        style={{
          padding: 12,
          borderRadius: 8,
          ...tema.box,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 6, display: "flex", gap: 6 }}>
          {iconeClima(previsao.code)}
          Previsão do tempo — {previsao.cidade}
          {previsao.uf ? `/${previsao.uf}` : ""}
        </div>
        <div style={{ fontSize: 13 }}>
          <div>{previsao.descricao}</div>
          <div>
            Máx. {Math.round(previsao.tempMax)}°C · Mín. {Math.round(previsao.tempMin)}°C
          </div>
          <div style={alertas?.chuvaAlta ? { fontWeight: 700 } : undefined}>
            Chuva: {previsao.chuvaPct ?? 0}%
            {alertas?.chuvaAlta && " ⚠️"}
          </div>
          <div style={alertas?.ventoAlto ? { fontWeight: 700 } : undefined}>
            Vento: {Math.round(previsao.ventoKmh ?? 0)} km/h
            {alertas?.ventoAlto && " ⚠️"}
          </div>
        </div>
      </div>
    </div>
  );
}
