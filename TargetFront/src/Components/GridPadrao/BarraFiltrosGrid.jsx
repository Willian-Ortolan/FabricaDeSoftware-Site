import { Button, Col, Input, Row, Select } from "antd";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";

function FiltroSelect({ placeholder, value, onChange, options }) {
  return (
    <Select
      allowClear
      showSearch
      optionFilterProp="label"
      placeholder={placeholder}
      style={{ width: "100%" }}
      value={value || undefined}
      onChange={(valor) => onChange(valor ?? "")}
      options={options}
    />
  );
}

export default function BarraFiltrosGrid({
  cliente,
  onClienteChange,
  propriedade,
  onPropriedadeChange,
  propriedadeOptions,
  servico,
  onServicoChange,
  servicoOptions,
  status,
  onStatusChange,
  statusOptions,
  statusPlaceholder = "Situação",
  showCliente = true,
  showServico = false,
  onLimpar,
}) {
  const temFiltro = Boolean(
    (showCliente && cliente) || propriedade || (showServico && servico) || status,
  );

  return (
    <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
      {showCliente && (
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            allowClear
            placeholder="Buscar cliente..."
            prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
            value={cliente}
            onChange={(e) => onClienteChange(e.target.value)}
          />
        </Col>
      )}
      <Col xs={24} sm={12} md={8} lg={6}>
        {propriedadeOptions != null ? (
          <FiltroSelect
            placeholder="Propriedade"
            value={propriedade}
            onChange={onPropriedadeChange}
            options={propriedadeOptions}
          />
        ) : (
          <Input
            allowClear
            placeholder="Buscar propriedade..."
            prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
            value={propriedade}
            onChange={(e) => onPropriedadeChange(e.target.value)}
          />
        )}
      </Col>
      {showServico && (
        <Col xs={24} sm={12} md={8} lg={6}>
          {servicoOptions != null ? (
            <FiltroSelect
              placeholder="Serviço"
              value={servico}
              onChange={onServicoChange}
              options={servicoOptions}
            />
          ) : (
            <Input
              allowClear
              placeholder="Buscar serviço..."
              prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
              value={servico}
              onChange={(e) => onServicoChange(e.target.value)}
            />
          )}
        </Col>
      )}
      {statusOptions != null && (
        <Col xs={24} sm={12} md={8} lg={6}>
          <FiltroSelect
            placeholder={statusPlaceholder}
            value={status}
            onChange={onStatusChange}
            options={statusOptions}
          />
        </Col>
      )}
      {temFiltro && onLimpar && (
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button icon={<ClearOutlined />} onClick={onLimpar}>
            Limpar filtros
          </Button>
        </Col>
      )}
    </Row>
  );
}
