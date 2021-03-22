import React from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addDivision, updateDivision, removeDivisions, Selectors, DivisionFormData } from '../../store/slices/DivisionSlice';
import ModalDivision from './ModalDivision';
import EnhancedTable from '../../components/DataTable';

const Divisions: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingDivision, setEditingDivision] = React.useState<DivisionFormData>();

  const dispatch = useAppDispatch();

  const divisionsData = useAppSelector(Selectors.divisions);

  const divisionsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' }
  ]

  const onNew = () => {
    setModalOpen(true);
  }

  const handleSave = (data: DivisionFormData) => {
    if (data.id) {
      dispatch(
        updateDivision(data)
      );
    } else {
      const lastId = divisionsData[divisionsData.length - 1] ? +divisionsData[divisionsData.length - 1].id + 1 : 1;
      data.id = lastId.toString();
  
      dispatch(
        addDivision({
          ...data
        })
      );
    }

    setModalOpen(!modalOpen);
    setEditingDivision({} as DivisionFormData);
  }

  const onEdit = (payload: string[]) => {
    const divisionId = payload[payload.length - 1];
    const divisionToEdit = divisionsData.find(division => division.id === divisionId);

    setEditingDivision(divisionToEdit);
    setModalOpen(true);
  }

  const onDelete =(payload: string[]) => {
    if (window.confirm('Are you sure?')) {
      dispatch(
        removeDivisions(payload)
      )
    }
  }

  return (
    <>
      <ModalDivision
        modalOpen={modalOpen}
        editingDivision={editingDivision}
        onSave={handleSave}
        onClose={() => setModalOpen(!modalOpen)}
      />
      <EnhancedTable
        title="Divisões"
        headers={divisionsHeaders}
        data={divisionsData}
        onNew={onNew}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default Divisions;