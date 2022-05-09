import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import SubjectModalForm from '../SubjectModalForm/SubjectModalForm';
import ProfessorModalForm from '../ProfessorModalForm/ProfessorModalForm';
// import { createMateria } from './hooks/materiaActions';
// import { createProfesor } from './hooks/profesorActions';
import { materiaService } from '../../services/materia';
import { profesorService } from '../../services/profesor';


const ModalPage = ({type, action, payload}) => {
  const [visible, setVisible] = useState(false);

  const createMateria = async (data) => {
    try {
        await materiaService.createMateria(data)
    } catch (error) {
      console.log(error);
    }
  }

  const createProfesor = async (data) => {
    try {
        await profesorService.createProfesor(data)
    } catch (error) {
      console.log(error);
    }
  }

  const editMateria = async (data, id) => {
    try {
        const response = await materiaService.editMateria(data, id)
    } catch (error) {
      console.log(error);
    }
  }

  const editProfesor = async (data, id) => {
    try {
        const response = await profesorService.editProfesor(data, id)
    } catch (error) {
      console.log(error);
    }
  }

  const buttonType = () => {
    switch (action) {
      case 'edit':
        return (
          <Button
            style={{ color: "#eb2f96", borderColor: "white" }}
            onClick={() => {
              setVisible(true);
            }}
          >
            Editar
          </Button>
        )
      case 'detail':
        return (
        <Button
          style={{ color: "gray", borderColor: "white" }}
          onClick={() => {
            setVisible(true);
          }}
          // onClick={openSection.bind(this, profesorInfo[index].id, "detalle")}
        >
          Detalle
        </Button>
        )
      default:
        return (
          <Button
            size="small"
            shape="round"
            style={{
              color: "#eb2f96",
              borderColor: "white",
              marginBottom: "10px",
            }}
            icon={<PlusOutlined />}
            onClick={() => {
              setVisible(true);
            }}
          >
            Agregar {type}
          </Button>
        )
    }
  }

  const onCreate = (values) => {
    delete values['maestrias_aceptadas'];

    if (action === 'add') {
      type === 'profesor'
      ? createProfesor(values)
      : createMateria(values)
    }

    if (action === 'edit') {
      type === 'profesor'
      ? editProfesor(values, payload.nomina)
      : editMateria(values, payload.codigo)
    }


    setVisible(false);
  };

  return (
    <div>
      {buttonType()}
      {
        type === 'materia' ? (
          <SubjectModalForm
            visible={visible}
            onCreate={onCreate}
            payload={payload}
            disabled={action === 'detail'}
            onCancel={() => {
              setVisible(false);
            }}
          />
        ) : (
          <ProfessorModalForm
            visible={visible}
            onCreate={onCreate}
            payload={payload}
            onCancel={() => {
              setVisible(false);
            }}
          />
        )
      }
    </div>
  );
};

export default ModalPage;