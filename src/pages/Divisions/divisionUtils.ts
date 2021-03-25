import { DivisionFormData } from '../../store/slices/DivisionSlice';

export const createDivisionModel = ({
  id = '',
  name = ''
} = {}): DivisionFormData => ({
  id,
  name
});