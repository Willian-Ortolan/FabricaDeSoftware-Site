// components/TabelaPadrao.jsx
import { Table } from "antd";

export default function GridPadrao({
  columns = [],
  data = [],
  loading = false,
  rowKey = "id",
  pageSize = 10,
  showSizeChanger = true,
  scroll,
  expandable,
}) {
  const scrollConfig = scroll ?? { x: "max-content" };

  return (
    <div className="grid-table-wrap">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        loading={loading}
        scroll={scrollConfig}
        expandable={expandable}
        pagination={{
          pageSize,
          showSizeChanger,
          showTotal: (total) => `${total} registro(s)`,
        }}
        bordered
        size="middle"
        style={{
          borderRadius: 12,
        }}
      />
    </div>
  );
}
