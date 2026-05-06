import { Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import ModalPadrao from "../../../../Components/ModalPadrao/ModalPadrao";

export default function ModalPropriedade({ open, setOpen }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  async function salvar() {
    try {
      const values = await form.validateFields();

      setLoading(true);

      console.log("Propriedade:", values);

      setTimeout(() => {
        setLoading(false);
        form.resetFields();
        setOpen(false);
      }, 800);
    } catch (error) {}
  }

  return (
    <ModalPadrao
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={salvar}
      title="Nova Propriedade"
      confirmText="Cadastrar"
      loading={loading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nome da Propriedade"
          name="nome"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: Fazenda Primavera" />
        </Form.Item>

        <Form.Item label="Cidade" name="cidade" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Área (hectares)"
          name="area"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Ex: 1200" />
        </Form.Item>

        <Form.Item label="Tipo de Cultura" name="cultura">
          <Select
            options={[
              { value: "soja", label: "Soja" },
              { value: "milho", label: "Milho" },
              { value: "cafe", label: "Café" },
              { value: "cana", label: "Cana" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Observações" name="observacoes">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
