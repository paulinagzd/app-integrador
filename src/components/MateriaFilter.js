import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button, Table, Space } from "antd";
import { materiaService } from "../services/materia";
import { filterService } from "../services/filter";

export default function MateriaFilter() {
  const [chosenMaterias, setChosenMaterias] = useState([]);
  const [materiaInfo, setMateriaInfo] = useState([]);

  const searchInput = useRef("");

  const dataFetchMateriasHandler = useCallback(async () => {
    try {
      const data = await materiaService.getAllMaterias();
      const loadedProfesores = [];

      for (const key in data) {
        loadedProfesores.push({ ...data[key] });
      }
      setMateriaInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const mapMaterias = () => {
    chosenMaterias.forEach((e) => console.log(e, "map classes"));
    console.log(chosenMaterias);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChosenMaterias(selectedRows.map((sr) => sr.codigo));
    },
  };

  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      width: "30%",
      ...filterService.getColumnSearchProps("codigo", searchInput),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: "20%",
      ...filterService.getColumnSearchProps("nombre", searchInput),
    },
  ];

  useEffect(() => {
    dataFetchMateriasHandler();
  }, [dataFetchMateriasHandler]);

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
          dataSource={materiaInfo}
          columns={columns}
          rowKey="id"
          style={{ width: "100%", justifyContent: "center" }}
        />
        <Button onClick={mapMaterias}>Generar reporte</Button>
      </Space>
    </Fragment>
  );
}

// import React, { Fragment, useState, useCallback, useEffect } from "react";
// import { Button, Input, Table, Space, } from "antd";
// import { materiaService } from "../services/materia";

// export default function MateriaFilter() {
//   const [chosenMaterias, setChosenMaterias] = useState([]);
//   const { Search } = Input;
//   const onSearch = (value) => {
//     console.log(value.toUpperCase());
//   };

//   const [materiaInfo, setMateriaInfo] = useState([]);
//   const columns = [
//     {
//       title: "Código",
//       dataIndex: "codigo",
//       filter: [
//         {
//           text: 'TC3048',
//           value: 'TC3048',
//         },
//         {
//           text: 'RS5002',
//           value: 'RS5002',
//         },
//       ],

//     },
//     {
//       title: "Nombre",
//       dataIndex: "nombre",
//       filter: [
//         {
//           text: 'Algoritmos',
//           value: 'Algoritmos',
//         },
//         {
//           text: 'Graficas Computacionales',
//           value: 'Graficas Computacionales',
//         },
//       ],
//     },
//   ];

//   const dataFetchMateriasHandler = useCallback(async () => {
//     try {
//       const data = await materiaService.getAllMaterias();
//       const loadedProfesores = [];

//       for (const key in data) {
//         loadedProfesores.push({ ...data[key] });
//       }
//       setMateriaInfo(loadedProfesores);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   const mapMaterias = () => {
//     chosenMaterias.forEach((e) => console.log(e, "map classes"));
//     console.log([ materiaInfo.map((cm) => {
//       return { text: cm.codigo, value: cm.codigo };
//     }),]);
//   };

//   const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       setChosenMaterias(selectedRows.map((sr) => sr.codigo));
//     },
//     // getCheckboxProps: (record) => ({
//     //   disabled: record.name === "Disabled User",
//     //   name: record.name,
//     // }),
//   };
//   useEffect(() => {
//     dataFetchMateriasHandler();
//   }, [dataFetchMateriasHandler]);

//   return (
//     <Fragment>
//       <Space
//         direction="vertical"
//         style={{ marginTop: "50px", justifyContent: "center" }}
//       >
//         <Search
//           placeholder="Buscar materia..."
//           allowClear
//           onSearch={onSearch}
//           style={{ width: 200 }}
//         />
//         <Table
//           rowSelection={{
//             type: "checkbox",
//             ...rowSelection,
//           }}
//           dataSource={materiaInfo}
//           columns={columns}
//           rowKey="id"
//           style={{ width: "100%", justifyContent: "center" }}
//         />
//         <Button onClick={mapMaterias}>Generar reporte</Button>
//       </Space>
//     </Fragment>
//   );
// }
