import React from 'react';
import { EditButton, DetailButton, TopButtons } from './ModalButtons';

const ModalButton = ({
  action,
  setVisible,
  setDeleteWarning,
}) => {
  const renderingButton = () => {
    switch (action) {
      case 'edit':
        return (
          <EditButton
            setVisible={setVisible}
          />
        );
      case 'detail':
        return (
          <DetailButton
            setVisible={setVisible}
          />
        );
      default:
        return (
          <TopButtons
            setVisible={setVisible}
            setDeleteWarning={setDeleteWarning}
          />
        );
    }
  };

  return renderingButton();
};

export default ModalButton;
