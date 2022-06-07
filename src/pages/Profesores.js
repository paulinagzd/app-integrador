import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import { Tag, Table, Space} from "antd";
import "antd/dist/antd.less";
import { profesorService } from "../services/profesor";
import ModalPage from "../components/ModalPage/ModalPage";
import { filterService } from "../services/filter";
import { openSection } from "../helpers/utility";
import { useNavigate } from "react-router-dom";
import { authenticationServices } from "../services/authentication";

const colorSelection = (color) => {
  color = color.toLowerCase();
  switch (color) {
    case "activo":
      return "green";
    case "stand-by":
      return "green";
    case "en contratación":
      return "green";
    default:
      return "red";
  }
};

const Profesores = () => {
  const [chosenProfesores, setChosenProfesores] = useState([]);
  const [profesorInfo, setProfesorInfo] = useState([]);
  const searchInput = useRef("");

  const columns = [
    {
      title: "Nómina",
      dataIndex: "nomina",
      ...filterService.getColumnSearchProps("nomina", searchInput),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      ...filterService.getColumnSearchProps("nombre", searchInput),
    },
    {
      title: "Correo",
      dataIndex: "correo_institucional",
      ...filterService.getColumnSearchProps("correo_institucional", searchInput),
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
      ...filterService.getColumnSearchProps("estatus_interno", searchInput),
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
      const loadedProfesores = [];

      for (const key in data) {
        loadedProfesores.push({...data[key]});
      }
      setProfesorInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onDeleteOk = () => {
    chosenProfesores.forEach((e) => console.log(e, "map classes"));
    console.log(chosenProfesores);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenProfesores(selectedRows.map((sr) => sr.nomina));
    },
  };
  const nav = useNavigate();

  useEffect(() => {
    dataFetchProfesoresHandler();
  }, [dataFetchProfesoresHandler]);

  useEffect(() => {
    if(!authenticationServices.currentUserValue){
      nav("/login");
    }
  }, [authenticationServices.currentUserValue]); 
  
  return (
      <Fragment>
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "right" }}
      >
        <ModalPage
          type={'profesor'}
          action={'add'}
          onDeleteOk={onDeleteOk}
        />
      </Space>
      {
        profesorInfo.length > 0
          ? ( <Table  rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }} dataSource={profesorInfo} columns={columns} rowKey="id" /> ) 
          : undefined
      }
     
    </Fragment>
  );
};

export default Profesores;
