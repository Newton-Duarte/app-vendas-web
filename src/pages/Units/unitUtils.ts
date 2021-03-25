import { UnitFormData } from '../../store/slices/UnitSlice';

export const createUnitModel = ({
  id = '',
  name = '',
  abbreviation = '',
  quantity = 1
} = {}): UnitFormData => ({
  id,
  name,
  abbreviation,
  quantity
});