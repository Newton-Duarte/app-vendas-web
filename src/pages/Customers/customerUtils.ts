import { CustomerFormData } from '../../store/slices/CustomerSlice';

export const createCustomerModel = ({
  id = '',
  type = 'juridica',
  name = '',
  cpf_cnpj = '',
  rg_ie = '',
  birthdate = '',
  phone = '',
  email = '',
  note = '',
} = {}): CustomerFormData => ({
  id,
  type,
  name,
  cpf_cnpj,
  rg_ie,
  birthdate,
  phone,
  email,
  note
});