import { ISelectBox } from '@/types';
import { DatePicker, GetProps } from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export type ICustomerTable = {
  id?: number;
  customer_code?: string;
  full_name?: string;
  phone_number?: string;
  email?: string;
  sales_person?: number;
  source?: string;
  notes?: string;
  created_at?: string;
};

export type ICreateCustomer = {
  status?: number;
  source?: number;
  social_media?: number;
  service?: number[];
  full_name?: string;
  gender?: string;
  date_of_birth?: string;
  phone_number?: string;
  follow_up_date?: string;
  follow_down_date?: string;
  follow?: RangePickerProps['value'];
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  detailed_info?: string;
  notes?: string;
  comments?: IComment[];
  email?: string;
};

export type IComment = {
  title?: string;
  time?: string;
  status_id?: number;
};

export type ICustomerResponse = {
  id?: number;
  status?: IStatus;
  source?: ISource;
  social_media?: ISocialMedia;
  comment?: [];
  service?: IService[];
  service_request?: [];
  medicine?: [];
  customer_code?: string;
  status_service?: number;
  status_treatment?: number;
  full_name?: string;
  gender?: IGender;
  date_of_birth?: string;
  phone_number?: string;
  email?: string;
  follow_up_date?: string;
  follow_down_date?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  notes?: string;
  diagnosis?: number;
  treatment?: number;
  appointment_time?: number;
  actual_arrival_time?: number;
  created_at?: string;
  updated_at?: string;
  sales_person?: number;
  doctor_performed?: number;
  user?: number;
};

export type IShortAttribute = {
  id?: number;
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  user?: number;
};

export type IStatus = IShortAttribute;

export type ISocialMedia = IShortAttribute;

export type IMasterData = IShortAttribute;

export type IService = IShortAttribute;

export type ISource = IShortAttribute & {
  description?: string;
};

export type IUser = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
};

export type ICustomerTableComponent = {
  data: ICustomerTable[];
  isLoading: boolean;
  onRowClick: (id: number) => void;
};

export type IPopupCreateCustomer = {
  isShow: boolean;
  detailCustomer: ICustomerResponse;
  listSources: ISelectBox[];
  listStatus: ISelectBox[];
  listSocials: ISelectBox[];
  listServices: ISelectBox[];
  onCreateSource: (payload: string) => void;
  onCreateStatus: (payload: string) => void;
  onCreateService: (payload: string) => void;
  onCreateSocial: (payload: string) => void;
  onSubmit: (payload: ICreateCustomer) => void;
  onCancel: () => void;
};

export type IInfoCustomerComponent = {
  listSources: ISelectBox[];
  listStatus: ISelectBox[];
  dataGender?: IGender | undefined;
  onCreateSource: (payload: string) => void;
  onCreateStatus: (payload: string) => void;
};

export type IContactCustomerComponent = {
  listSocials: ISelectBox[];
  listServices: ISelectBox[];
  onCreateService: (payload: string) => void;
  onCreateSocial: (payload: string) => void;
};

export const GenderType = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác',
} as const;

export type IGender = (typeof GenderType)[keyof typeof GenderType];
