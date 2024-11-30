import { Button, Divider, Form, Modal, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import { ICreateCustomer, IPopupCreateCustomer } from '@/types/customer';
import styles from './customer.module.css';
import { CloseOutlined } from '@ant-design/icons';
import InfoCustomer from '@/components/customer/subComponents/InfoCustomer';
import ContactCustomer from '@/components/customer/subComponents/ContactCustomer';
import CareCustomer from '@/components/customer/subComponents/CareCustomer';
import { FORMAT_DATE_DASH, FORMAT_DATE_IOS_8601 } from '@/constants/constant';
import dayjs from 'dayjs';

const PopupCreateCustomer: React.FC<IPopupCreateCustomer> = ({
  isShow,
  detailCustomer,
  listSources,
  listStatus,
  listSocials,
  listServices,
  onCreateSource,
  onCreateStatus,
  onCreateService,
  onCreateSocial,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<ICreateCustomer>();
  const infoCustomerRef = useRef<{ resetGender: () => void }>(null);
  const handleSubmit = (dataCreate: ICreateCustomer) => {
    const newDataCreate = { ...dataCreate };
    if (dataCreate.follow) {
      const followUpDate = dataCreate.follow[0]
        ? dayjs(dataCreate.follow[0]).format(FORMAT_DATE_IOS_8601)
        : '';
      const followDownDate = dataCreate.follow[1]
        ? dayjs(dataCreate.follow[1]).format(FORMAT_DATE_IOS_8601)
        : '';
      newDataCreate.follow_up_date = followUpDate;
      newDataCreate.follow_down_date = followDownDate;
    }
    newDataCreate.date_of_birth = dayjs(newDataCreate.date_of_birth).format(
      FORMAT_DATE_DASH,
    );
    if (!dataCreate.comments) {
      newDataCreate.comments = [];
    }
    onSubmit(newDataCreate);
    form.resetFields();
    infoCustomerRef.current?.resetGender();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (detailCustomer) {
      form.setFieldsValue({
        full_name: detailCustomer.full_name,
        gender: detailCustomer.gender,
        phone_number: detailCustomer.phone_number,
        email: detailCustomer.email,
        source: detailCustomer.source?.id,
        status: detailCustomer.status?.id,
        social_media: detailCustomer.social_media?.id,
        detailed_info: '',
        service: detailCustomer.service?.map(item => item.id || 0),
        notes: detailCustomer.notes,
        date_of_birth: dayjs(detailCustomer.date_of_birth),
      });
    }
  }, [detailCustomer, form]);
  return (
    <Modal
      width={1100}
      open={isShow}
      onCancel={handleCancel}
      className={styles.customModal}
      closable={false}
      footer={null}
      title={
        <div className={styles.customHeader}>
          <p>Tạo khách hàng</p>
          <CloseOutlined onClick={handleCancel} />
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className={styles.containerContent}>
          <InfoCustomer
            ref={infoCustomerRef}
            listSources={listSources}
            listStatus={listStatus}
            dataGender={detailCustomer.gender}
            onCreateSource={onCreateSource}
            onCreateStatus={onCreateStatus}
          />
          <Divider />
          <ContactCustomer
            listSocials={listSocials}
            listServices={listServices}
            onCreateService={onCreateService}
            onCreateSocial={onCreateSocial}
          />
          <Divider />
          <CareCustomer />
        </div>
        <div className={styles.customFooter}>
          <Button
            type="text"
            htmlType="button"
            onClick={handleCancel}
            className={`${styles.btnCancel} mr-10`}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" className="w-100">
            Xác nhận
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PopupCreateCustomer;
