import { Card, Button, Modal, Tag } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";

export default function CalendarioOrcamentos({ orcamentos }) {
  const [mesAtual, setMesAtual] = useState(dayjs());
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

  const inicioMes = mesAtual.startOf("month");
  const diasNoMes = mesAtual.daysInMonth();
  const primeiroDiaSemana = inicioMes.day();

  const dias = [];

  for (let i = 0; i < primeiroDiaSemana; i++) {
    dias.push(null);
  }

  for (let d = 1; d <= diasNoMes; d++) {
    dias.push(d);
  }

  function mudarMes(valor) {
    setMesAtual(mesAtual.add(valor, "month"));
  }

  function getOrcamentosDoDia(dia) {
    return orcamentos.filter(
      (o) =>
        dayjs(o.data).date() === dia &&
        dayjs(o.data).month() === mesAtual.month(),
    );
  }

  function corServico(servico) {
    if (servico === "Pulverização") return "green";
    if (servico === "Adubação") return "blue";
    if (servico === "Plantio") return "purple";
    return "default";
  }

  return (
    <>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Button icon={<LeftOutlined />} onClick={() => mudarMes(-1)} />

        <h2>{mesAtual.format("MMMM YYYY")}</h2>

        <Button icon={<RightOutlined />} onClick={() => mudarMes(1)} />
      </div>

      {/* Dias da semana */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Grid calendário */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 10,
        }}
      >
        {dias.map((dia, index) => (
          <div
            key={index}
            style={{
              minHeight: 140,
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 8,
              background: "#fafafa",
            }}
          >
            {dia && (
              <>
                <div style={{ fontWeight: "bold", marginBottom: 5 }}>{dia}</div>

                {getOrcamentosDoDia(dia).map((orc) => (
                  <Card
                    key={orc.id}
                    size="small"
                    hoverable
                    style={{ marginBottom: 6 }}
                    onClick={() => setOrcamentoSelecionado(orc)}
                  >
                    <div>
                      <strong>{orc.cliente}</strong>
                    </div>

                    <div>Orçamento #{orc.numero}</div>

                    <Tag color={corServico(orc.servico)}>{orc.servico}</Tag>
                  </Card>
                ))}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modal detalhes */}
      <Modal
        open={!!orcamentoSelecionado}
        onCancel={() => setOrcamentoSelecionado(null)}
        footer={null}
        title="Detalhes do Orçamento"
      >
        {orcamentoSelecionado && (
          <>
            <p>
              <b>Cliente:</b> {orcamentoSelecionado.cliente}
            </p>

            <p>
              <b>Orçamento:</b> #{orcamentoSelecionado.numero}
            </p>

            <p>
              <b>Endereço:</b> {orcamentoSelecionado.endereco}
            </p>

            <p>
              <b>Serviço:</b> {orcamentoSelecionado.servico}
            </p>

            <p>
              <b>Data:</b>{" "}
              {dayjs(orcamentoSelecionado.data).format("DD/MM/YYYY")}
            </p>
          </>
        )}
      </Modal>
    </>
  );
}
