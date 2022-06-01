import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';


export default function Admin() {
    const onFinishFailed = (errorInfo) => {
        console.log("Las contraseña es erronea:", errorInfo);
      };
    
      //   async function onFinish(event) {
      function onFinish() {
        // event.preventDefault();
    
        try {
          //   await Auth.signIn(email, password);
          //   userHasAuthenticated(true);
          console.log("contraseña adquirida")
        } catch (e) {
          alert(e.message);
        }
      }
  return (
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
        <h3 style={{marginRight:"auto"}}>Cambio de contraseña</h3>
      <Form.Item
        label="Introducir antigua contraseña"
        name="cambiasContrasena"
        rules={[
          {
            required: true,
            message: 'Introducir nueva contraseña!',
          },
        ]}
      >
        <Input />
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
    </Form>
  )
}
