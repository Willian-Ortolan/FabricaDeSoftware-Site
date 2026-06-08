import { Button, Space, Tag, message, Popconfirm, Spin } from "antd";
import {
  PlusOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  StopOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import GridPadrao from "../../Components/GridPadrao/GridPadrao";
import { exibirCnpj, exibirTelefone } from "../../utils/validacao";
import {
  listEmpresas,
  ativarEmpresa,
  desativarEmpresa,
  listAdminsEmpresa,
} from "../../services/superAdmin.service";
import ModalCadastroEmpresa from "./ModalCadastroEmpresa";
import ModalCriarAdmin from "./ModalCriarAdmin";
import ModalResetSenha from "./ModalResetSenha";

export default function GridEmpresas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalEmpresa, setModalEmpresa] = useState(false);
  const [modalAdmin, setModalAdmin] = useState(null);
  const [modalSenha, setModalSenha] = useState(null);
  const [adminsPorEmpresa, setAdminsPorEmpresa] = useState({});

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const lista = await listEmpresas();
      setData(lista);
    } catch (err) {
      message.error(
        err.response?.data?.mensagem || "Erro ao carregar empresas",
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const carregarAdmins = async (empresaId) => {
    try {
      const admins = await listAdminsEmpresa(empresaId);
      setAdminsPorEmpresa((prev) => ({ ...prev, [empresaId]: admins }));
      return admins;
    } catch {
      return [];
    }
  };

  const handleAtivar = async (record) => {
    try {
      await ativarEmpresa(record.id);
      message.success("Empresa ativada");
      carregar();
    } catch (err) {
      message.error(err.response?.data?.mensagem || "Erro ao ativar empresa");
    }
  };

  const handleDesativar = async (record) => {
    try {
      await desativarEmpresa(record.id);
      message.success("Empresa desativada");
      carregar();
    } catch (err) {
      message.error(err.response?.data?.mensagem || "Erro ao desativar empresa");
    }
  };

  const abrirAdmins = async (record) => {
    const admins = await carregarAdmins(record.id);
    if ((admins?.length ?? record.qtdAdmins ?? 0) >= 2) {
      message.warning("Esta empresa já possui o máximo de 2 administradores.");
      return;
    }
    setModalAdmin(record);
  };

  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
      render: (_, record) => exibirCnpj(record.cnpj ?? record.Cnpj),
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
      render: (_, record) =>
        exibirTelefone(record.telefone ?? record.Telefone),
    },
    { title: "Slug", dataIndex: "slug", key: "slug" },
    {
      title: "Status",
      dataIndex: "ativo",
      key: "ativo",
      render: (ativo) =>
        ativo ? (
          <Tag color="success">Ativa</Tag>
        ) : (
          <Tag color="error">Inativa</Tag>
        ),
    },
    {
      title: "Admins",
      key: "admins",
      render: (_, record) => (
        <span>{record.qtdAdmins ?? adminsPorEmpresa[record.id]?.length ?? "—"}</span>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space wrap>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => abrirAdmins(record)}
          >
            Admin
          </Button>
          <Button
            icon={<KeyOutlined />}
            onClick={async () => {
              const admins =
                adminsPorEmpresa[record.id] ?? (await carregarAdmins(record.id));
              if (!admins?.length) {
                message.info("Nenhum administrador encontrado para esta empresa.");
                return;
              }
              setModalSenha(admins[0]);
            }}
          >
            Senha
          </Button>
          {record.ativo ? (
            <Popconfirm
              title="Desativar esta empresa?"
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
              title="Ativar esta empresa?"
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
          onClick={() => setModalEmpresa(true)}
        >
          Nova empresa
        </Button>
      </div>

      <GridPadrao columns={columns} data={data} rowKey="id" />

      <ModalCadastroEmpresa
        open={modalEmpresa}
        onClose={() => setModalEmpresa(false)}
        onSaved={carregar}
      />

      <ModalCriarAdmin
        open={!!modalAdmin}
        onClose={() => setModalAdmin(null)}
        onSaved={carregar}
        empresa={modalAdmin}
      />

      <ModalResetSenha
        open={!!modalSenha}
        onClose={() => setModalSenha(null)}
        usuario={modalSenha}
      />
    </Spin>
  );
}
