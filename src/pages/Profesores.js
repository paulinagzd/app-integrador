import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Tag, Table, Space} from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import { profesorService } from "../services/profesor";
import { openSection } from "../helpers/utility";

const colorSelection = (color) => {
  color = color.toLowerCase();
  switch (color) {
    case "activo":
      return "green";
    case "stand-by":
      return "green";
    default:
      return "red";
  }
};

const Profesores = () => {
  const [profesorInfo, setProfesorInfo] = useState([]);

  const columns = [
    {
      title: "Nómina",
      dataIndex: "nomina",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Correo",
      dataIndex: "correo",
    },
    {
      title: "Estatus",
      dataIndex: "estatus",
      render: (estatus, index) => (
        <>
          <Tag color={colorSelection(estatus)} key={index}>
            {estatus.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Operación",
      dataIndex: "operacion",
      render: (text, record, index) => (
        <>
          <Button
            style={{ color: "#eb2f96", borderColor: "white" }}
            onClick={openSection.bind(this, profesorInfo[index].id, "editar")}
          >
            {"Editar"}
          </Button>
          <Button
            style={{ color: "gray", borderColor: "white" }}
            onClick={openSection.bind(this, profesorInfo[index].id, "detalle")}
          >
            {"Detalle"}
          </Button>
        </>
      ),
    },
  ];
  const dataFetchProfesoresHandler = useCallback(async () => {
    try {
      const data = await profesorService.getAllProfesores();
      console.log(data);
      const loadedProfesores = [];

      for (const key in data) {
        loadedProfesores.push({
          id: data[key].id,
          nomina: data[key].nomina,
          nombre: data[key].nombre,
          correo: data[key].correo_institucional,
          estatus: data[key].estatus_interno,
          //Faltan los otros atributos; ponerlos aqui o en modal?
        });
      }
      setProfesorInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dataFetchProfesoresHandler();
  }, [dataFetchProfesoresHandler]);

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
          Agregar profesor
        </Button>
      </Space>
      <Table dataSource={profesorInfo} columns={columns} rowKey="id" />
    </Fragment>
  );
};

export default Profesores;
