import { Fragment, useCallback, useEffect, useState } from "react";
import { Table, Space, Collapse} from "antd";
import "antd/dist/antd.less";
import { profesorService } from "../../services/profesor";
import { materiaService } from "../../services/materia";

const { Panel } = Collapse;

const OnFilterProfesor = (props) => {
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
    // {
    //   title: "CIP", grado ACADEMICO
    //   dataIndex: "cip",
    // },
    // {
    //   title: "Prioridad de Materias",
    //   dataIndex: "prioridad_materias",
    // },
    {
      title: "Materias Bloqueadas",
      dataIndex: "materia_bloqueada",
      render: (tags) => (
        <Collapse style={{ border: "white", backgroundColor: "white" }}>
          <Panel
            header="Desplegar materias"
            key="1"
            style={{ border: "white" }}
          >
            {tags.map((materia) => {
              return <p key={materia}>* {materia.toUpperCase()}</p>;
            })}
          </Panel>
        </Collapse>
      ),
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
    {
      title: "Clases en Ingles",
      dataIndex: "clase_en_ingles",
      id: "clase_en_ingles",
    },
    // {
    //   title: "Histórico de ECOAS",
    //   dataIndex: "ecoa",
    // },
  ];

  const dataFetchProfesoresHandler = useCallback(async () => {
    try {
      if (!props.chosenMateria && !props.chosenEspecialidad) {
        return;
      }
      //Obtiene ids de los profesores
      let profesoresId;
      //Materias
      if (props.chosenMateria) {
        profesoresId = (
          await profesorService.getProfesorIdByMateriaId(props.chosenMateria)
        ).map((row) => {
          return row.id_profesor;
        });
      }

      //Especialidades
      if (props.chosenEspecialidad) {
        profesoresId = (
          await profesorService.getProfesorIdByEspecialidadId(
            props.chosenEspecialidad
          )
        ).map((row) => {
          return row.id_profesor;
        });
      }

      console.log(profesoresId, "profesores");
      //Obtiene los registros de los profesores segun los ids indicados
      const profesorRows = await Promise.all(
        profesoresId.map(async (key) => {
          return await profesorService.getProfesorById(key);
        })
      );

      //Obtiene el id de las materias bloqueadas y las guarda segun el id del profesor
      const materiasBloqueadas = {};
      await Promise.all(
        profesoresId.map(async (key, idx) => {
          return (await profesorService.getMateriasBloqueadasById(key)).map(
            (row) => {
              if (!materiasBloqueadas[profesoresId[idx]]) {
                materiasBloqueadas[profesoresId[idx]] = [];
              }

              materiasBloqueadas[profesoresId[idx]].push(row.id_materia);
              return materiasBloqueadas;
            }
          );
        })
      );

      //Obtiene el codigo de las materias bloqueadas y las guarda segun el id del profesor
      var codigoMaterias = {};
      for (const key in materiasBloqueadas) {
        for (const col in materiasBloqueadas[key]) {
          const materia = materiasBloqueadas[key][col];
          if (!codigoMaterias[key]) {
            codigoMaterias[key] = [];
          }
          codigoMaterias[key].push(
            (
              await Promise.all(
                await materiaService.getMateriaCodigoById(materia)
              )
            )[0].codigo
          );
        }
      }

      //Modifica las celdas para incorporar los datos extras requeridos
      ///////////////////////////////////////////

      let loadedProfesores = [];
      for (const key in profesorRows) {
        let binToString;
        let rows = { ...profesorRows[key][0] };
        if (rows.clase_en_ingles === true) {
          binToString = "Si";
        } else {
          binToString = "No";
        }
        rows.id = rows.id.toString();
        rows.unidades_de_carga_max = rows.unidades_de_carga_max.toString();
        rows.clase_en_ingles = binToString;
        rows["materia_bloqueada"] = codigoMaterias[rows.id];
        loadedProfesores.push(rows);
      }
      props.onChange(loadedProfesores);
      setProfesorInfo(loadedProfesores);
    } catch (error) {
      console.log(error);
    }
  }, [props.chosenMateria, props.chosenEspecialidad]);

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

export default OnFilterProfesor;
