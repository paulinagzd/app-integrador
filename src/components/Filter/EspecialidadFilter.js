import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Space, Switch, AutoComplete } from "antd";
import { especialidadService } from "../../services/especialidad";
import OnFilterProfesor from "./OnFilterProfesor";
import { CSVLink } from "react-csv";

export default function EspecialidadFilter() {
  const [especialidadInfo, setEspecialidadInfo] = useState([]);
  const [chosenEspecialidad, setChosenEspecialidad] = useState("");
  const [visualizador, setVisualizador] = useState(true);

  const dataFetchEspecialidadesHandler = useCallback(async () => {
    try {
      const data = await especialidadService.getAllEspecialidades();
      const loadedEspecialidades = [];

      for (const key in data) {
        loadedEspecialidades.push({ ...data[key] });
      }
      setEspecialidadInfo(loadedEspecialidades);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dataFetchEspecialidadesHandler();
  }, [dataFetchEspecialidadesHandler]);

  function onChange() {
    setVisualizador(!visualizador);
  }

  // Search input///////////////////////////////////////////////////////////////
  const displayEspecialidadOptions = () => {
    let especialidadValues = [];
    let especialidadNombreIdMap = {};
    for (const key in especialidadInfo) {
      especialidadValues.push({
        key: especialidadInfo[key].id,
        value: especialidadInfo[key].nombre,
      });
      especialidadNombreIdMap[especialidadInfo[key].nombre] =
        especialidadInfo[key].id;
    }
    setEspecialidadList(especialidadValues);
    setEspecialidadNombreIdMap(especialidadNombreIdMap);
  };

  const [especialidadList, setEspecialidadList] = useState("");
  const [especialidadNombreIdMap, setEspecialidadNombreIdMap] = useState("");

  const onSelect = (nombre) => {
    setChosenEspecialidad(especialidadNombreIdMap[nombre]);
  };

  useEffect(() => {
    displayEspecialidadOptions();
  }, [especialidadInfo]);

  //Formateo y descarga a CSV de los datos filtrados
  const [downloadFormat, setDownloadFormat] = useState([]);
  const [profesorInfo, setProfesorInfo] = useState([]);
  const downloadCSVhandler = () => {
    let final = [];
    for (const key in profesorInfo) {
      let rows = { ...profesorInfo[key] };
      rows["materia_bloqueada"] = rows["materia_bloqueada"].join(",");
      final.push(rows);
    }
    setDownloadFormat(final);
  };

  const headers = [
    { label: "Nómina", key: "nomina" },
    { label: "Nombre", key: "nombre" },
    { label: "Correo", key: "correo_institucional" },
    { label: "CIPs", key: "cip" },
    { label: "Materias Bloqueadas", key: "materia_bloqueada" },
    { label: "Tipo de Contrato", key: "tipo" },
    { label: "Unidades de Carga Máximas", key: "unidades_de_carga_max" },
    { label: "Clases en Inglés", key: "clase_en_ingles" },
    { label: "Histórico de ECOAS", key: "ecoa" },
    { label: "Notas", key: "notas" },
  ];

  const csvReport = {
    filename: "reporteProfesoresPorEspecialidad.csv",
    headers: headers,
    data: downloadFormat,
  };

  //////////////////////////////////////

  return (
    <Fragment>
      <Space
        direction="vertical"
        style={{ marginTop: "50px", justifyContent: "center" }}
      >
        <span>
          Seleccionar nombre de especialidad:
          <AutoComplete
            style={{
              marginLeft: "10px",
              marginBottom: "15px",
              width: 200,
            }}
            onSelect={onSelect}
            placeholder="Seleccionar opción:"
            dropdownMatchSelectWidth={200}
            options={especialidadList}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            allowClear
          />
        </span>
        <span>
          Visualizar Reporte
          <Switch
            checkedChildren="Si"
            unCheckedChildren="No"
            onChange={onChange}
            defaultChecked
            style={{ marginLeft: "5px", marginRight: "15px" }}
          />
          {profesorInfo.length > 0 ? (
            <CSVLink
              {...csvReport}
              onClick={() => {
                downloadCSVhandler();
              }}
              style={{
                background: "white",
                border: "1px solid lightblue",
                padding: "4px",
              }}
            >
              Descargar Reporte
            </CSVLink>
          ) : null}
        </span>
        <div>
          {visualizador ? (
            <OnFilterProfesor
              chosenEspecialidad={chosenEspecialidad}
              profesorInfo={profesorInfo}
              onChange={(value) => setProfesorInfo(value)}
            />
          ) : null}
        </div>
      </Space>
    </Fragment>
  );
}
