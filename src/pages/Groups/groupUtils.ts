import { GroupFormData } from '../../store/slices/GroupSlice';

export const createGroupModel = ({
  id = '',
  name = ''
} = {}): GroupFormData => ({
  id,
  name
});