import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Space, Switch, AutoComplete } from "antd";
import { materiaService } from "../../services/materia";
import OnFilterProfesor from "./OnFilterProfesor";
import { CSVLink } from "react-csv";

export default function MateriaFilter(props) {
  const [materiaInfo, setMateriaInfo] = useState([]);
  const [chosenMateria, setChosenMateria] = useState("");
  const [visualizador, setVisualizador] = useState(true);

  const dataFetchMateriasHandler = useCallback(async () => {
    try {
      const data = await materiaService.getAllMaterias();
      const loadedMaterias = [];

      for (const key in data) {
        loadedMaterias.push({ ...data[key] });
      }
      setMateriaInfo(loadedMaterias);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //////////////////////////////////////////////////////////////

  useEffect(() => {
    dataFetchMateriasHandler();
  }, [dataFetchMateriasHandler]);

  function onChange() {
    setVisualizador(!visualizador);
  }

  // Search input///////////////////////////////////////////////////////////////
  const displayMateriaOptions = () => {
    let materiaValues = [];
    let materiaCodigoIdMap = {};
    for (const key in materiaInfo) {
      materiaValues.push({
        key: materiaInfo[key].id,
        value: materiaInfo[key].codigo,
      });
      materiaCodigoIdMap[materiaInfo[key].codigo] = materiaInfo[key].id;
    }
    setMateriaList(materiaValues);
    setMateriaCodigoIdMap(materiaCodigoIdMap);
  };

  const [materiaList, setMateriaList] = useState("");
  const [materiaCodigoIdMap, setMateriaCodigoIdMap] = useState("");

  const onSelect = (nomina) => {
    setChosenMateria(materiaCodigoIdMap[nomina]);
  };

  useEffect(() => {
    displayMateriaOptions();
  }, [materiaInfo]);

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
    filename: "reporteProfesoresPorMateria.csv",
    headers: headers,
    data: downloadFormat,
  };

  return (
    <Fragment>
      <Space
        direction="vertical"
        style={{ marginTop: "50px", justifyContent: "center" }}
      >
        <span>
          Seleccionar código de materia:
          <AutoComplete
            style={{
              marginLeft: "10px",
              marginBottom: "15px",
              width: 200,
            }}
            onSelect={onSelect}
            placeholder="Seleccionar opción:"
            dropdownMatchSelectWidth={200}
            options={materiaList}
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
              chosenMateria={chosenMateria}
              profesorInfo={profesorInfo}
              onChange={(value) => {
                setProfesorInfo(value);
              }}
            />
          ) : null}
        </div>
      </Space>
    </Fragment>
  );
}
