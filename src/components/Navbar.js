import React, { Fragment, useState, useEffect } from "react";
import { Menu, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;


export default function Navbar(props) {
  const nav = useNavigate();
  const tabTitleDict = {
    inicio: "Inicio",
    profesor: "Profesores",
    materia: "Materias",
    reporte: "Reportes",
    admin: "Admin",
  };

  useEffect(() => {
    if (window.location.pathname.substring(1).length === 0) {
      setTab("inicio");
      setTitle(tabTitleDict["inicio"]);
    }
  }, []);

  const [tab, setTab] = useState(window.location.pathname.substring(1));
  const [title, setTitle] = useState(tabTitleDict[tab]);

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
          marginRight: "10px",
        }}
      >
        <Button
          size="small"
          shape="round"
          style={{
            color: "blue",
            borderColor: "white",
          }}
          icon={<LogoutOutlined />}
          onClick={() => {
            nav("/login");
            props.setLoadNavBar(false);
          }}
        >
          Logout
        </Button>
      </div>

      <Menu
        mode="horizontal"
        defaultSelectedKeys={tab || "inicio"}
        style={{
          display: "block",
          width: 550,
          marginLeft: "auto",
          backgroundColor: "transparent",
        }}
      >
        <Menu.Item key="profesor" onClick={() => setTitle("Profesores")}>
          <Link to="/profesor">
            <Title strong level={5} style={{ color: "orange" }}>
              Profesores
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="materia"
          onClick={() => {
            setTitle("Materias");
          }}
        >
          <Link to="/materia">
            <Title strong level={5} style={{ color: "orange" }}>
              Materias
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item key="reporte" onClick={() => setTitle("Reportes")}>
          <Link to="/reporte">
            <Title strong level={5} style={{ color: "orange" }}>
              Reportes
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item key="admin" onClick={() => setTitle("Admin")}>
          <Link to="/admin">
            <Title strong level={5} style={{ color: "orange" }}>
              Admin
            </Title>
          </Link>
        </Menu.Item>
      </Menu>

      <div
        style={{ marginRight: "auto", marginLeft: "50px", marginTop: "20px" }}
      >
        <Title level={2} style={{ color: "#eb2f96" }}>
          {title}
        </Title>
      </div>
    </Fragment>
  );
}
