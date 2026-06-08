import { Button, Space, Tag, message, Popconfirm, Spin } from "antd";
import {
  PlusOutlined,
  KeyOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import GridPadrao from "../../../../Components/GridPadrao/GridPadrao";
import {
  getUsuarios,
  ativarUsuario,
  desativarUsuario,
} from "../../../../services/admin.service";
import ModalCadastroUsuario from "./ModalCadastroUsuario";
import ModalAlterarSenha from "./ModalAlterarSenha";

const perfilTag = (perfil) => {
  if (perfil === "AdminEmpresa" || perfil === "AdminSystem") {
    return <Tag color="blue">Administrador</Tag>;
  }
  return <Tag color="green">Cliente</Tag>;
};

export default function GridUsuarios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalSenha, setModalSenha] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const lista = await getUsuarios();
      setData(lista);
    } catch (err) {
      message.error(
        err.response?.data?.mensagem || "Erro ao carregar usuários",
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const handleAtivar = async (record) => {
    try {
      await ativarUsuario(record.id);
      message.success("Usuário ativado");
      carregar();
    } catch (err) {
      message.error(err.response?.data?.mensagem || "Erro ao ativar usuário");
    }
  };

  const handleDesativar = async (record) => {
    try {
      await desativarUsuario(record.id);
      message.success("Usuário desativado");
      carregar();
    } catch (err) {
      message.error(err.response?.data?.mensagem || "Erro ao desativar usuário");
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Perfil",
      dataIndex: "perfil",
      key: "perfil",
      render: (perfil) => perfilTag(perfil),
      filters: [{ text: "Cliente", value: "Cliente" }],
      onFilter: (value, record) => record.perfil === value,
    },
    {
      title: "Status",
      dataIndex: "ativo",
      key: "ativo",
      render: (ativo) =>
        ativo ? (
          <Tag color="success">Ativo</Tag>
        ) : (
          <Tag color="error">Inativo</Tag>
        ),
      filters: [
        { text: "Ativo", value: true },
        { text: "Inativo", value: false },
      ],
      onFilter: (value, record) => record.ativo === value,
    },
    {
      title: "Cadastro",
      dataIndex: "dataCriacao",
      key: "dataCriacao",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space wrap>
          <Button
            icon={<KeyOutlined />}
            onClick={() => setModalSenha(record)}
          >
            Senha
          </Button>

          {record.ativo ? (
            <Popconfirm
              title="Desativar este usuário?"
              description="Ele não poderá mais fazer login."
              onConfirm={() => handleDesativar(record)}
              okText="Desativar"
              cancelText="Cancelar"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<StopOutlined />}>
                Desativar
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Ativar este usuário?"
              onConfirm={() => handleAtivar(record)}
              okText="Ativar"
              cancelText="Cancelar"
            >
              <Button type="primary" icon={<CheckCircleOutlined />}>
                Ativar
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalCadastro(true)}
        >
          Novo cliente
        </Button>
      </div>

      <GridPadrao columns={columns} data={data} rowKey="id" />

      <ModalCadastroUsuario
        open={modalCadastro}
        onClose={() => setModalCadastro(false)}
        onSaved={carregar}
      />

      <ModalAlterarSenha
        open={!!modalSenha}
        onClose={() => setModalSenha(null)}
        usuario={modalSenha}
        onSaved={carregar}
      />
    </Spin>
  );
}
