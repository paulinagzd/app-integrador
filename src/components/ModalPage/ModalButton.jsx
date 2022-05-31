import React, { useContext } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import { ModalButtonContext } from "./ModalPage.jsx";
import { EditButton, DetailButton, TopButtons } from './ModalButtons';
import { useController } from "../../pages/providers/hooks/useController.js";


const ModalButton = ({
  action,
  setVisible,
  type,
  setDeleteWarning
})  => {
  // const { action, setVisible, setDeleteWarning, type} =
  //   useContext(ModalButtonContext);

  const renderingButton = () => {
    switch (action) {
      case 'edit':
        return <EditButton
          setVisible={setVisible}
        />
      case 'detail':
        return <DetailButton
          setVisible={setVisible}
        />
      default:
        return <TopButtons
          setVisible={setVisible}
          setDeleteWarning={setDeleteWarning}
        />
    };
  }
  
  return renderingButton();
};

export default ModalButton;
