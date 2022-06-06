import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import PasswordModal from "../components/PasswordModal";
import { authenticationServices } from "../services/authentication";
import { useNavigate } from "react-router-dom";


export default function Admin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const nav = useNavigate();
  
  useEffect(() => {
    if(!authenticationServices.currentUserValue){
      nav("/login");
    }
  }, [authenticationServices.currentUserValue]); 

  const onFinishFailed = (errorInfo) => {
    console.log("Las contraseña es erronea:", errorInfo);
  };

  //   async function onFinish(event) {
  async function onFinish(value) {
    // event.preventDefault();
    console.log("contraseña adquirida");
    const res = await authenticationServices.authenticatePassword(value["cambiaContrasena"]);
    if (res.status === "error"){
      message.error(res.message);
    } else {
      form.resetFields();
      setIsModalVisible(true);
    }
    // try {
      //   await Auth.signIn(email, password);
      //   userHasAuthenticated(true);

/*       form.resetFields();
      setIsModalVisible(true);
    } catch (e) {
      alert(e.message);
    } */
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h3 style={{ marginRight: "auto" }}>Cambio de contraseña</h3>
      <Form.Item
        label="Introducir contraseña actual"
        name="cambiaContrasena"
        rules={[
          {
            required: true,
            message: "Introducir contraseña!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Verificar
        </Button>
      </Form.Item>

      <PasswordModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Form>
  );
}
