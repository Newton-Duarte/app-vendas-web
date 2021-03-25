import { ProductFormData } from '../../store/slices/ProductSlice';

export const createProductModel = ({
  id = '',
  name = '',
  unit = '',
  sale_price = '',
  buy_price = '',
  group = '',
  division = ''
} = {}): ProductFormData => ({
  id,
  name,
  unit,
  sale_price,
  buy_price,
  group,
  division
});