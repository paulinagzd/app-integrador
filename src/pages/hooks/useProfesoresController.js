/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { profesorService } from '../../services/profesor';
import { createService } from '../../services/create';
import { useController } from '../providers/hooks';

export const useProfesoresController = () => {
  const [chosenProfesores, setChosenProfesores] = useState([]);
  const [profesorInfo, setProfesorInfo] = useState([]);
  const searchInput = useRef('');

  const dataFetchProfesoresHandler = useCallback(async () => {
    try {
      const data = await profesorService.getAllProfesores();
      const loadedProfesores = [];

      for (const key in data) {
        data[key].estatus_interno = statusToLabel(data[key].estatus_interno);
        loadedProfesores.push({ ...data[key] });
      }
      setProfesorInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editProfesor = async (data, selected, index) => {
    console.log('onEdit', selected);
    try {
      const response = await profesorService.editProfesor(data, selected.nomina);
      const temp = [...profesorInfo];
      temp[index] = selected;
      setProfesorInfo(temp);
      // onCancelModal('materia');
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateP = (values, selected, action, index) => {
    console.log('onCreate', values, action);
    // delete values["maestrias_aceptadas"];

    if (action === 'add') {
      createService.createProfesor(values);
    }

    if (action === 'edit') {
      editProfesor(values, selected, index);
    }

    // setVisibleModal(false);
  };

  const onDeleteOk = () => {
    chosenProfesores.forEach((e) => console.log(e, 'map classes'));
    console.log(chosenProfesores);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenProfesores(selectedRows.map((sr) => sr.nomina));
    },
  };

  useEffect(() => {
    dataFetchProfesoresHandler();
  }, [dataFetchProfesoresHandler]);

  const colorSelection = (color) => {
    switch (color.toLowerCase()) {
      case 'activo':
        return 'green';
      case 'stand-by':
        return 'green';
      case 'en contratación':
        return 'green';
      default:
        return 'red';
    }
  };

  const statusToLabel = (status) => {
    switch (status) {
      case 'activo':
        return 'Activo';
      case 'inactivo':
        return 'Inactivo';
      case 'enContratacion':
        return 'En contratación';
      case 'stand-by':
        return 'Stand-By';
      default:
        return 'Rechazado';
    }
  };

  return {
    chosenProfesores,
    searchInput,
    colorSelection,
    dataFetchProfesoresHandler,
    profesorInfo,
    rowSelection,
    onDeleteOk,
    onCreateP,
  };
};

// export default useProfesoresController;
