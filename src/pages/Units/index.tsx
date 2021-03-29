import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addUnit, updateUnitOnList, removeUnits, Selectors, UnitFormData, Async } from '../../store/slices/UnitSlice';
import ModalUnit from './ModalUnit';
import EnhancedTable from '../../components/DataTable';

const Units: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingUnit, setEditingUnit] = React.useState<UnitFormData>();

  const dispatch = useAppDispatch();

  const unitsData = useAppSelector(Selectors.units);

  useEffect(() => {
    async function loadUnits() {
      const action = Async.fetchUnits();
      dispatch(action);
    }

    loadUnits();
  }, [dispatch]);

  const unitsHeaders = [
    { id: 'number', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' },
    { id: 'abbreviation', numeric: false, disablePadding: false, label: 'Abreviação' },
    { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantidade' }
  ]

  const onNew = () => {
    setModalOpen(true);
  }

  const handleSave = (data: UnitFormData) => {
    if (data.id) {
      const action = Async.updateUnit({
        data,
        onSuccess: (response) => {
          dispatch(Async.fetchUnits())
        },
        onError: (e) => {
          // TODO: Add Toast
          console.log(e);
        }
      });

      dispatch(action);
    } else {
      const action = Async.createUnit({
        data,
        onSuccess: (response) => {
          dispatch(Async.fetchUnits())
        },
        onError: (e) => {
          // TODO: Add Toast
          console.log(e);
        }
      });

      dispatch(action);
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
      const action = Async.deleteUnits({
        units_ids: payload,
        onSuccess: (response) => {
          dispatch(Async.fetchUnits());
        },
        onError: (e) => {
          // TODO: Add Toast
          console.log(e);
        }
      });

      dispatch(action);
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