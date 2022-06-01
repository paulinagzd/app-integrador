import {
  Fragment, useCallback, useEffect, useState,
} from 'react';
import { Table, Space, Collapse } from 'antd';
import 'antd/dist/antd.less';
import { profesorService } from '../../services/profesor';
import { materiaService } from '../../services/materia';

const { Panel } = Collapse;

function OnFilterProfesor(props) {
  const [profesorInfo, setProfesorInfo] = useState([]);

  const columns = [
    {
      title: 'Nómina',
      dataIndex: 'nomina',
      id: 'nomina',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      id: 'nombre',
    },
    {
      title: 'Correo',
      dataIndex: 'correo_institucional',
      id: 'correo_institucional',
    },
    {
      title: 'CIPs',
      dataIndex: 'cip',
      id: 'cip',
      render: (tags) => (
        <Collapse style={{ border: 'white', backgroundColor: 'white' }}>
          <Panel
            header="Desplegar CIPs"
            key="1"
            style={{ border: 'white' }}
          >
            {tags.map((cip) => (
              <p key={cip}>
                *
                {cip}
              </p>
            ))}
          </Panel>
        </Collapse>
      ),
    },
    {
      title: 'Materias Bloqueadas',
      dataIndex: 'materia_bloqueada',
      render: (tags) => (
        <Collapse style={{ border: 'white', backgroundColor: 'white' }}>
          <Panel
            header="Desplegar materias"
            key="1"
            style={{ border: 'white' }}
          >
            {tags.map((materia) => (
              <p key={materia}>
                *
                {materia.toUpperCase()}
              </p>
            ))}
          </Panel>
        </Collapse>
      ),
    },
    {
      title: 'Tipo de Contrato',
      dataIndex: 'tipo',
      id: 'tipo',
    },
    {
      title: 'Unidades de Carga Máximas',
      dataIndex: 'unidades_de_carga_max',
      id: 'unidades_de_carga_max',
    },
    {
      title: "Clases en Inglés",
      dataIndex: "clase_en_ingles",
      id: "clase_en_ingles",
    },
    {
      title: 'Histórico de ECOAS',
      dataIndex: 'ecoa',
      id: 'ecoa',
      render: (tags) => (
        <Collapse style={{ border: 'white', backgroundColor: 'white' }}>
          <Panel header="Desplegar ECOAs" key="1" style={{ border: 'white' }}>
            <table>
              <tr>
                <th>Código</th>
                <th>Calificación</th>
              </tr>
              {tags.map((ecoa) => (
                <tr key={ecoa}>
                  <td>
                    {ecoa[0]}
                    {' '}
                  </td>
                  <td>
                    {ecoa[1]}
                    {' '}
                  </td>
                </tr>
              ))}
            </table>
          </Panel>
        </Collapse>
      ),
    },
  ];

  const dataFetchProfesoresHandler = useCallback(async () => {
    try {
      if (!props.chosenMateria && !props.chosenEspecialidad) {
        return;
      }
      // Obtiene ids de los profesores
      let profesoresId;
      // Materias
      if (props.chosenMateria) {
        profesoresId = (
          await profesorService.getProfesorIdByMateriaId(props.chosenMateria)
        ).map((row) => row.id_profesor);
      }

      // Especialidades
      if (props.chosenEspecialidad) {
        profesoresId = (
          await profesorService.getProfesorIdByEspecialidadId(
            props.chosenEspecialidad,
          )
        ).map((row) => row.id_profesor);
      }

      // Obtiene los registros de los profesores segun los ids indicados
      const profesorRows = await Promise.all(
        profesoresId.map(async (key) => await profesorService.getProfesorById(key)),
      );

      // Obtienen los ECOAS y CIPs
      const cips = {};
      const ecoas = {};
      await Promise.all(
        profesoresId.map(async (key) => (await profesorService.getMateriasImpartidasById(key)).map((row) => {
          if (!cips[key]) {
            cips[key] = [];
          }
          cips[key].push(row.id_materia);
          if (!ecoas[key]) {
            ecoas[key] = [];
          }
          ecoas[key].push([row.id_materia, row.calificacion_ecoa]);
          return cips, ecoas;
        })),
      );

      for (const key in cips) {
        for (const row in cips[key]) {
          cips[key][row] = [
            ...(
              await materiaService.getMateriaCIPById(cips[key][row])
            )[0].CIPS.split(/[ ,]+/),
          ];
        }

        cips[key] = cips[key].join(',').split(/[ ,]+/);
      }

      for (const key in ecoas) {
        for (const row in ecoas[key]) {
          ecoas[key][row][0] = (
            await materiaService.getMateriaCodigoById(ecoas[key][row][0])
          )[0].codigo;
        }
      }

      // Obtiene el id de las materias bloqueadas y las guarda segun el id del profesor
      const materiasBloqueadas = {};
      await Promise.all(
        profesoresId.map(async (key, idx) => (await profesorService.getMateriasBloqueadasById(key)).map(
          (row) => {
            if (!materiasBloqueadas[profesoresId[idx]]) {
              materiasBloqueadas[profesoresId[idx]] = [];
            }

            materiasBloqueadas[profesoresId[idx]].push(row.id_materia);
            return materiasBloqueadas;
          },
        )),
      );

      // Obtiene el codigo de las materias bloqueadas y las guarda segun el id del profesor
      const codigoMaterias = {};
      for (const key in materiasBloqueadas) {
        for (const col in materiasBloqueadas[key]) {
          const materia = materiasBloqueadas[key][col];
          if (!codigoMaterias[key]) {
            codigoMaterias[key] = [];
          }
          codigoMaterias[key].push(
            (
              await Promise.all(
                await materiaService.getMateriaCodigoById(materia),
              )
            )[0].codigo,
          );
        }
      }

      // Modifica las celdas para incorporar los datos extras requeridos
      /// ////////////////////////////////////////
      const loadedProfesores = [];
      for (const key in profesorRows) {
        let binToString;
        const rows = { ...profesorRows[key][0] };
        if (rows.clase_en_ingles === true) {
          binToString = 'Si';
        } else {
          binToString = 'No';
        }
        rows.id = rows.id.toString();
        rows.unidades_de_carga_max = rows.unidades_de_carga_max.toString();
        rows.clase_en_ingles = binToString;
        rows.cip = cips[rows.id];
        rows.materia_bloqueada = codigoMaterias[rows.id];
        rows.ecoa = ecoas[rows.id];

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
    <>
      <Space
        direction="horizontal"
        style={{ width: '100%', justifyContent: 'right' }}
      />
      {profesorInfo.length > 0 ? (
        <Table dataSource={profesorInfo} columns={columns} rowKey="id" />
      ) : (
        <h3 style={{ color: "red" }}>
          Ningún profesor cumple con el criterio escogido
        </h3>
      )}
    </>
  );
}

export default OnFilterProfesor;
