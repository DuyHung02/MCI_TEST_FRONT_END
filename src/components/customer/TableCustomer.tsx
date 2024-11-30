import { Table } from 'antd';
import { ICustomColumnType } from '@/types';
import { ICustomerTable, ICustomerTableComponent } from '@/types/customer';
import React from 'react';

const TableCustomer: React.FC<ICustomerTableComponent> = ({
  isLoading,
  data,
  onRowClick,
}) => {
  const initialColumns: ICustomColumnType<ICustomerTable> = [
    {
      title: '#',
      dataIndex: 'index',
      render: (_: any, __: ICustomerTable, index: number) => index + 1,
      width: 50,
    },
    {
      title: 'Mã KH',
      dataIndex: 'customer_code',
      width: 100,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
      width: 150,
    },
    {
      title: 'SĐT',
      dataIndex: 'phone_number',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 150,
    },
    {
      title: 'Người tiếp thị',
      dataIndex: 'sales_person',
      width: 150,
    },
    {
      title: 'Nguồn',
      dataIndex: 'source',
      width: 100,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      width: 100,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      width: 100,
    },
  ];
  return (
    <div>
      <Table
        scroll={{ y: 350 }}
        loading={isLoading}
        columns={initialColumns}
        dataSource={data}
        onRow={record => ({
          onClick: () => onRowClick(record.id || 0),
        })}
      />
    </div>
  );
};

export default TableCustomer;
