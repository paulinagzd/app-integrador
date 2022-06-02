import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import PasswordModal from "../components/PasswordModal";

export default function Admin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {
    console.log("Las contraseña es erronea:", errorInfo);
  };

  //   async function onFinish(event) {
  function onFinish() {
    // event.preventDefault();

    try {
      //   await Auth.signIn(email, password);
      //   userHasAuthenticated(true);
      console.log("contraseña adquirida");
      form.resetFields();
      setIsModalVisible(true);
    } catch (e) {
      alert(e.message);
    }
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
