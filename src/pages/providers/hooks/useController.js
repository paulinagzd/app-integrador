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
  const [index, setIndex] = useState();
  const [checked, setChecked] = useState(selected && selected.clase_en_ingles ? selected.clase_en_ingles : false);

  const {
    getMateriaIdByCodigo,
    getMaestriasAceptadas,
    getMateriasByProfesor,
  } = materiaService;
  const { getProfesorById } = profesorService;
  const { getEspecialidadByProfesor } = especialidadService;
  const { getGradosByProfesor } = gradoService;

  useEffect(() => { console.log('selected', selected); });

  // eslint-disable-next-line no-unused-vars
  const onEditMateria = (payload) => {
    setSelected(payload);
  };

  const parseDefaultObject = (maestrias) => {
    const res = maestrias.map((m) => ({
      label: m.nombre,
      value: m.nombre,
    }));
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
    return res;
  };

  const parseMaterias = (materias) => {
    const res = materias.map((t) => {
      const nombre = `${t.materium.nombre} (${t.materium.codigo})`;
      return {
        label: nombre,
        value: nombre,
      };
    });
    return res;
  };

  const goToMateria = useCallback(async (payload) => {
    // console.log('goto', payload);

    const res = await getMateriaIdByCodigo(payload.codigo);

    const resM = await getMaestriasAceptadas(payload.id);

    const forRes = parseDefaultObject(resM);
    setSelected({ ...res[0], maestrias: forRes });
    setVisibleMateriaModal(true);
  });

  const goToProfesor = useCallback(async (payload) => {
    // console.log('goto', payload);
    const res = await getProfesorById(payload.id);

    const temas = await getEspecialidadByProfesor(payload.id);
    const parsedTemas = parseEspecialidades(temas);

    const grados = await getGradosByProfesor(payload.id);
    const parsedGrados = parseDefaultObject(grados);

    const materiasI = await getMateriasByProfesor(payload.id, 'materia_impartida');
    const parsedMateriasI = parseMaterias(materiasI);

    const materiasB = await getMateriasByProfesor(payload.id, 'materia_bloqueada');
    const parsedMateriasB = parseMaterias(materiasB);

    setSelected({
      ...res[0],
      especialidades: parsedTemas,
      grados: parsedGrados,
      materiasImpartidas: parsedMateriasI,
      materiasBloqueadas: parsedMateriasB,
    });
    setVisibleProfesorModal(true);
  });

  const onSetVisible = (type, payload, a, i) => {
    setAction(a);
    setIndex(i);
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
    if (selected !== {}) setSelected(null);
  };

  const onCheck = (checkedVal) => {
    // console.log(selected)
    setChecked(checkedVal)
    if (selected !== {}) {
      setSelected({
        ...selected,
        clase_en_ingles: checkedVal,
      });
    }
  };

  return {
    onSetVisible,
    onCancelModal,
    onCheck,
    visibleMateriaModal,
    visibleProfesorModal,
    selected,
    action,
    index,
    checked,
  };
};
