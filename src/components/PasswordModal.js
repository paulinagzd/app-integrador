import React from "react";
import { Modal, Input } from "antd";

export default function PasswordModal(props) {
  //hacer async
  const handleOk = () => {
    try {
      console.log("nueva contraseña adquirida");
      props.setIsModalVisible(false);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };

  return (
    <Modal
      title="Cambio de Contraseña"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Cambiar"
      cancelText="Cerrar"
      destroyOnClose={true}
    >
      <h3>Introducir nueva contraseña</h3>
      <Input.Password />
    </Modal>
  );
}
