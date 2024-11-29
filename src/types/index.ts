import { Rule } from 'antd/lib/form';

export type ICustomField<T> = {
  field?: keyof T;
  label?: string;
  placeholder?: string;
  value?: string | number;
  rules?: Rule[];
  required?: boolean;
  messageError?: string;
  messageCheckbox?: React.ReactNode;
};
