import React from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addUnit, updateUnit, removeUnits, Selectors, UnitFormData } from '../../store/slices/UnitSlice';
import ModalUnit from './ModalUnit';
import EnhancedTable from '../../components/DataTable';

const Units: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingUnit, setEditingUnit] = React.useState<UnitFormData>();

  const dispatch = useAppDispatch();

  const unitsData = useAppSelector(Selectors.units);

  const unitsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' },
    { id: 'abbreviation', numeric: false, disablePadding: false, label: 'Abreviação' },
    { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantidade' }
  ]

  const onNew = () => {
    setModalOpen(true);
  }

  const handleSave = (data: UnitFormData) => {
    if (data.id) {
      dispatch(
        updateUnit(data)
      );
    } else {
      const lastId = unitsData[unitsData.length - 1] ? +unitsData[unitsData.length - 1].id + 1 : 1;
      data.id = lastId.toString();
  
      dispatch(
        addUnit({
          ...data
        })
      );
    }

    setModalOpen(!modalOpen);
    setEditingUnit({} as UnitFormData);
  }

  const onEdit = (payload: string[]) => {
    const unitId = payload[payload.length - 1];
    const unitToEdit = unitsData.find(unit => unit.id === unitId);

    setEditingUnit(unitToEdit);
    setModalOpen(true);
  }

  const onDelete =(payload: string[]) => {
    if (window.confirm('Are you sure?')) {
      dispatch(
        removeUnits(payload)
      )
    }
  }

  return (
    <>
      <ModalUnit
        modalOpen={modalOpen}
        editingUnit={editingUnit}
        onSave={handleSave}
        onClose={() => setModalOpen(!modalOpen)}
      />
      <EnhancedTable
        title="Unidades"
        headers={unitsHeaders}
        data={unitsData}
        onNew={onNew}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default Units;