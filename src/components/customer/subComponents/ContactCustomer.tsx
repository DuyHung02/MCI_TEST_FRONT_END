import React, { useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import styles from '@/components/customer/customer.module.css';
import { IContactCustomerComponent, ICreateCustomer } from '@/types/customer';
import { FORMAT_HOUR_MINUTE } from '@/constants/constant';
import { MOCK_DATA_CITY, MOCK_DATA_DISTRICT, MOCK_DATA_WARD } from '@/mocks';
import { PlusOutlined } from '@ant-design/icons';

const ContactCustomer: React.FC<IContactCustomerComponent> = ({
  listSocials,
  listServices,
  onCreateService,
  onCreateSocial,
}) => {
  const [titleService, setTitleService] = useState<string>('');
  const [titleSocial, setTitleSocial] = useState<string>('');
  const { RangePicker } = DatePicker;

  const handleCreateService = () => {
    onCreateService(titleService);
    setTitleService('');
  };

  const handleCreateSocial = () => {
    onCreateSocial(titleSocial);
    setTitleSocial('');
  };
  return (
    <div>
      <div className={styles.customTitle}>Thông tin liên hệ</div>
      <Row
        gutter={{ xs: 15, sm: 30, md: 38, lg: 50 }}
        className={styles.customFormItem}
      >
        <Col span={8}>
          <Form.Item<ICreateCustomer>
            name="phone_number"
            label={<div className="custom-required">Số điện thoại</div>}
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { max: 15, message: 'Nhập tối đa 15 chữ số' },
            ]}
          >
            <Input
              className={styles.customInput}
              placeholder="nhập số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item<ICreateCustomer>
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'Email không hợp lệ',
              },
            ]}
          >
            <Input className={styles.customInput} placeholder="nhập email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
            <Col span={10}>
              <Form.Item<ICreateCustomer>
                name="social_media"
                label={<div className="custom-required">Mạng xã hội</div>}
                rules={[{ required: true, message: 'Vui lòng chọn' }]}
              >
                <Select
                  options={listSocials}
                  placeholder="-- chọn --"
                  dropdownRender={menu => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 0 4px' }}>
                        <Input
                          placeholder="nhập dữ liệu"
                          size="small"
                          value={titleSocial}
                          onChange={e => setTitleSocial(e.target.value)}
                          onKeyDown={e => e.stopPropagation()}
                        />
                        <Button
                          type="text"
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={handleCreateSocial}
                          style={{ fontSize: 12 }}
                        >
                          Thêm
                        </Button>
                      </Space>
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item<ICreateCustomer> name="detailed_info" label="&nbsp;">
                <Input className={styles.customInput} placeholder="url..." />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className={styles.customTitle}>Thông tin chi tiết</div>
      <Row
        gutter={{ xs: 15, sm: 30, md: 38, lg: 50 }}
        className={styles.customFormItem}
      >
        <Col span={8}>
          <Form.Item<ICreateCustomer>
            name="service"
            label={<div className="custom-required">Sản phẩm quan tâm</div>}
            rules={[{ required: true, message: 'Vui lòng chọn' }]}
          >
            <Select
              mode="multiple"
              options={listServices}
              placeholder="-- chọn --"
              dropdownRender={menu => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 0 4px' }}>
                    <Input
                      placeholder="nhập dữ liệu"
                      size="small"
                      value={titleService}
                      onChange={e => setTitleService(e.target.value)}
                      onKeyDown={e => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={handleCreateService}
                      style={{ fontSize: 12 }}
                    >
                      Thêm
                    </Button>
                  </Space>
                </>
              )}
            />
          </Form.Item>
          <Form.Item<ICreateCustomer> name="notes" label="Ghi chú">
            <Input.TextArea
              className={styles.customInput}
              placeholder="Aa..."
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item<ICreateCustomer> name="city" label="Địa chỉ liên hệ">
            <Select options={MOCK_DATA_CITY} placeholder="Thành phố" />
          </Form.Item>
          <Form.Item<ICreateCustomer> name="district">
            <Select options={MOCK_DATA_DISTRICT} placeholder="Huyện" />
          </Form.Item>
          <Form.Item<ICreateCustomer> name="ward">
            <Select options={MOCK_DATA_WARD} placeholder="Phường" />
          </Form.Item>
          <Form.Item<ICreateCustomer> name="address">
            <Input className={styles.customInput} placeholder="Địa chỉ" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item<ICreateCustomer>
            name="follow"
            label={<div className="custom-required">Chọn khung giờ</div>}
            rules={[{ required: true, message: 'Vui lòng chọn' }]}
          >
            <RangePicker
              format={FORMAT_HOUR_MINUTE}
              picker="time"
              className={styles.customInput}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default ContactCustomer;
