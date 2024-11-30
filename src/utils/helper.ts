import { IMasterData } from '@/types/customer';
import { ISelectBox } from '@/types';

export const convertToSelectBox = (data: IMasterData[]): ISelectBox[] => {
  console.log('data: ', data);
  return data.map(item => {
    return {
      value: item.id,
      label: item.title,
    };
  });
};
