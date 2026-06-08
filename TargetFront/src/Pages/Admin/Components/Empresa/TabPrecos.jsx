import { Button, Form, InputNumber, message, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  getPrecosAdmin,
  updatePrecosAdmin,
} from "../../../../services/empresaAdmin.service";
import { propsInputArea } from "../../../../utils/validacao";

export default function TabPrecos() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getPrecosAdmin();
        form.setFieldsValue({
          mapeamento: data.mapeamento ?? data.Mapeamento,
          pulverizacao: data.pulverizacao ?? data.Pulverizacao,
          solidos: data.solidos ?? data.Solidos,
        });
      } catch (err) {
        message.error(
          err.response?.data?.mensagem || "Erro ao carregar preços",
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [form]);

  const salvar = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await updatePrecosAdmin(values);
      message.success("Preços atualizados");
    } catch (err) {
      if (!err.errorFields) {
        message.error(err.response?.data?.mensagem || "Erro ao salvar preços");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical" onFinish={salvar}>
        <Form.Item
          label="Mapeamento (R$/ha)"
          name="mapeamento"
          rules={[{ required: true, message: "Informe o preço" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} {...propsInputArea} />
        </Form.Item>
        <Form.Item
          label="Pulverização (R$/ha)"
          name="pulverizacao"
          rules={[{ required: true, message: "Informe o preço" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} {...propsInputArea} />
        </Form.Item>
        <Form.Item
          label="Aplicação de sólidos (R$/ha)"
          name="solidos"
          rules={[{ required: true, message: "Informe o preço" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} {...propsInputArea} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={saving}>
          Salvar preços
        </Button>
      </Form>
    </Spin>
  );
}
