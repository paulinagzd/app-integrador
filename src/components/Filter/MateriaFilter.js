import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button, Table, Space, Switch } from "antd";
import { materiaService } from "../../services/materia";
import { filterService } from "../../services/filter";
import OnFilterProfesor from "./OnFilterProfesor";

export default function MateriaFilter() {
  const [chosenMaterias, setChosenMaterias] = useState("");
  const [materiaInfo, setMateriaInfo] = useState([]);
  const [visualizador, setVisualizador] = useState(false);

  const searchInput = useRef("");

  const dataFetchMateriasHandler = useCallback(async () => {
    try {
      const data = await materiaService.getAllMaterias();
      const loadedProfesores = [];

      for (const key in data) {
        loadedProfesores.push({ ...data[key] });
      }
      setMateriaInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const mapMaterias = () => {
    console.log(chosenMaterias);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenMaterias(selectedRows[0].id);
    },
  };

  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      width: "30%",
      ...filterService.getColumnSearchProps("codigo", searchInput),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: "20%",
      ...filterService.getColumnSearchProps("nombre", searchInput),
    },
  ];

  useEffect(() => {
    dataFetchMateriasHandler();
  }, [dataFetchMateriasHandler]);

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
          dataSource={materiaInfo}
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
        <div>{visualizador ? <OnFilterProfesor  chosenMaterias = {chosenMaterias}/> : null}</div>
        <Button onClick={mapMaterias}>Generar reporte</Button>
      </Space>
    </Fragment>
  );
}
