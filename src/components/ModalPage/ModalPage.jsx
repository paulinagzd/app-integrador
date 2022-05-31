/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { usePageProvider } from '../../pages/providers';
import { useMateriasController, useProfesoresController } from '../../pages/hooks';
import SubjectModalForm from '../SubjectModalForm/SubjectModalForm';
import ProfessorModalForm from '../ProfessorModalForm/ProfessorModalForm';
import ModalButton from './ModalButton';

export const ModalButtonContext = React.createContext();

function ModalPage({
  type,
  action,
  payload,
  onDeleteOk,
  index,
}) {
  const [deleteWarning, setDeleteWarning] = useState(false);
  const { onCreateM } = useMateriasController();
  const { onCreateP } = useProfesoresController();

  const {
    onSetVisible,
    visibleMateriaModal,
    visibleProfesorModal,
    onCancelModal,
  } = usePageProvider();

  const handleOk = () => {
    onDeleteOk();
    setDeleteWarning(false);
  };

  const onOpenSubjectModal = () => (
    <SubjectModalForm
      visible={visibleMateriaModal}
      onCreate={onCreateM}
      // action={action}
      index={index}
      disabled={action === 'detail'}
      onCancel={() => {
        onCancelModal(type);
      }}
    />
  );

  const onOpenProfessorModal = () => (
    <ProfessorModalForm
      visible={visibleProfesorModal}
      onCreate={onCreateP}
      // action={action}
      index={index}
      disabled={action === 'detail'}
      onCancel={() => {
        onCancelModal(type);
      }}
    />
  );

  const openOnDeleteModal = () => (
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
      <p>
        Confirmar eliminación de
        {type}
        /s?
      </p>
    </Modal>
  );

  const onSuccess = type === 'materia' ? onOpenSubjectModal : onOpenProfessorModal;

  return (
    <div>
      {/* <ModalButtonContext.Provider
        value={{ action, setVisible, setDeleteWarning, type }}
      > */}
      <ModalButton
        action={action}
        setVisible={() => onSetVisible(type, payload, action, onSuccess)}
        type={type}
      />
      {
        type === 'materia' ? (
          <SubjectModalForm
            visible={visibleMateriaModal}
            onCreate={onCreateM}
            // action={action}
            index={index}
            disabled={action === 'detail'}
            onCancel={() => {
              onCancelModal(type);
            }}
          />
        ) : (
          <ProfessorModalForm
            visible={visibleProfesorModal}
            onCreate={onCreateP}
            // action={action}
            index={index}
            disabled={action === 'detail'}
            onCancel={() => {
              onCancelModal(type);
            }}
          />
        )
      }
    </div>
  );
}

export default ModalPage;
