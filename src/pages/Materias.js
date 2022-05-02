import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Table,  Space } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import { materiaService } from "../services/materia";
import { openSection } from "../helpers/utility";

//Puede ser modularizada

const Materias = () => {
  const [materiaInfo, setMateriaInfo] = useState([]);
  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
    },
    {
      title: "Plan",
      dataIndex: "plan",
    },
    {
      title: "Operación",
      dataIndex: "operacion",
      render: (text, record, index) => (
        <>
          <Button
            style={{ color: "#eb2f96", borderColor: "white" }}
            onClick={openSection.bind(this, materiaInfo[index].id, "editar")}
          >
            {"Editar"}
          </Button>
          <Button
            style={{ color: "gray", borderColor: "white" }}
            onClick={openSection.bind(this, materiaInfo[index].id, "detalle")}
          >
            {"Detalle"}
          </Button>
        </>
      ),
    },
  ];

  const dataFetchMateriasHandler = useCallback(async () => {
    try {
      const data = await materiaService.getAllMaterias();
      console.log(data);
      const loadedMaterias = [];

      for (const key in data) {
        loadedMaterias.push({
          id: data[key].id,
          codigo: data[key].codigo,
          nombre: data[key].nombre,
          tipo: data[key].tipo,
          plan: data[key].plan,
        });
      }
      setMateriaInfo(loadedMaterias);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dataFetchMateriasHandler();
  }, [dataFetchMateriasHandler]);

  return (
    <Fragment>
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "right" }}
      >
        <Button
          size="small"
          shape="round"
          style={{
            color: "#eb2f96",
            borderColor: "white",
            marginBottom: "10px",
          }}
          icon={<PlusOutlined />}
        >
          Agregar materia
        </Button>
      </Space>
      <Table dataSource={materiaInfo} columns={columns} rowKey="id" />
    </Fragment>
  );
};

export default Materias;
