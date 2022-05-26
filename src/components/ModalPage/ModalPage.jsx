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
  };

  return (
    <div>
      {/* {buttonType()} */}
      <ModalButtonContext.Provider
        value={{ action, setVisible, setDeleteWarning, type }}
      >
        <ModalButton action={action} setVisible={setVisible} type={type} />
      </ModalButtonContext.Provider>

      {type === "materia" ? (
        <>
          <SubjectModalForm
            visible={visible}
            onCreate={onCreate}
            payload={payload}
            disabled={action === "detail"}
            onCancel={() => {
              setVisible(false);
            }}
          />
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
          <ProfessorModalForm
            visible={visible}
            onCreate={onCreate}
            payload={payload}
            onCancel={() => {
              setVisible(false);
            }}
          />

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
    </div>
  );
};

export default ModalPage;
