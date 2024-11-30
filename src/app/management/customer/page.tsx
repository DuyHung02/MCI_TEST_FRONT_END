'use client';

import styles from './page.module.css';
import { FilterOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input } from 'antd';
import TableCustomer from '@/components/customer/TableCustomer';
import { useEffect, useState } from 'react';
import {
  ICreateCustomer,
  ICustomerResponse,
  ICustomerTable,
  IService,
  ISocialMedia,
  ISource,
} from '@/types/customer';
import {
  apiCreateCustomer,
  apiCreateServices,
  apiCreateSocial,
  apiCreateSource,
  apiGetCustomers,
  apiGetDetailCustomer,
  apiGetServices,
  apiGetSocials,
  apiGetSources,
  apiGetStatus,
} from '@/services/customer';
import toast from 'react-hot-toast';
import PopupCreateCustomer from '@/components/customer/PopupCreateCustomer';
import { ISelectBox } from '@/types';
import { MOCK_DATA_STATUS } from '@/mocks';

const CustomerPage = () => {
  const [customers, setCustomers] = useState<ICustomerTable[]>([]);
  const [detailCustomer, setDetailCustomer] = useState<ICustomerResponse>({});
  const [listSources, setListSources] = useState<ISelectBox[]>([]);
  const [listStatus, setListStatus] = useState<ISelectBox[]>([]);
  const [listSocials, setListSocials] = useState<ISelectBox[]>([]);
  const [listServices, setListServices] = useState<ISelectBox[]>([]);
  const [isShowCreate, setIsShowCreate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBuildData = (data: ICustomerResponse[]): ICustomerTable[] => {
    return data.map((item: ICustomerResponse) => ({
      id: item.id,
      customer_code: item.customer_code,
      email: item.email,
      full_name: item.full_name,
      phone_number: item.phone_number,
      notes: item.notes,
      source: item.source?.title,
      sales_person: item.sales_person,
      created_at: item.created_at,
    }));
  };

  const handleSubmit = async (dataCreateCustomer: ICreateCustomer) => {
    const { follow, ...payload } = dataCreateCustomer;
    const response = await apiCreateCustomer(payload);
    if (response?.status === 201) {
      const item: ICustomerResponse = response.data;
      setCustomers(prevState => [
        ...prevState,
        {
          id: item.id,
          customer_code: item.customer_code,
          email: item.email,
          full_name: item.full_name,
          phone_number: item.phone_number,
          notes: item.notes,
          source: item.source?.title,
          sales_person: item.sales_person,
          created_at: item.created_at,
        },
      ]);
      setIsShowCreate(false);
    }
  };

  const handleGetDetailCustomer = async (id: number) => {
    const response = await apiGetDetailCustomer(id);
    if (response?.status === 200) {
      console.log('res: ', response);
      setDetailCustomer(response.data);
      setIsShowCreate(true);
    }
  };

  const handleCreateSource = async (payload: string) => {
    const response = await apiCreateSource(payload);
    if (response?.status === 201) {
      const dataSource: ISource = response.data;
      setListSources(prevState => [
        ...prevState,
        {
          value: dataSource.id,
          label: dataSource.title,
        },
      ]);
      toast.success('Tạo thành công', { position: 'top-right' });
    }
  };

  const handleCreateService = async (payload: string) => {
    const response = await apiCreateServices(payload);
    if (response?.status === 201) {
      const dataService: IService = response.data;
      setListServices(prevState => [
        ...prevState,
        {
          value: dataService.id,
          label: dataService.title,
        },
      ]);
      toast.success('Tạo thành công', { position: 'top-right' });
    }
  };

  const handleCreateSocial = async (payload: string) => {
    const response = await apiCreateSocial(payload);
    if (response?.status === 201) {
      const dataSocial: ISocialMedia = response.data;
      setListSocials(prevState => [
        ...prevState,
        {
          value: dataSocial.id,
          label: dataSocial.title,
        },
      ]);
      toast.success('Tạo thành công', { position: 'top-right' });
    }
  };

  const handleCreateStatus = (payload: string) => {
    setListStatus(prevState => [
      ...prevState,
      {
        value: prevState.length + 1,
        label: payload,
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await apiGetCustomers();
      if (response?.status === 200) {
        setCustomers(handleBuildData(response.data.results));
      } else {
        toast.error(response?.data, { position: 'top-right' });
      }
      setIsLoading(false);

      const [resSources, resStatus, resSocials, resServices] =
        await Promise.all([
          apiGetSources(),
          apiGetStatus(),
          apiGetSocials(),
          apiGetServices(),
        ]);

      const handleApiData = (
        response: any,
        setter: Function,
        mockData: any[] = [],
      ) => {
        if (mockData.length > 0) {
          setter(
            mockData.map((item: any) => ({
              value: item.id,
              label: item.title,
            })),
          );
          return;
        }
        if (response?.status === 200) {
          const data = response.data.results;
          setter(
            data.map((item: any) => ({ value: item.id, label: item.title })),
          );
        }
      };

      handleApiData(resSources, setListSources);
      handleApiData(resStatus, setListStatus, MOCK_DATA_STATUS);
      handleApiData(resSocials, setListSocials);
      handleApiData(resServices, setListServices);
    })();
  }, []);
  return (
    <div className="container">
      <div className={styles.header}>
        <div className={styles.title}>
          <UserOutlined className="mr-5" />
          <h3>Quản lý khách hàng</h3>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.customName}>
            <p>Mrs Conan</p>
            <p>Nhân viên kinh doanh</p>
          </div>
          <Avatar
            src="https://i.pinimg.com/736x/44/6b/66/446b66991989742e7658dc261049255c.jpg"
            className={styles.customAvatar}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.customFilter}>
          <Input
            className={styles.customInputSearch}
            placeholder="Tên, SĐT, Email"
          />
          <FilterOutlined />
        </div>
        <div>
          <Button type="primary" onClick={() => setIsShowCreate(true)}>
            Thêm khách hàng
          </Button>
        </div>
      </div>

      <div className={styles.containerTable}>
        <TableCustomer
          isLoading={isLoading}
          data={customers}
          onRowClick={handleGetDetailCustomer}
        />
      </div>

      <PopupCreateCustomer
        isShow={isShowCreate}
        detailCustomer={detailCustomer}
        listSources={listSources}
        listStatus={listStatus}
        listSocials={listSocials}
        listServices={listServices}
        onCreateSource={handleCreateSource}
        onCreateStatus={handleCreateStatus}
        onCreateService={handleCreateService}
        onCreateSocial={handleCreateSocial}
        onSubmit={handleSubmit}
        onCancel={() => setIsShowCreate(false)}
      />
    </div>
  );
};

export default CustomerPage;
