import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authenticationServices } from "../services/authentication";

const { Title } = Typography;

export default function Login(props) {
  const nav = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  
  useEffect(() => {
    props.setLoadNavBar(false);
    authenticationServices.logout();
  }, []); 

  //   async function login(event) {
  async function onFinish(values) {
    // event.preventDefault();
    const res = await authenticationServices.authenticateUser(values);
    if (res.status === "error"){
      message.error(res.message);
    } else {
      console.log("LOGIN ", res.token);
      localStorage.setItem("token", res.token);
      console.log(localStorage);
      nav("/admin");
      props.setLoadNavBar(true);
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
          label="Correo"
          name="email"
          rules={[
            {
              required: true,
              message: "Introducir correo!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
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
