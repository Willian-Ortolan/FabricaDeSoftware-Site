import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { useEffect, useState } from "react";
import ModalPadrao from "../../../../Components/ModalPadrao/ModalPadrao";
import PropriedadeFotoBox from "../../../../Components/Propriedade/PropriedadeFotoBox";
import {
  buildPropriedadeFormData,
  criarPropriedade,
  atualizarPropriedade,
} from "../../../../services/cliente.service";
import { resolveImagemUrl } from "../../../../utils/imagem";
import {
  LIMITES,
  propsInputArea,
  regraAreaPositiva,
  regrasTexto,
  regrasTextoOpcional,
  validarImagem,
} from "../../../../utils/validacao";

/**
 * @param {"create" | "view"} mode
 * @param {object|null} propriedade - dados para visualizar/editar
 */
export default function ModalCadastroArea({
  open,
  onClose,
  onSaved,
  mode = "create",
  propriedade = null,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(mode === "create");
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const isCreate = mode === "create";
  const somenteLeitura = !isCreate && !editando;

  useEffect(() => {
    if (!open) return;

    setEditando(isCreate);
    setArquivoImagem(null);

    if (isCreate) {
      form.resetFields();
      setPreviewUrl(null);
      return;
    }

    if (propriedade) {
      form.setFieldsValue({
        nome: propriedade.nome,
        cidade: propriedade.cidade,
        area: propriedade.area,
        cultura: propriedade.cultura,
        observacoes: propriedade.observacoes,
      });
      setPreviewUrl(resolveImagemUrl(propriedade.img));
    }
  }, [open, mode, propriedade, form, isCreate]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileSelect(file) {
    try {
      validarImagem(file);
    } catch (error) {
      message.error(error.message);
      return;
    }
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setArquivoImagem(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleClose() {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setArquivoImagem(null);
    setPreviewUrl(null);
    setEditando(isCreate);
    form.resetFields();
    onClose();
  }

  function handleCancelarEdicao() {
    handleClose();
  }

  async function salvar() {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const formData = buildPropriedadeFormData(values, arquivoImagem);

      if (isCreate) {
        await criarPropriedade(formData);
        message.success("Propriedade cadastrada com sucesso!");
      } else {
        await atualizarPropriedade(propriedade.id, formData);
        message.success("Propriedade atualizada com sucesso!");
      }

      handleClose();
      onSaved?.();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(
        error.response?.data?.mensagem ||
          (isCreate
            ? "Erro ao cadastrar propriedade."
            : "Erro ao atualizar propriedade."),
      );
    } finally {
      setLoading(false);
    }
  }

  const titulo = isCreate
    ? "Nova Propriedade"
    : editando
      ? "Editar Propriedade"
      : "Detalhes da Propriedade";

  const footer = somenteLeitura ? (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button type="primary" onClick={() => setEditando(true)}>
        Editar
      </Button>
    </div>
  ) : (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
      <Button onClick={isCreate ? handleClose : handleCancelarEdicao}>
        Cancelar
      </Button>
      <Button type="primary" onClick={salvar} loading={loading}>
        {isCreate ? "Cadastrar" : "Salvar"}
      </Button>
    </div>
  );

  return (
    <ModalPadrao
      open={open}
      onClose={handleClose}
      title={titulo}
      footer={footer}
      width={640}
    >
      <Form layout="vertical" form={form} disabled={somenteLeitura}>
        <Form.Item label="Foto da propriedade">
          <PropriedadeFotoBox
            previewUrl={previewUrl}
            disabled={somenteLeitura}
            onFileSelect={handleFileSelect}
          />
        </Form.Item>

        <Form.Item
          label="Nome da Propriedade"
          name="nome"
          rules={regrasTexto("Nome da propriedade", LIMITES.NOME)}
        >
          <Input placeholder="Ex: Fazenda Primavera" maxLength={LIMITES.NOME} />
        </Form.Item>

        <Form.Item
          label="Cidade"
          name="cidade"
          rules={regrasTexto("Cidade", LIMITES.CIDADE)}
        >
          <Input maxLength={LIMITES.CIDADE} />
        </Form.Item>

        <Form.Item
          label="Área (hectares)"
          name="area"
          rules={[regraAreaPositiva("Área")]}
        >
          <InputNumber style={{ width: "100%" }} {...propsInputArea} placeholder="Ex: 1200" />
        </Form.Item>

        <Form.Item label="Tipo de Cultura" name="cultura">
          <Select
            allowClear
            placeholder="Selecione"
            options={[
              { value: "soja", label: "Soja" },
              { value: "milho", label: "Milho" },
              { value: "cafe", label: "Café" },
              { value: "cana", label: "Cana" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Observações" name="observacoes" rules={regrasTextoOpcional()}>
          <Input.TextArea rows={3} maxLength={LIMITES.OBSERVACAO} showCount />
        </Form.Item>
      </Form>
    </ModalPadrao>
  );
}
