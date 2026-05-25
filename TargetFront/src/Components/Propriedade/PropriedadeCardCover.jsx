import { FileOutlined } from "@ant-design/icons";
import { resolveImagemUrl } from "../../utils/imagem";

const COVER_HEIGHT = 160;

export default function PropriedadeCardCover({ img }) {
  const url = resolveImagemUrl(img);

  if (!url) {
    return (
      <div
        style={{
          height: COVER_HEIGHT,
          background: "#f1f5f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          color: "#64748b",
        }}
      >
        <FileOutlined style={{ fontSize: 32 }} />
        <span style={{ fontSize: 13 }}>Sem arquivo</span>
      </div>
    );
  }

  return (
    <img
      alt="Propriedade"
      src={url}
      style={{
        height: COVER_HEIGHT,
        width: "100%",
        objectFit: "cover",
      }}
    />
  );
}
