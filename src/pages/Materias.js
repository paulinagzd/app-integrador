import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Table,  Space } from "antd";
import "antd/dist/antd.less";
import { PlusOutlined } from "@ant-design/icons";
import { materiaService } from "../services/materia";
import ModalPage from "../components/ModalPage/ModalPage";
import { subjectTypes } from "../constants/subject";
import { openSection } from "../helpers/utility";

//Puede ser modularizada

const typeToLabel = (type) => {
  switch(type) {
    case 'bloque':
      return 'Bloque';
    case 'materia':
      return 'Materia';
    default:
      return 'Semana Tec';
  }
}

const planToLabel = (plan) => {
  switch(plan) {
    case 'Tec20':
      return 'Tec 20';
    default:
      return 'Tec 21';
  }
}

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
          <ModalPage
            type={'materia'}
            action={'edit'}
            payload={materiaInfo[index]}
          />
          <ModalPage
            type={'materia'}
            action={'detail'}
            payload={materiaInfo[index]}
          />
            {/* onClick={openSection.bind(this, materiaInfo[index].id, "detalle")} */}
        </>
      ),
    },
  ];

  const dataFetchMateriasHandler = useCallback(async () => {
    try {
      const data = await materiaService.getAllMaterias();
      const loadedMaterias = [];

      for (const key in data) {
        data[key].tipo = typeToLabel(data[key].tipo);
        data[key].plan = planToLabel(data[key].plan);
        loadedMaterias.push({...data[key]});
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
        <ModalPage
          type={'materia'}
          action={'add'}
        />
      </Space>
      { materiaInfo.length >= 1 &&
        <Table dataSource={materiaInfo} columns={columns} rowKey="id" />
      }
    </Fragment>
  );
};

export default Materias;
