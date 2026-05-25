import { FileOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

const BOX_WIDTH = 280;
const BOX_HEIGHT = 180;

export default function PropriedadeFotoBox({
  previewUrl,
  disabled = false,
  onFileSelect,
}) {
  const temImagem = !!previewUrl;

  if (disabled && !temImagem) {
    return (
      <div style={boxStyle}>
        <FileOutlined style={{ fontSize: 40, color: "#94a3b8" }} />
        <span style={{ color: "#64748b", fontSize: 14 }}>Sem arquivo</span>
      </div>
    );
  }

  if (disabled && temImagem) {
    return (
      <div style={boxStyle}>
        <img
          src={previewUrl}
          alt="Foto da propriedade"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </div>
    );
  }

  return (
    <Upload
      accept="image/jpeg,image/png,image/webp"
      showUploadList={false}
      beforeUpload={(file) => {
        onFileSelect?.(file);
        return false;
      }}
    >
      <div style={{ ...boxStyle, cursor: "pointer" }}>
        {temImagem ? (
          <img
            src={previewUrl}
            alt="Foto da propriedade"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        ) : (
          <>
            <FileOutlined style={{ fontSize: 40, color: "#94a3b8" }} />
            <span style={{ color: "#64748b", fontSize: 14 }}>Sem arquivo</span>
            <span style={{ color: "#2563eb", fontSize: 13, marginTop: 4 }}>
              <PlusOutlined /> Clique para enviar foto
            </span>
          </>
        )}
      </div>
    </Upload>
  );
}

const boxStyle = {
  width: BOX_WIDTH,
  height: BOX_HEIGHT,
  border: "1px dashed #cbd5e1",
  borderRadius: 10,
  background: "#f8fafc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  overflow: "hidden",
  flexShrink: 0,
};
