import React, { useState, useEffect } from "react";
import { Modal, Input, message } from "antd";
import { authenticationServices } from "../services/authentication";
import { useNavigate } from "react-router-dom";

export default function PasswordModal(props) {
  const [value, setValue] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if(!authenticationServices.currentUserValue){
      props.setIsModalVisible(false);
      nav("/login");
    }
  }, [authenticationServices.currentUserValue]); 
  
  //hacer async
  const handleOk = async () => {
    console.log("nueva contraseña adquirida");
    const res = await authenticationServices.changePassword(value);
    if (res.status === "error"){
      message.error(res.message);
    } else {
      props.setIsModalVisible(false);
    }
    /*try {
      //console.log(value);
      //authenticationServices.authenticatePassword(value);
      props.setIsModalVisible(false);
    } catch (e) {
      alert(e.message);
    }*/

  };

  
const onChange = (e) => {
  setValue(e.target.value)
}

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
      <Input.Password onChange={onChange} />
    </Modal>
  ); 
}
