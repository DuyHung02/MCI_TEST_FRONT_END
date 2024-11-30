import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import styles from '../customer.module.css';
import {
  GenderType,
  ICreateCustomer,
  IGender,
  IInfoCustomerComponent,
} from '@/types/customer';
import { FORMAT_DATE_SLASH } from '@/constants/constant';
import { PlusOutlined } from '@ant-design/icons';
type InfoCustomerRef = {
  resetGender: () => void;
};
const InfoCustomer = forwardRef<InfoCustomerRef, IInfoCustomerComponent>(
  (
    { listSources, listStatus, onCreateSource, onCreateStatus, dataGender },
    ref,
  ) => {
    const [titleSource, setTitleSource] = useState<string>('');
    const [titleStatus, setTitleStatus] = useState<string>('');
    const [valueGender, setValueGender] = useState<IGender | undefined>(
      undefined,
    );

    useImperativeHandle(ref, () => ({
      resetGender: () => setValueGender(undefined),
    }));

    const handleCreateSource = () => {
      onCreateSource(titleSource);
      setTitleSource('');
    };

    const handleCreateStatus = () => {
      onCreateStatus(titleStatus);
      setTitleStatus('');
    };

    useEffect(() => {
      if (dataGender) {
        setValueGender(dataGender);
      } else {
        setValueGender(undefined);
      }
    }, [dataGender]);

    return (
      <div>
        <Row
          gutter={{ xs: 15, sm: 30, md: 38, lg: 50 }}
          className={styles.customFormItem}
        >
          <Col span={8}>
            <Form.Item<ICreateCustomer>
              name="full_name"
              label={<div className="custom-required">Họ tên khách hàng</div>}
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input className={styles.customInput} placeholder="nhập họ tên" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ICreateCustomer>
              name="gender"
              label="&nbsp;"
              rules={[{ required: true, message: 'Vui lòng chọn' }]}
            >
              <Row>
                <Col span={6}>
                  <span>Giới tính:</span>
                </Col>
                <Col span={18}>
                  <Radio.Group
                    onChange={e => setValueGender(e.target.value)}
                    value={valueGender}
                  >
                    <Radio value={GenderType.MALE}>Nam</Radio>
                    <Radio value={GenderType.FEMALE}>Nữ</Radio>
                    <Radio value={GenderType.OTHER}>Khác</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ICreateCustomer>
              name="date_of_birth"
              label={<div className="custom-required">Ngày sinh</div>}
              rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
            >
              <DatePicker
                className={styles.customInput}
                format={FORMAT_DATE_SLASH}
                placeholder={FORMAT_DATE_SLASH}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Row
              gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}
              className={styles.customFormItem}
            >
              <Col span={12}>
                <Form.Item<ICreateCustomer>
                  name="source"
                  label={
                    <div className="custom-required">Nguồn khách hàng</div>
                  }
                  required
                  rules={[{ required: true, message: 'Vui lòng chọn' }]}
                >
                  <Select
                    options={listSources}
                    placeholder="-- chọn --"
                    dropdownRender={menu => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 0 4px' }}>
                          <Input
                            placeholder="nhập dữ liệu"
                            size="small"
                            value={titleSource}
                            onChange={e => setTitleSource(e.target.value)}
                            onKeyDown={e => e.stopPropagation()}
                          />
                          <Button
                            type="text"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={handleCreateSource}
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
              <Col span={12}>
                <Form.Item<ICreateCustomer>
                  name="status"
                  label={<div className="custom-required">Trạng thái</div>}
                  rules={[{ required: true, message: 'Vui lòng chọn' }]}
                >
                  <Select
                    options={listStatus}
                    placeholder="-- chọn --"
                    dropdownRender={menu => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 0 4px' }}>
                          <Input
                            placeholder="nhập dữ liệu"
                            size="small"
                            value={titleStatus}
                            onChange={e => setTitleStatus(e.target.value)}
                            onKeyDown={e => e.stopPropagation()}
                          />
                          <Button
                            type="text"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={handleCreateStatus}
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
            </Row>
          </Col>
        </Row>
      </div>
    );
  },
);

InfoCustomer.displayName = 'InfoCustomer';
export default InfoCustomer;
