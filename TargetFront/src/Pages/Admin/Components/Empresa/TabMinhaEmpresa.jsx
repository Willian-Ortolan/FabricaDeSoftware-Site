import { Button, Form, Input, message, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  getEmpresaAdmin,
  updateEmpresaAdmin,
} from "../../../../services/empresaAdmin.service";
import { LIMITES, regrasTexto } from "../../../../utils/validacao";

export default function TabMinhaEmpresa() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getEmpresaAdmin();
        form.setFieldsValue({
          nome: data.nome ?? data.Nome,
          slug: data.slug ?? data.Slug,
          telefone: data.telefone ?? data.Telefone,
          emailContato: data.emailContato ?? data.EmailContato,
          logoUrl: data.logoUrl ?? data.LogoUrl,
          corPrimaria: data.corPrimaria ?? data.CorPrimaria,
          corSecundaria: data.corSecundaria ?? data.CorSecundaria,
        });
      } catch (err) {
        message.error(
          err.response?.data?.mensagem || "Erro ao carregar dados da empresa",
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
      await updateEmpresaAdmin(values);
      message.success("Dados da empresa atualizados");
    } catch (err) {
      if (!err.errorFields) {
        message.error(
          err.response?.data?.mensagem || "Erro ao salvar dados da empresa",
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical" onFinish={salvar}>
        <Form.Item
          label="Nome"
          name="nome"
          rules={regrasTexto("Nome", LIMITES.NOME)}
        >
          <Input maxLength={LIMITES.NOME} />
        </Form.Item>
        <Form.Item label="Slug" name="slug">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Telefone" name="telefone">
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item label="E-mail de contato" name="emailContato">
          <Input maxLength={200} />
        </Form.Item>
        <Form.Item label="URL do logo" name="logoUrl">
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item label="Cor primária" name="corPrimaria">
          <Input placeholder="#1d4ed8" />
        </Form.Item>
        <Form.Item label="Cor secundária" name="corSecundaria">
          <Input placeholder="#0f172a" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={saving}>
          Salvar
        </Button>
      </Form>
    </Spin>
  );
}
