// components/TabelaPadrao.jsx
import { Table } from "antd";

export default function GridPadrao({
  columns = [],
  data = [],
  loading = false,
  rowKey = "id",
  pageSize = 10,
}) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      loading={loading}
      pagination={{
        pageSize: pageSize,
        showSizeChanger: true,
      }}
      bordered
      size="middle"
      style={{
        borderRadius: 12,
      }}
    />
  );
}
