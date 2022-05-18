import { useState } from "react";
import { Select, Typography } from "antd";
import "antd/dist/antd.less";
import MateriaFilter from "../components/Filter/MateriaFilter";
import EspecialidadFilter from "../components/Filter/EspecialidadFilter";
import ContratoFilter from "../components/Filter/ContratoFilter";
const { Title } = Typography;
const { Option } = Select;

export default function Reportes() {
  const [filter, setFilter] = useState();

  function handleChange(value) {
    switch (value) {
      case "materia":
        setFilter(<MateriaFilter />);
        break;
      case "especialidad":
        setFilter(<EspecialidadFilter />);
        break;
        case "contrato":
          setFilter(<ContratoFilter />);
          break;
      default:
        setFilter();
    }
  }
  return (
    <>
      <span style={{ marginRight: "5px" }}>
        <Title strong level={5} style={{ color: "blue" }}>
          Filtra profesor por
          <Select
            style={{ marginLeft: 15, width: "300px" }}
            onChange={handleChange}
            placeholder="Seleccionar opción:"
            allowClear
          >
            <Option value="materia">Materia</Option>
            <Option value="especialidad">Tema de Especialidad</Option>
            <Option value="contrato">Tipo de Contrato</Option>
          </Select>
        </Title>
      </span>

      {filter}
    </>
  );
}
