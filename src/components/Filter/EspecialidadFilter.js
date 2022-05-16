import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button,  Table, Space,Switch, } from "antd";
import { especialidadService } from "../../services/especialidad";
import { filterService } from "../../services/filter";
import OnFilterProfesor from "./OnFilterProfesor";

export default function EspecialidadFilter() {
  const [chosenEspecialidades, setChosenEspecialidades] = useState("");
  const [especialidadInfo, setEspecialidadInfo] = useState([]);
  const [visualizador, setVisualizador] = useState(false);

  const searchInput = useRef("");

  const dataFetchEspecialidadesHandler = useCallback(async () => {
    try {
      const data = await especialidadService.getAllEspecialidades();
      const loadedProfesores = [];

      for (const key in data) {
        loadedProfesores.push({ ...data[key] });
      }
      setEspecialidadInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const mapEspecialidades = () => {
    console.log(chosenEspecialidades);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenEspecialidades(selectedRows[0].id);
    },
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: "30%",
      ...filterService.getColumnSearchProps("nombre", searchInput),
    },
  ];

  useEffect(() => {
    dataFetchEspecialidadesHandler();
  }, [dataFetchEspecialidadesHandler]);

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
          dataSource={especialidadInfo}
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
        <div>{visualizador ? <OnFilterProfesor chosenEspecialidades = {chosenEspecialidades}/> : null}</div>
        <Button onClick={mapEspecialidades}>Generar reporte</Button>
      </Space>
    </Fragment>
  );
}
