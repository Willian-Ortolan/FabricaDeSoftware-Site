import { Modal, Button } from "antd";

export default function ModalPadrao({
  open,
  onClose,
  onConfirm,
  title,
  children,
  width = 600,
  confirmText = "Salvar",
  cancelText = "Cancelar",
  loading = false,
}) {
  return (
    <Modal
      open={open}
      title={title}
      width={width}
      onCancel={onClose}
      footer={null}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Conteúdo */}
        <div>{children}</div>

        {/* Footer padrão */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <Button onClick={onClose}>{cancelText}</Button>

          <Button type="primary" onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
