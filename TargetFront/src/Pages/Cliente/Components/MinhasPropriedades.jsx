import { Card, Button, Spin, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import ModalCadastroArea from "../Components/Modal/ModalCadastroArea";
import PropriedadeCardCover from "../../../Components/Propriedade/PropriedadeCardCover";
import { getPropriedades } from "../../../services/cliente.service";

export default function MinhasPropriedades({ onUpdated }) {
  const [modal, setModal] = useState({ open: false, mode: "create", propriedade: null });
  const [propriedades, setPropriedades] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPropriedades();
      setPropriedades(data);
    } catch (error) {
      message.error(
        error.response?.data?.mensagem || "Erro ao carregar propriedades.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function abrirCriar() {
    setModal({ open: true, mode: "create", propriedade: null });
  }

  function abrirDetalhes(prop) {
    setModal({ open: true, mode: "view", propriedade: prop });
  }

  function fecharModal() {
    setModal({ open: false, mode: "create", propriedade: null });
  }

  function handleSalvo() {
    carregar();
    onUpdated?.();
  }

  return (
    <>
      <Spin spinning={loading}>
        <Card title="Minhas Propriedades">
          <div
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 10,
            }}
          >
            {propriedades.map((prop) => (
              <Card
                key={prop.id}
                hoverable
                style={{
                  minWidth: 260,
                  maxWidth: 260,
                  flexShrink: 0,
                }}
                cover={<PropriedadeCardCover img={prop.img} />}
              >
                <h3 style={{ marginTop: 0 }}>{prop.nome}</h3>
                <p>{prop.cidade}</p>
                <p>Área: {prop.area} ha</p>
                {prop.cultura && <p>Cultura: {prop.cultura}</p>}
                <Button type="primary" onClick={() => abrirDetalhes(prop)}>
                  Ver detalhes
                </Button>
              </Card>
            ))}

            <Card
              hoverable
              onClick={abrirCriar}
              style={{
                minWidth: 260,
                maxWidth: 260,
                flexShrink: 0,
                borderStyle: "dashed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div>
                <PlusOutlined style={{ fontSize: 36 }} />
                <p style={{ marginTop: 10 }}>Adicionar propriedade</p>
              </div>
            </Card>
          </div>
        </Card>
      </Spin>

      <ModalCadastroArea
        open={modal.open}
        onClose={fecharModal}
        onSaved={handleSalvo}
        mode={modal.mode}
        propriedade={modal.propriedade}
      />
    </>
  );
}
