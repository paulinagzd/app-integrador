import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Login(props) {
  const nav = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   async function login(event) {
  function onFinish() {
    // event.preventDefault();

    try {
      //   await Auth.signIn(email, password);
      //   userHasAuthenticated(true);
      nav("/admin");
      props.setLoadNavBar(true)
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <Fragment >
      <Title level={2} style={{ color: "#eb2f96" , marginTop: "100px" }}>
        Inicio
      </Title>
      <Form
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
        <Form.Item
          label="Usuario"
          name="usuario"
          rules={[
            {
              required: true,
              message: "Introducir usuario!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="contrasena"
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
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
