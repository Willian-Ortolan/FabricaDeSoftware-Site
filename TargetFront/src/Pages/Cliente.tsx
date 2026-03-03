import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  EnvironmentOutlined,
  FileTextOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const welcomeBg =
  "linear-gradient(105deg, rgba(13,28,72,0.92) 0%, rgba(13,28,72,0.5) 50%, transparent 70%), url('https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80')";

const metrics = [
  {
    icon: <EnvironmentOutlined style={{ fontSize: 28, color: "#1d4ed8" }} />,
    value: 3,
    label: "Propriedades Monitoradas",
  },
  {
    icon: <FileTextOutlined style={{ fontSize: 28, color: "#1d4ed8" }} />,
    value: 1,
    label: "Solicitações Pendentes",
  },
  {
    icon: (
      <span style={{ fontSize: 28, color: "#1d4ed8" }} aria-hidden>
        ✈
      </span>
    ),
    value: 15,
    label: "Pulverizações realizadas",
  },
  {
    icon: (
      <span style={{ fontSize: 28, color: "#1d4ed8" }} aria-hidden>
        🗺
      </span>
    ),
    value: 7,
    label: "Mapas Disponíveis",
  },
];

const properties = [
  {
    id: "1",
    name: "Fazenda Primavera",
    location: "Cidade",
    area: "1.120 ha",
    status: "Sem próximas operações agendadas.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    name: "Sítio Boa Esperança",
    location: "Cidade",
    area: "303 ha",
    status: "Sem próximas operações agendadas.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
  },
];

const nextOps = [
  {
    property: "Fazenda Primavera",
    date: "25/04/2024 às 08:00",
    type: "Pulverização",
  },
  {
    property: "Fazenda São Jorge",
    date: "29/04/2024 às 07:30",
    type: "Mapeamento",
  },
];

const latestMaps = [
  { date: "19/04/2024", property: "Fazenda São Jorge", count: "10 mapas no total" },
  { date: "10/04/2024", property: "Sítio Boa Esperança", count: "7 mapas no total" },
];

const historyColumns = [
  { title: "Data", dataIndex: "data", key: "data", width: 110 },
  { title: "Propriedade", dataIndex: "propriedade", key: "propriedade" },
  { title: "Serviço", dataIndex: "servico", key: "servico" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: () => (
      <Tag color="success" style={{ borderRadius: 999 }}>
        CONCLUÍDO
      </Tag>
    ),
  },
];

const historyData = [
  { key: "1", data: "26/04/2024", propriedade: "Fazenda Primavera", servico: "Pulverização" },
  { key: "2", data: "13/04/2024", propriedade: "Fazenda São Jorge", servico: "Mapeamento" },
  { key: "3", data: "16/04/2024", propriedade: "Fazenda São Jorge", servico: "Pulverização" },
];

function OperationsChart() {
  const w = 400;
  const h = 180;
  const pts1 = "0,120 50,100 100,80 150,90 200,60 250,70 300,50 350,40 400,30";
  const pts2 = "0,140 50,130 100,110 150,100 200,120 250,100 300,110 350,90 400,100";
  return (
    <div style={{ width: "100%", height: 200 }}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="lineGreen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          points={pts1}
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          points={pts2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function Cliente() {
  return (
    <div style={{ padding: "24px 32px 40px" }}>
      {/* Welcome banner */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 24,
          minHeight: 160,
          background: welcomeBg,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title level={2} style={{ color: "white", margin: 0, fontWeight: 700 }}>
          Bem-vindo à sua Área de Cliente, João Silva!
        </Title>
        <Paragraph
          style={{
            color: "rgba(255,255,255,0.9)",
            marginTop: 8,
            marginBottom: 0,
            maxWidth: 560,
            fontSize: 15,
          }}
        >
          Gerencie suas propriedades, acompanhe solicitações e visualize os mapas e relatórios com
          facilidade.
        </Paragraph>
      </div>

      {/* Metric cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {metrics.map((m) => (
          <Col xs={24} sm={12} md={6} key={m.label}>
            <Card
              bordered={false}
              style={{
                borderRadius: 12,
                background: "#e8eef7",
                boxShadow: "none",
              }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div>{m.icon}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a" }}>{m.value}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{m.label}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        {/* Minhas Propriedades */}
        <Col xs={24} lg={14}>
          <Title level={4} style={{ marginBottom: 16 }}>
            Minhas Propriedades
          </Title>
          <Row gutter={[16, 16]}>
            {properties.map((p) => (
              <Col xs={24} md={12} key={p.id}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
                    overflow: "hidden",
                    padding: 0,
                  }}
                  bodyStyle={{ padding: 0 }}
                >
                  <div
                    style={{
                      height: 120,
                      background: `url('${p.image}') center/cover`,
                    }}
                  />
                  <div style={{ padding: 16 }}>
                    <Title level={5} style={{ margin: "0 0 4px" }}>
                      {p.name}
                    </Title>
                    <Paragraph type="secondary" style={{ margin: "0 0 8px", fontSize: 13 }}>
                      {p.location} · {p.area}
                    </Paragraph>
                    <Paragraph type="secondary" style={{ margin: "0 0 12px", fontSize: 12 }}>
                      {p.status}
                    </Paragraph>
                    <Button
                      type="primary"
                      size="small"
                      style={{ borderRadius: 8, fontWeight: 600 }}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Próximas Operações */}
        <Col xs={24} lg={10}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Próximas Operações Agendadas
            </Title>
            <Button type="link" style={{ padding: 0, fontWeight: 600 }}>
              Ver Todas &gt;
            </Button>
          </div>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
            }}
          >
            {nextOps.map((op, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom:
                    i < nextOps.length - 1 ? "1px solid #f1f5f9" : "none",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    <EnvironmentOutlined style={{ marginRight: 6, color: "#64748b" }} />
                    {op.property}
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                    {op.date} · {op.type}
                  </div>
                </div>
                <Tag color="blue" style={{ borderRadius: 999, fontWeight: 600 }}>
                  AGENDADO
                </Tag>
              </div>
            ))}
            <Button type="link" style={{ padding: "8px 0 0", fontWeight: 600 }}>
              Ver Todas &gt;
            </Button>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {/* Histórico de Operações (chart) */}
        <Col xs={24} lg={14}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Histórico de Operações
            </Title>
            <Select
              defaultValue="6m"
              style={{ width: 160 }}
              options={[
                { value: "6m", label: "Últimos 6 meses" },
                { value: "12m", label: "Últimos 12 meses" },
              ]}
            />
          </div>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
            }}
          >
            <div style={{ marginBottom: 8, fontSize: 13, color: "#64748b" }}>
              Operações ao longo do tempo
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: "#2563eb" }}>● Pulverizações</span>
              <span style={{ fontSize: 12, color: "#16a34a" }}>● Mapeamentos</span>
            </div>
            <OperationsChart />
          </Card>
        </Col>

        {/* Últimos Mapas Gerados */}
        <Col xs={24} lg={10}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Últimos Mapas Gerados
            </Title>
            <Button type="link" style={{ padding: 0, fontWeight: 600 }}>
              Ver Todas &gt;
            </Button>
          </div>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
            }}
          >
            {latestMaps.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: i < latestMaps.length - 1 ? "1px solid #f1f5f9" : "none",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 48,
                    borderRadius: 8,
                    background: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <SearchOutlined style={{ color: "#64748b" }} />
                  <EyeOutlined
                    style={{
                      position: "absolute",
                      right: 6,
                      bottom: 6,
                      fontSize: 12,
                      color: "#64748b",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{m.date}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{m.property}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{m.count}</div>
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Histórico (table) */}
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Histórico de avaliação
          </Title>
          <Button type="link" style={{ padding: 0, fontWeight: 600 }}>
            Ver Histórico Completo &gt;
          </Button>
        </div>
        <Card
          bordered={false}
          style={{
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
          }}
        >
          <Table
            dataSource={historyData}
            columns={historyColumns}
            pagination={false}
            size="middle"
          />
        </Card>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: 12,
            paddingInline: 32,
            fontWeight: 600,
            background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
            border: "none",
          }}
        >
          Ver Histórico Completo
        </Button>
      </div>
    </div>
  );
}
