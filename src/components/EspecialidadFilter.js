import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button,  Table, Space } from "antd";
import { especialidadService } from "../services/especialidad";
import { filterService } from "../services/filter";

export default function EspecialidadFilter() {
  const [chosenEspecialidades, setChosenEspecialidades] = useState([]);
  const [especialidadInfo, setEspecialidadInfo] = useState([]);

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
    chosenEspecialidades.forEach((e) => console.log(e, "map especialidades"));
    console.log(chosenEspecialidades);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenEspecialidades(selectedRows.map((sr) => sr.nombre));
    },
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "30%",
      ...filterService.getColumnSearchProps("id", searchInput),
    },
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
  
  return (
    <Fragment>
      <Space
        direction="vertical"
        style={{ marginTop: "50px", justifyContent: "center" }}
      >
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={especialidadInfo}
          columns={columns}
          rowKey="id"
          style={{ width: "100%", justifyContent: "center" }}
        />
        <Button onClick={mapEspecialidades}>Generar reporte</Button>
      </Space>
    </Fragment>
  );
}
