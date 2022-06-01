import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.less";
import { materiaService } from "../services/materia";
import ModalPage from "../components/ModalPage/ModalPage";
import { filterService } from "../services/filter";
import { subjectTypes } from "../constants/subject";
import { openSection } from "../helpers/utility";


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
  const [chosenMaterias, setChosenMaterias] = useState([]);
  const [materiaInfo, setMateriaInfo] = useState([]);
  const searchInput = useRef("");

  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      ...filterService.getColumnSearchProps("codigo", searchInput),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      ...filterService.getColumnSearchProps("nombre", searchInput),
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      ...filterService.getColumnSearchProps("tipo", searchInput),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      ...filterService.getColumnSearchProps("plan", searchInput),
    },
    {
      title: "Operación",
      dataIndex: "operacion",
      render: (text, record, index) => (
        <>
          <ModalPage
            type={"materia"}
            action={"edit"}
            payload={materiaInfo[index]}
          />
          <ModalPage
            type={"materia"}
            action={"detail"}
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
        loadedMaterias.push({ ...data[key] });
      }
      setMateriaInfo(loadedMaterias);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onDeleteOk = () => {
    chosenMaterias.forEach((e) => console.log(e, "map classes"));
    console.log(chosenMaterias);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenMaterias(selectedRows.map((sr) => sr.codigo));
    },
  };

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
          type={"materia"}
          action={"add"}
          chosenMaterias={chosenMaterias}
          onDeleteOk={onDeleteOk}
        />
      </Space>
      {materiaInfo.length >= 1 && (
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={materiaInfo}
          columns={columns}
          rowKey="id"
        />
      )}
    </Fragment>
  );
};

export default Materias;
