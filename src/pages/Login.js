import { Fragment, useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { authenticationServices } from "../services/authentication";

const { Title } = Typography;

export default function Login(props) {
  const nav = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   async function login(event) {
  async function onFinish(values) {
    // event.preventDefault();
    const res = await authenticationServices.authenticateUser(values);
    console.log(res);
     /*try {
      //   await Auth.signIn(email, password);
      //   userHasAuthenticated(true);
      nav("/admin");
      props.setLoadNavBar(true)
    } catch (e) {
      alert(e.message);
    }*/
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
