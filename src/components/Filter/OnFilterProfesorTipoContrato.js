import { Fragment, useCallback, useEffect, useState } from "react";
import { Table, Space, Collapse } from "antd";
import "antd/dist/antd.less";
import { profesorService } from "../../services/profesor";

const { Panel } = Collapse;

const OnFilterProfesorTipoContrato = (props) => {
  const [profesorInfo, setProfesorInfo] = useState([]);

  const columns = [
    {
      title: "Nómina",
      dataIndex: "nomina",
      id: "nomina",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      id: "nombre",
    },
    {
      title: "Correo",
      dataIndex: "correo_institucional",
      id: "correo_institucional",
    },
    {
      title: "Tipo de Contrato",
      dataIndex: "tipo",
      id: "tipo",
    },
    {
      title: "Unidades de Carga Máximas",
      dataIndex: "unidades_de_carga_max",
      id: "unidades_de_carga_max",
    },
  ];

  const traducirMySQLAFRONT = {
    planta: "Planta",
    plantaInterna: "Planta interna",
    lecture: "Lecture",
    catedra: "Cátedra",
    pensionado: "Pensionado",
    m40: "M40",
    director: "Director",
    investigador: "Investigador",
    otroCampus: "Otro Campus",
  };

  const dataFetchProfesoresHandler = useCallback(async () => {
    try {
      //Obtiene ids de los profesores
      const profesoresId = (
        await profesorService.getProfesorIdByTipoContrato(props.chosenContrato)
      ).map((row) => {
        return row.id;
      });

      //Obtiene los registros de los profesores segun los ids indicados
      const profesorRows = await Promise.all(
        profesoresId.map(async (key) => {
          return await profesorService.getProfesorById(key);
        })
      );

      let loadedProfesores = [];
      for (const key in profesorRows) {
        let rows = { ...profesorRows[key][0] };
        rows.id = rows.id.toString();
        rows.unidades_de_carga_max = rows.unidades_de_carga_max.toString();
        rows.tipo = traducirMySQLAFRONT[rows.tipo];
        loadedProfesores.push(rows);
      }

      props.onChange(loadedProfesores);
      setProfesorInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, [props.chosenContrato]);

  useEffect(() => {
    dataFetchProfesoresHandler();
  }, [dataFetchProfesoresHandler]);

  return (
    <Fragment>
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "right" }}
      ></Space>
      {profesorInfo.length > 0 ? (
        <Table dataSource={profesorInfo} columns={columns} rowKey="id" />
      ) : (
        <h3 style={{ color: "red" }}>
          Ningun profesor cumple con el criterio escogido
        </h3>
      )}
    </Fragment>
  );
};

export default OnFilterProfesorTipoContrato;
