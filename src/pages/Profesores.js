import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Tag, Table, Space} from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import { profesorService } from "../services/profesor";
import ModalPage from "../components/ModalPage/ModalPage";
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
      dataIndex: "correo_institucional",
    },
    {
      title: "Estatus",
      dataIndex: "estatus_interno",
      render: (estatus, index) => {
        return (
        <>
          <Tag color={colorSelection(estatus)} key={index}>
            {estatus.toUpperCase()}
          </Tag>
        </>
      )},
    },
    {
      title: "Operación",
      dataIndex: "operacion",
      render: (text, record, index) => (
        <>
          <ModalPage
            type={'profesor'}
            action={'edit'}
            payload={profesorInfo[index]}
          />
          <ModalPage
            type={'profesor'}
            action={'detail'}
            payload={profesorInfo[index]}
          />
          {/* onClick={openSection.bind(this, profesorInfo[index].id, "editar")} */}
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
        loadedProfesores.push({...data[key]});
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
        <ModalPage
          type={'profesor'}
          action={'add'}
        />
      </Space>
      {
        profesorInfo.length > 0
          ? ( <Table dataSource={profesorInfo} columns={columns} rowKey="id" /> ) 
          : undefined
      }
     
    </Fragment>
  );
};

export default Profesores;
