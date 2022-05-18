import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button, Table, Space, Switch } from "antd";
import { filterService } from "../../services/filter";
import OnFilterProfesorTipoContrato from "./OnFilterProfesorTipoContrato";

export default function ContratoFilter() {
  const [chosenContratos, setChosenContratos] = useState("");
  // const [contratoInfo, setContratoInfo] = useState([]);
  const [visualizador, setVisualizador] = useState(false);

  const searchInput = useRef("");

  // const dataFetchContratosHandler = useCallback(async () => {
  //   try {
  //     const data = await materiaService.getAllMaterias();
  //     const loadedProfesores = [];

  //     for (const key in data) {
  //       loadedProfesores.push({ ...data[key] });
  //     }
  //     setContratoInfo(loadedProfesores);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const contratoInfo = [
    { id: 1, key: 1, tipo: "Planta" },
    { id: 2, key: 2, tipo: "Planta interna" },
    { id: 3, key: 3, tipo: "Lecture" },
    { id: 4, key: 4, tipo: "Cátedra" },
    { id: 5, key: 5, tipo: "Pensionado" },
    { id: 6, key: 6, tipo: "M40" },
    { id: 7, key: 7, tipo: "Director" },
    { id: 8, key: 8, tipo: "Investigador" },
    { id: 9, key: 9, tipo: "Otro Campus" },
  ];

  const traducirFrontAMySQL = {
    Planta: "planta",
    "Planta interna": "plantaInterna",
    Lecture: "lecture",
    Cátedra: "catedra",
    Pensionado: "pensionado",
    M40: "m40",
    Director: "director",
    Investigador: "investigador",
    "Otro Campus": "otroCampus",
  };

  const mapContratos = () => {
    console.log(chosenContratos);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenContratos(traducirFrontAMySQL[selectedRows[0].tipo]);
    },
  };

  const columns = [
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      width: "20%",
      ...filterService.getColumnSearchProps("tipo", searchInput),
    },
  ];

  // useEffect(() => {
  //   dataFetchContratosHandler();
  // }, [dataFetchContratosHandler]);

  function onChange() {
    setVisualizador(!visualizador);
  }

  return (
    <Fragment>
      <Space
        direction="vertical"
        style={{ marginTop: "50px", justifyContent: "center" }}
      >
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          dataSource={contratoInfo}
          columns={columns}
          rowKey="id"
          style={{ width: "100%", justifyContent: "center" }}
        />
        <span>
          Visualizar cambios
          <Switch
            checkedChildren="Si"
            unCheckedChildren="No"
            onChange={onChange}
            style={{ marginLeft: "5px" }}
          />
        </span>
        <div>
          {visualizador ? (
            <OnFilterProfesorTipoContrato chosenContratos={chosenContratos} />
          ) : null}
        </div>
        <Button onClick={mapContratos}>Generar reporte</Button>
      </Space>
    </Fragment>
  );
}
