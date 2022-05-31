import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  Space, Switch, AutoComplete,
} from 'antd';
import { CSVLink } from 'react-csv';
import { filterService } from '../../services/filter';
import OnFilterProfesorTipoContrato from './OnFilterProfesorTipoContrato';

export default function ContratoFilter() {
  const [chosenContrato, setChosenContrato] = useState('');
  const [visualizador, setVisualizador] = useState(true);

  const searchInput = useRef('');

  const contratoInfo = [
    { id: 1, key: 1, tipo: 'Planta' },
    { id: 2, key: 2, tipo: 'Planta interna' },
    { id: 3, key: 3, tipo: 'Lecture' },
    { id: 4, key: 4, tipo: 'Cátedra' },
    { id: 5, key: 5, tipo: 'Pensionado' },
    { id: 6, key: 6, tipo: 'M40' },
    { id: 7, key: 7, tipo: 'Director' },
    { id: 8, key: 8, tipo: 'Investigador' },
    { id: 9, key: 9, tipo: 'Otro Campus' },
  ];

  const traducirFrontAMySQL = {
    Planta: 'planta',
    'Planta interna': 'plantaInterna',
    Lecture: 'lecture',
    Cátedra: 'catedra',
    Pensionado: 'pensionado',
    M40: 'm40',
    Director: 'director',
    Investigador: 'investigador',
    'Otro Campus': 'otroCampus',
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenContrato(traducirFrontAMySQL[selectedRows[0].tipo]);
    },
  };

  const columns = [
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      width: '20%',
      ...filterService.getColumnSearchProps('tipo', searchInput),
    },
  ];

  // useEffect(() => {
  //   dataFetchContratosHandler();
  // }, [dataFetchContratosHandler]);

  function onChange() {
    setVisualizador(!visualizador);
  }

  const [contratoList, setContratoList] = useState('');

  // Search input///////////////////////////////////////////////////////////////
  const displayContratoOptions = () => {
    const contratoValues = [];
    const contratoTipoIdMap = {};
    for (const key in contratoInfo) {
      contratoValues.push({
        key: contratoInfo[key].id,
        value: contratoInfo[key].tipo,
      });
      contratoTipoIdMap[contratoInfo[key].tipo] = contratoInfo[key].id;
    }
    setContratoList(contratoValues);
  };

  const onSelect = (tipo) => {
    setChosenContrato(traducirFrontAMySQL[tipo]);
  };

  useEffect(() => {
    displayContratoOptions();
  }, [chosenContrato]);

  // Formateo y descarga a CSV de los datos filtrados
  const [profesorInfo, setProfesorInfo] = useState([]);

  const headers = [
    { label: 'Nómina', key: 'nomina' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Correo', key: 'correo_institucional' },
    { label: 'Tipo de Contrato', key: 'tipo' },
    { label: 'Unidades de Carga Máximas', key: 'unidades_de_carga_max' },
  ];

  const csvResport = {
    filename: 'reporteProfesoresPorEspecialidad.csv',
    headers,
    data: profesorInfo,
  };

  /// ///////////////////////////////////

  return (
    <Space
      direction="vertical"
      style={{ marginTop: '50px', justifyContent: 'center' }}
    >
      {/* <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          dataSource={contratoInfo}
          columns={columns}
          rowKey="id"
          style={{ width: "100%", justifyContent: "center" }}
        /> */}
      <span>
        Seleccionar tipo de contrato:
        <AutoComplete
          style={{
            marginLeft: '10px',
            marginBottom: '15px',
            width: 200,
          }}
          onSelect={onSelect}
          placeholder="Seleccionar opción:"
          dropdownMatchSelectWidth={200}
          options={contratoList}
          filterOption={
            (inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          allowClear
        />
      </span>
      <span>
        Visualizar cambios
        <Switch
          checkedChildren="Si"
          unCheckedChildren="No"
          onChange={onChange}
          defaultChecked
          style={{ marginLeft: '5px', marginRight: '15px' }}
        />
        <CSVLink
          {...csvResport}
          style={{
            background: 'white',
            border: '1px solid lightblue',
            padding: '4px',
          }}
        >
          Generar reporte
        </CSVLink>
      </span>
      <div>
        {visualizador ? (
          <OnFilterProfesorTipoContrato
            chosenContrato={chosenContrato}
            profesorInfo={profesorInfo}
            onChange={(value) => setProfesorInfo(value)}
          />
        ) : null}
      </div>
    </Space>
  );
}
