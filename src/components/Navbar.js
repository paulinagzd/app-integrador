import React, { Fragment, useState, useEffect } from "react";
import { Menu, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Navbar() {
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
      <Menu
        mode="horizontal"
        defaultSelectedKeys={tab || "inicio"}
        style={{
          display: "block",
          width: 550,
          marginTop: "20px",
          marginLeft: "auto",
          backgroundColor: "transparent",
        }}
      >
        <Menu.Item
          key="inicio"
          onClick={() => {
            setTitle("Inicio");
          }}
        >
          <Link to="/inicio">
            <Title strong level={5} style={{ color: "orange" }}>
              Inicio
            </Title>
          </Link>
        </Menu.Item>
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
          <Link to="/reportes">
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
