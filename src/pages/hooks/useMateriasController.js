/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { materiaService } from '../../services/materia';
import { createService } from '../../services/create';

export const useMateriasController = () => {
  const [chosenMaterias, setChosenMaterias] = useState([]);
  const [materiaInfo, setMateriaInfo] = useState([]);

  const typeToLabel = (type) => {
    switch (type) {
      case 'bloque':
        return 'Bloque';
      case 'materia':
        return 'Materia';
      default:
        return 'Semana Tec';
    }
  };

  const planToLabel = (plan) => {
    switch (plan) {
      case 'Tec20':
        return 'Tec 20';
      default:
        return 'Tec 21';
    }
  };

  const dataFetchMateriasHandler = useCallback(async () => {
    try {
      const data = await materiaService.getAllMaterias();
      const loadedMaterias = [];

      for (const key in data) {
        data[key].tipo = typeToLabel(data[key].tipo);
        data[key].plan = planToLabel(data[key].plan);
        loadedMaterias.push({ ...data[key] });
      }
      setMateriaInfo(loadedMaterias);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dataFetchMateriasHandler();
    console.log('uso Efecto');
  }, [dataFetchMateriasHandler]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenMaterias(selectedRows.map((sr) => sr.codigo));
    },
  };

  const createMateria = async (data) => {
    try {
      await materiaService.createMateria(data);
      dataFetchMateriasHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const editMateria = async (data, selected, index) => {
    console.log('caigo onEdit', selected);
    try {
      const response = await materiaService.editMateria(data, selected.codigo);
      console.log('editMateriaResponse', response);
      const temp = [...materiaInfo];
      temp[index] = selected;
      setMateriaInfo(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateM = (values, selected, action, index) => {
    console.log('caigo onCreate', values, action);
    delete values.maestrias_aceptadas;

    if (action === 'add') {
      createService.createMaterias(values);
    }

    if (action === 'edit') {
      editMateria(values, selected, index);
    }

    // setVisibleModal(false);
  };

  const onDeleteOk = () => {
    chosenMaterias.forEach((e) => console.log(e, 'map classes'));
    console.log(chosenMaterias);
  };

  return {
    typeToLabel,
    planToLabel,
    materiaInfo,
    rowSelection,
    dataFetchMateriasHandler,
    onCreateM,
  };
};
