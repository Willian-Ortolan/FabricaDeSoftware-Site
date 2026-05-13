import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalCadastroArea from "../Components/Modal/ModalCadastroArea";

export default function MinhasPropriedades() {
  const [open, setOpen] = useState(false);

  const propriedades = [
    {
      nome: "Fazenda Primavera",
      cidade: "Rio Verde",
      area: 1120,
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    },
    {
      nome: "Sítio Boa Esperança",
      cidade: "Uberlândia",
      area: 303,
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    },
    {
      nome: "Fazenda São Jorge",
      cidade: "Rondonópolis",
      area: 540,
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    },
    {
      nome: "Fazenda São Jorge",
      cidade: "Rondonópolis",
      area: 540,
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    },
  ];

  return (
    <>
      <Card title="Minhas Propriedades">
        <div
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            paddingBottom: 10,
          }}
        >
          {propriedades.map((prop, index) => (
            <Card
              key={index}
              hoverable
              style={{
                minWidth: 260,
                maxWidth: 260,
                flexShrink: 0,
              }}
              cover={<img alt="fazenda" src={prop.img} />}
            >
              <h3>{prop.nome}</h3>
              <p>{prop.cidade}</p>
              <p>Área: {prop.area} ha</p>

              <Button type="primary">Ver detalhes</Button>
            </Card>
          ))}

          {/* CARD ADICIONAR */}
          <Card
            hoverable
            onClick={() => setOpen(true)}
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

      <ModalCadastroArea open={open} setOpen={setOpen} />
    </>
  );
}
