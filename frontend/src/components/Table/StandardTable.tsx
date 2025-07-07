import React from 'react';
import { Table, Space } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { ActionButton } from './tableActions';

interface StandardTableProps<T = Record<string, unknown>> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  actionButtons?: (record: T) => ActionButton[];
  rowKey?: string;
  pagination?: TablePaginationConfig | false;
}

const StandardTable = <T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  dataSource,
  loading = false,
  actionButtons,
  rowKey = 'id',
  pagination,
}: StandardTableProps<T>) => {
  const columnsWithActions: ColumnsType<T> = [
    ...columns,
    ...(actionButtons
      ? [
          {
            title: 'Ações',
            key: 'actions',
            width: 120,
            render: (_: unknown, record: T) => {
              const buttons = actionButtons(record);
              return (
                <Space size="small">
                  {buttons.map((button) => (
                    <React.Fragment key={button.key}>
                      {button.element}
                    </React.Fragment>
                  ))}
                </Space>
              );
            },
          },
        ]
      : []),
  ];

  const defaultPagination = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} de ${total} itens`,
  };

  return (
    <Table
      columns={columnsWithActions}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination !== false ? { ...defaultPagination, ...pagination } : false}
      scroll={{ x: 'max-content' }}
      size="middle"
    />
  );
};

export default StandardTable;
