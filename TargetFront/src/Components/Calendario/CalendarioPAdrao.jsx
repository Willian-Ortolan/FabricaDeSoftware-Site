import { Card, Button, Modal, Tag, Spin, message, Empty } from "antd";
import { LeftOutlined, RightOutlined, HolderOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { getOrcamentosAgendados, reagendarOrcamento } from "../../services/admin.service";
import PrevisaoClima from "../Clima/PrevisaoClima";

function normalizarOrcamentoCalendario(o) {
  const podeReagendar = o.podeReagendar ?? o.PodeReagendar;
  const status = o.status ?? o.Status ?? "";
  return {
    id: o.id ?? o.Id,
    cliente: o.cliente ?? o.Cliente ?? "",
    numero: o.numero ?? o.Numero,
    endereco: o.endereco ?? o.Endereco ?? "",
    cidade: o.cidade ?? o.Cidade ?? "",
    servico: o.servico ?? o.Servico ?? "",
    data: o.data ?? o.Data ?? "",
    status,
    podeReagendar:
      podeReagendar === true ||
      podeReagendar === "true" ||
      status === "Agendado" ||
      status === "AguardandoCliente",
  };
}

export default function CalendarioOrcamentos({
  orcamentos: orcamentosProp,
  useApi = false,
  dragEnabled = false,
  onUpdated,
}) {
  const [mesAtual, setMesAtual] = useState(dayjs());
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
  const [orcamentosApi, setOrcamentosApi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrastando, setArrastando] = useState(null);
  const [diaSobre, setDiaSobre] = useState(null);
  const arrastandoRef = useRef(null);
  const calendarioRef = useRef(null);

  const orcamentos = useApi ? orcamentosApi : orcamentosProp ?? [];

  const carregarOrcamentos = useCallback(async () => {
    if (!useApi) return;
    try {
      setLoading(true);
      const data = await getOrcamentosAgendados();
      const lista = Array.isArray(data) ? data.map(normalizarOrcamentoCalendario) : [];
      setOrcamentosApi(lista);
    } catch (error) {
      setOrcamentosApi([]);
      message.error(
        error.response?.data?.mensagem ||
          "Não foi possível carregar os orçamentos do calendário.",
      );
    } finally {
      setLoading(false);
    }
  }, [useApi]);

  useEffect(() => {
    carregarOrcamentos();
  }, [carregarOrcamentos]);

  const inicioMes = mesAtual.startOf("month");
  const diasNoMes = mesAtual.daysInMonth();
  const primeiroDiaSemana = inicioMes.day();

  const dias = [];
  for (let i = 0; i < primeiroDiaSemana; i++) dias.push(null);
  for (let d = 1; d <= diasNoMes; d++) dias.push(d);

  function mudarMes(valor) {
    setMesAtual((atual) => atual.add(valor, "month"));
  }

  function parseDataOrcamento(dataStr) {
    return dayjs(dataStr, "YYYY-MM-DD", true);
  }

  function getOrcamentosDoDia(dia) {
    return orcamentos.filter((o) => {
      if (!o?.data) return false;
      const dataOrc = parseDataOrcamento(o.data);
      if (!dataOrc.isValid()) return false;
      return (
        dataOrc.date() === dia &&
        dataOrc.month() === mesAtual.month() &&
        dataOrc.year() === mesAtual.year()
      );
    });
  }

  const totalNoMes = orcamentos.filter((o) => {
    const d = parseDataOrcamento(o?.data);
    return (
      d.isValid() &&
      d.month() === mesAtual.month() &&
      d.year() === mesAtual.year()
    );
  }).length;

  function corServico(servico) {
    if (servico === "Pulverização") return "green";
    if (servico === "Adubação") return "blue";
    if (servico === "Plantio") return "purple";
    return "default";
  }

  function statusTag(status) {
    const map = {
      Pendente: { color: "orange", label: "Pendente" },
      AguardandoCliente: { color: "gold", label: "Aguard. Cliente" },
      Agendado: { color: "green", label: "Agendado" },
      Concluído: { color: "default", label: "Concluído" },
    };
    const cfg = map[status] || { color: "default", label: status };
    return <Tag color={cfg.color}>{cfg.label}</Tag>;
  }

  function formatarDataReagendamento(dia) {
    return mesAtual.date(dia).hour(12).minute(0).second(0).format("YYYY-MM-DDTHH:mm:ss");
  }

  function diaSobCursor(clientX, clientY) {
    const el = document.elementFromPoint(clientX, clientY);
    const celula = el?.closest("[data-calendario-dia]");
    if (!celula) return null;
    const valor = celula.getAttribute("data-calendario-dia");
    return valor ? Number(valor) : null;
  }

  async function soltarNoDia(dia, orc) {
    if (!dragEnabled || !dia || !orc?.id) return;

    const novaDataStr = formatarDataReagendamento(dia);
    const dataAtual = parseDataOrcamento(orc.data);

    if (dataAtual.isValid() && novaDataStr.startsWith(dataAtual.format("YYYY-MM-DD"))) {
      return;
    }

    try {
      setLoading(true);
      await reagendarOrcamento(orc.id, novaDataStr);
      message.success(
        orc.status === "AguardandoCliente"
          ? "Data alterada. O cliente ainda precisa confirmar."
          : "Data alterada. O cliente precisa aprovar novamente para retornar à agenda.",
      );
      await carregarOrcamentos();
      onUpdated?.();
    } catch (error) {
      message.error(error.response?.data?.mensagem || "Erro ao reagendar.");
    } finally {
      setLoading(false);
    }
  }

  function iniciarArraste(e, orc) {
    if (!dragEnabled || !orc.podeReagendar) return;
    e.preventDefault();
    e.stopPropagation();

    arrastandoRef.current = orc;
    setArrastando(orc);
    setDiaSobre(diaSobCursor(e.clientX, e.clientY));

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  }

  useEffect(() => {
    if (!arrastando) return undefined;

    function onMove(e) {
      setDiaSobre(diaSobCursor(e.clientX, e.clientY));
    }

    function onUp(e) {
      const dia = diaSobCursor(e.clientX, e.clientY);
      const orc = arrastandoRef.current;
      if (dia && orc) soltarNoDia(dia, orc);

      arrastandoRef.current = null;
      setArrastando(null);
      setDiaSobre(null);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [arrastando, dragEnabled, mesAtual]);

  return (
    <Spin spinning={loading}>
      <div
        ref={calendarioRef}
        style={{
          userSelect: arrastando ? "none" : undefined,
        }}
      >
        {dragEnabled && (
          <p style={{ color: "#64748b", marginBottom: 12 }}>
            Segure na barra <HolderOutlined style={{ margin: "0 4px" }} />{" "}
            <strong>Arrastar</strong> e solte em outro dia. Funciona com Agendado e
            Aguard. Cliente.
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Button icon={<LeftOutlined />} onClick={() => mudarMes(-1)} />
          <h2 style={{ margin: 0, textTransform: "capitalize" }}>
            {mesAtual.format("MMMM YYYY")}
          </h2>
          <Button icon={<RightOutlined />} onClick={() => mudarMes(1)} />
        </div>

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

        {!loading && totalNoMes === 0 && (
          <Empty
            style={{ margin: "24px 0" }}
            description={`Nenhum orçamento em ${mesAtual.format("MMMM [de] YYYY")}. Use as setas para ver outros meses.`}
          />
        )}

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
              data-calendario-dia={dia ?? undefined}
              style={{
                minHeight: 168,
                border:
                  dragEnabled && dia && diaSobre === dia
                    ? "2px solid #1677ff"
                    : dragEnabled && dia
                      ? "2px dashed #cbd5e1"
                      : "1px solid #eee",
                borderRadius: 10,
                padding: 8,
                background:
                  dragEnabled && dia && diaSobre === dia
                    ? "#e6f4ff"
                    : dragEnabled && dia
                      ? "#f8fafc"
                      : "#fafafa",
                transition: "background 0.15s, border 0.15s",
              }}
            >
              {dia && (
                <>
                  <div style={{ fontWeight: "bold", marginBottom: 5 }}>{dia}</div>

                  {getOrcamentosDoDia(dia).map((orc) => {
                    const sendoArrastado = arrastando?.id === orc.id;
                    return (
                      <div key={orc.id} style={{ marginBottom: 6 }}>
                        <Card
                          size="small"
                          hoverable={!arrastando}
                          style={{
                            cursor: "pointer",
                            opacity: sendoArrastado ? 0.45 : 1,
                            border:
                              orc.status === "AguardandoCliente"
                                ? "1px solid #fbbf24"
                                : undefined,
                            background:
                              orc.status === "AguardandoCliente" ? "#fffbeb" : undefined,
                            boxShadow: sendoArrastado
                              ? "0 8px 24px rgba(22,119,255,0.25)"
                              : undefined,
                          }}
                          onClick={() => {
                            if (!arrastando) setOrcamentoSelecionado(orc);
                          }}
                        >
                          {dragEnabled && orc.podeReagendar && (
                            <div
                              role="button"
                              tabIndex={0}
                              aria-label="Arrastar para reagendar"
                              onPointerDown={(e) => iniciarArraste(e, orc)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                marginBottom: 8,
                                padding: "6px 8px",
                                borderRadius: 6,
                                background: "#f1f5f9",
                                color: "#475569",
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: "grab",
                                userSelect: "none",
                                touchAction: "none",
                              }}
                            >
                              <HolderOutlined style={{ fontSize: 14 }} />
                              Arrastar
                            </div>
                          )}
                          <div style={{ userSelect: "none" }}>
                            <strong>{orc.cliente}</strong>
                          </div>
                          <div style={{ userSelect: "none" }}>
                            Orçamento #{orc.numero}
                          </div>
                          {orc.status && statusTag(orc.status)}
                          <Tag color={corServico(orc.servico)}>{orc.servico}</Tag>
                          <PrevisaoClima
                            cidade={orc.cidade}
                            data={orc.data}
                            compact
                          />
                        </Card>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          ))}
        </div>

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
              {orcamentoSelecionado.status && (
                <p>
                  <b>Status:</b> {statusTag(orcamentoSelecionado.status)}
                </p>
              )}
              <p>
                <b>Data:</b>{" "}
                {parseDataOrcamento(orcamentoSelecionado.data).format("DD/MM/YYYY")}
              </p>
              {orcamentoSelecionado.cidade && (
                <p>
                  <b>Cidade:</b> {orcamentoSelecionado.cidade}
                </p>
              )}
              <PrevisaoClima
                cidade={orcamentoSelecionado.cidade}
                data={orcamentoSelecionado.data}
              />
            </>
          )}
        </Modal>
      </div>
    </Spin>
  );
}
