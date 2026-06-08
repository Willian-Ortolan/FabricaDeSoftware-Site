import { Modal, Form } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import FormularioSolicitacaoOrcamento from "../../../../Components/FormularioSolicitacaoOrcamento";

export default function ModalNovaSolicitacao({ open, onClose, onSave, initialData }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialData) {
      const servicos = (initialData.servicos || []).map((s) => ({
        tipo: s.tipo ?? s.Tipo,
        area: s.area ?? s.Area,
        data: (s.dataExecucao ?? s.DataExecucao ?? s.data ?? s.Data)
          ? dayjs(s.dataExecucao ?? s.DataExecucao ?? s.data ?? s.Data, "DD/MM/YYYY")
          : undefined,
      }));

      form.setFieldsValue({
        fazenda: initialData.propriedade ?? initialData.Propriedade,
        nome: initialData.nomeContato ?? initialData.NomeContato,
        telefone: initialData.telefone ?? initialData.Telefone,
        cidade: initialData.cidade ?? initialData.Cidade,
        servicos: servicos.length > 0 ? servicos : [{}],
      });
    } else if (open) {
      form.resetFields();
      form.setFieldsValue({ servicos: [{}] });
    }
  }, [open, initialData, form]);

  return (
    <Modal
      title={initialData ? "Editar Solicitação" : "Nova Solicitação"}
      open={open}
      onCancel={onClose}
      onOk={() => form.validateFields().then(onSave)}
      okText={initialData ? "Salvar" : "Enviar Pré-Orçamento"}
      width={750}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ servicos: [{}] }}>
        <FormularioSolicitacaoOrcamento />
      </Form>
    </Modal>
  );
}
