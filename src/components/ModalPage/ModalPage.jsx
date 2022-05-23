<<<<<<< HEAD
import React, { useState } from "react";
import { Modal } from "antd";
import SubjectModalForm from "../SubjectModalForm/SubjectModalForm";
import ProfessorModalForm from "../ProfessorModalForm/ProfessorModalForm";
import { materiaService } from "../../services/materia";
import { profesorService } from "../../services/profesor";
import ModalButton from "./ModalButton";

export const ModalButtonContext = React.createContext();

const ModalPage = ({ type, action, payload, onDeleteOk }) => {
  const [visible, setVisible] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);

  const createMateria = async (data) => {
    try {
      await materiaService.createMateria(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProfesor = async (data) => {
    try {
      await profesorService.createProfesor(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editMateria = async (data, id) => {
    try {
      const response = await materiaService.editMateria(data, id);
    } catch (error) {
      console.log(error);
    }
  };

  const editProfesor = async (data, id) => {
    try {
      const response = await profesorService.editProfesor(data, id);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreate = (values) => {
    delete values["maestrias_aceptadas"];

    if (action === "add") {
      type === "profesor" ? createProfesor(values) : createMateria(values);
    }

    if (action === "edit") {
      type === "profesor"
        ? editProfesor(values, payload.nomina)
        : editMateria(values, payload.codigo);
    }

    setVisible(false);
  };

  const handleOk = () => {
    onDeleteOk();
    setDeleteWarning(false);
=======
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
>>>>>>> 086bb92a4df56ddd9aa6996b35a7e625c788e09b
  };

  return (
    <div>
<<<<<<< HEAD
      {/* {buttonType()} */}
      <ModalButtonContext.Provider
        value={{ action, setVisible, setDeleteWarning, type }}
      >
        <ModalButton action={action} setVisible={setVisible} type={type} />
      </ModalButtonContext.Provider>

      {type === "materia" ? (
        <>
=======
      {buttonType()}
      {
        type === 'materia' ? (
>>>>>>> 086bb92a4df56ddd9aa6996b35a7e625c788e09b
          <SubjectModalForm
            visible={visible}
            onCreate={onCreate}
            payload={payload}
<<<<<<< HEAD
            disabled={action === "detail"}
=======
            disabled={action === 'detail'}
>>>>>>> 086bb92a4df56ddd9aa6996b35a7e625c788e09b
            onCancel={() => {
              setVisible(false);
            }}
          />
<<<<<<< HEAD
          <Modal
            visible={deleteWarning}
            // onCreate={onCreate}
            payload={payload}
            // disabled={action === "detail"}
            onCancel={() => {
              setDeleteWarning(false);
            }}
            onOk={handleOk}
          >
            <p>Confirmar eliminación de {type}/s?</p>
          </Modal>
        </>
      ) : (
        <>
=======
        ) : (
>>>>>>> 086bb92a4df56ddd9aa6996b35a7e625c788e09b
          <ProfessorModalForm
            visible={visible}
            onCreate={onCreate}
            payload={payload}
            onCancel={() => {
              setVisible(false);
            }}
          />
<<<<<<< HEAD

          <Modal
            visible={deleteWarning}
            // onCreate={onCreate}
            payload={payload}
            // disabled={action === "detail"}
            onCancel={() => {
              setDeleteWarning(false);
            }}
            onOk={handleOk}
          >
            <p>Confirmar eliminación de {type}/es?</p>
          </Modal>
        </>
      )}
=======
        )
      }
>>>>>>> 086bb92a4df56ddd9aa6996b35a7e625c788e09b
    </div>
  );
};

<<<<<<< HEAD
export default ModalPage;
=======
export default ModalPage;
>>>>>>> 086bb92a4df56ddd9aa6996b35a7e625c788e09b
