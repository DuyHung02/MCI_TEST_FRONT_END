import React from 'react';
import styles from '@/components/customer/customer.module.css';
import { Table } from 'antd';
import { ICustomColumnType } from '@/types';
import { IComment } from '@/types/customer';

const CareCustomer: React.FC = () => {
  const initialColumns: ICustomColumnType<IComment> = [
    {
      title: 'Lần',
      dataIndex: 'index',
      render: (_: any, __: IComment, index: number) => index + 1,
      width: 50,
      align: 'center',
    },
    {
      title: 'Ngày',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: 'Kết quả chăm sóc',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: 'Cập nhật trạng thái',
      dataIndex: 'status_id',
      align: 'center',
    },
  ];
  return (
    <div>
      <div className={styles.customTitle}>Thông tin liên hệ</div>
      <Table columns={initialColumns} />
    </div>
  );
};

export default CareCustomer;
