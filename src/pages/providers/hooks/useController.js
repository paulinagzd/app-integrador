/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { materiaService } from '../../../services/materia';
import { profesorService } from '../../../services/profesor';
import { especialidadService } from '../../../services/especialidad';
import { gradoService } from '../../../services/grado';

export const useController = () => {
  const [visibleMateriaModal, setVisibleMateriaModal] = useState(false);
  const [visibleProfesorModal, setVisibleProfesorModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [action, setAction] = useState();

  const {
    getMateriaIdByCodigo,
    getMaestriasAceptadas,
    getMateriasImpartidasByProfesor,
  } = materiaService;
  const { getProfesorById } = profesorService;
  const { getEspecialidadByProfesor } = especialidadService;
  const { getGradosByProfesor } = gradoService;

  // useEffect(() => {console.log('selected', selected)})

  const onEditMateria = (payload) => {
    setSelected(payload);
  };

  const parseDefaultObject = (maestrias) => {
    const res = maestrias.map((m) => ({
      label: m.nombre,
      value: m.nombre,
    }));
    console.log('res', res);
    return res;
  };

  const parseEspecialidades = (temas) => {
    const res = temas.map((t) => {
      const nombre = `${t.tema_especialidad.nombre} (${t.nivel})`;
      return {
        label: nombre,
        value: nombre,
      };
    });
    console.log('res ESP', res);
    return res;
  };

  const parseMateriasImpartidas = (materias) => {
    const res = materias.map((t) => {
      const nombre = `${t.materium.nombre} (${t.materium.codigo})`;
      return {
        label: nombre,
        value: nombre,
      };
    });
    console.log('res MAT', res);
    return res;
  };

  const goToMateria = useCallback(async (payload) => {
    console.log('goto', payload);

    const res = await getMateriaIdByCodigo(payload.codigo);
    console.log(res);

    const resM = await getMaestriasAceptadas(payload.id);
    console.log(resM);

    const forRes = parseDefaultObject(resM);
    setSelected({ ...res[0], maestrias: forRes });
    setVisibleMateriaModal(true);
  });

  const goToProfesor = useCallback(async (payload) => {
    console.log('goto', payload);
    const res = await getProfesorById(payload.id);
    console.log(res);

    const temas = await getEspecialidadByProfesor(payload.id);
    const parsedTemas = parseEspecialidades(temas);

    const grados = await getGradosByProfesor(payload.id);
    const parsedGrados = parseDefaultObject(grados);

    const materiasI = await getMateriasImpartidasByProfesor(payload.id);
    const parsedMateriasI = parseMateriasImpartidas(materiasI);

    setSelected({
      ...res[0],
      especialidades: parsedTemas,
      grados: parsedGrados,
      materiasImpartidas: parsedMateriasI,
    });
    setVisibleProfesorModal(true);
  });

  const onSetVisible = (type, payload, a) => {
    setAction(a);
    if (payload) {
      if (type === 'materia') {
        goToMateria(payload);
      } else {
        goToProfesor(payload);
      }
    } else if (type === 'materia') {
      setVisibleMateriaModal(true);
    } else {
      setVisibleProfesorModal(true);
    }
  };

  const onCancelModal = (type) => {
    console.log('aqui', type);
    if (type === 'materia') {
      setVisibleMateriaModal(false);
    } else {
      setVisibleProfesorModal(false);
    }
    setSelected(null);
  };

  return {
    onSetVisible,
    visibleMateriaModal,
    visibleProfesorModal,
    onCancelModal,
    selected,
    action,
  };
};
