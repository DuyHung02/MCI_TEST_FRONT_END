import React from 'react';
import { Rule } from 'antd/lib/form';
import { ColumnType } from 'antd/es/table';

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

export type ICustomColumnType<T> = ColumnType<T>[];

export type ISelectBox = {
  value?: string | number;
  label?: string | React.ReactNode;
};
