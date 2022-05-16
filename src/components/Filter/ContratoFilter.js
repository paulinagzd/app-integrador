import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button,  Table, Space } from "antd";
import { especialidadService } from "../../services/especialidad";
import { filterService } from "../../services/filter";

export default function ContratoFilter() {
  const [chosenContratos, setChosenContratos] = useState([]);
  const [contratoInfo, setContratoInfo] = useState([]);

  const searchInput = useRef("");
  const dataFetchContratosHandler = useCallback(async () => {
    try {
      const data = await especialidadService.getAllEspecialidades(); //ESPERAR A ENDPOINTS PARA CONTRATOS
      const loadedMaterias = [];

      for (const key in data) {
        loadedMaterias.push({ ...data[key] });
      }
      setContratoInfo(loadedMaterias);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const mapContratos = () => {
    chosenContratos.forEach((e) => console.log(e, "map contratos"));
    console.log(chosenContratos);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenContratos(selectedRows.map((sr) => sr.nombre));
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
    dataFetchContratosHandler();
  }, [dataFetchContratosHandler]);
  
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
          dataSource={contratoInfo}
          columns={columns}
          rowKey="id"
          style={{ width: "100%", justifyContent: "center" }}
        />
        <Button onClick={mapContratos}>Generar reporte</Button>
      </Space>
    </Fragment>
  );
}
