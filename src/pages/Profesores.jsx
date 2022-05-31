import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import { Tag, Table, Space, Empty, Row } from "antd";
import "antd/dist/antd.less";
import ModalPage from "../components/ModalPage/ModalPage";
import { filterService } from "../services/filter";
import { useProfesoresController } from "./hooks";
import { PageProvider } from "./providers";

const Profesores = () => {
  const {
    searchInput,
    colorSelection,
    profesorInfo,
    rowSelection,
    onDeleteOk,
  } = useProfesoresController();

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
            type={"profesor"}
            action={"edit"}
            payload={profesorInfo[index]}
            index={index}
          />
          <ModalPage
            type={"profesor"}
            action={"detail"}
            payload={profesorInfo[index]}
            index={index}
          />
          {/* onClick={openSection.bind(this, profesorInfo[index].id, "editar")} */}
        </>
      ),
    },
  ];

  return (
    <PageProvider>
      <>
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "right" }}
      >
        <ModalPage
          type={"profesor"}
          action={"add"}
          onDeleteOk={onDeleteOk}
        />
      </Space>
      {
        profesorInfo.length > 0
          ? ( <Table  rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }} dataSource={profesorInfo} columns={columns} rowKey="id" /> ) 
          : (
            <Empty
              description={"Actualmente no hay información. Utilice el botón de agregar en la parte superior derecha."}
            />
          )
        }
    </>
    </PageProvider>
  );
};

export default Profesores;
