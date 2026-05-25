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
  footer = null,
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

        {footer !== null ? (
          footer
        ) : (
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
        )}
      </div>
    </Modal>
  );
}
