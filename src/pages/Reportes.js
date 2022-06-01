/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Select, Typography, AutoComplete, Button,
} from 'antd';
import 'antd/dist/antd.less';
import MateriaFilter from '../components/Filter/MateriaFilter';
import EspecialidadFilter from '../components/Filter/EspecialidadFilter';
import ContratoFilter from '../components/Filter/ContratoFilter';

const { Title } = Typography;
const { Option } = Select;

const Reportes = () => {
  const [filter, setFilter] = useState();

  // Materia filtro
  //   const [materiaList, setMateriaList] = useState([]);
  //   const [materiaCodigoIdMap, setMateriaCodigoIdMap] = useState("");
  // const [chosenMateria,setChosenMateria] = useState([]);
  // Especialidad filtro

  function handleChange(value) {
    switch (value) {
      case 'materia':
        setFilter(<MateriaFilter />);
        break;
      case 'especialidad':
        setFilter(<EspecialidadFilter />);
        break;
      case 'contrato':
        setFilter(<ContratoFilter />);
        break;
      default:
        setFilter();
    }
  }

  //  const onSelect = (nomina) => {
  //   setChosenMateria(materiaCodigoIdMap[nomina])
  //   console.log(materiaCodigoIdMap[nomina])
  // }

  // const handleMateriaOptions = (childData) =>{
  //   let materiaValues = [];
  //   let materiaCodigoIdMap = {}
  //   for (const key in childData) {
  //     materiaValues.push({ key: childData[key].id, value: childData[key].codigo });
  //     materiaCodigoIdMap[childData[key].codigo] = childData[key].id;
  //   }

  //   setMateriaList(materiaValues);
  //   setMateriaCodigoIdMap(materiaCodigoIdMap);
  // }

  return (
    <>
      <span style={{ marginRight: '5px' }}>
        <Title strong level={5} style={{ color: 'blue' }}>
          Filtra profesor por
          <Select
            style={{ marginLeft: 15, width: '300px' }}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={handleChange}
            placeholder="Seleccionar opción:"
            allowClear
          >
            <Option value="materia">Materia</Option>
            <Option value="especialidad">Tema de Especialidad</Option>
            <Option value="contrato">Tipo de Contrato</Option>
          </Select>
          {/* <AutoComplete
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            placeholder="Seleccionar opción:"
            dropdownMatchSelectWidth={200}
            options={materiaList}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            allowClear
          /> */}
        </Title>
      </span>

      {filter}
    </>
  );
};

export default Reportes;
