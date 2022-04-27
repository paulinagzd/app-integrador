import React, { Fragment, useState, useEffect } from "react";
import { Menu, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Navbar() {
  const [title, setTitle] = useState("Inicio");
  const [state, setState] = useState("/"+title.toLowerCase());

  // useEffect((e) =>{
  //   window.location.pathname = state;
  //   e.preventDefault();
  // },[title])

  //prevent navbar from restarting when press refresh button

  return (
    <Fragment>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["inicio"]}
        style={{
          display: "block",
          width: 550,
          marginTop: "20px",
          marginLeft: "auto",
          backgroundColor: "transparent",
        }}
      >
        <Menu.Item key="inicio">
          <Link to="/inicio">
            <Title
              strong
              level={5}
              style={{ color: "orange" }}
              onClick={() => setTitle("Inicio")}
            >
              Inicio
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item key="profesores" onClick={() => setTitle("Profesores")}>
          <Link to="/profesor">
            <Title strong level={5} style={{ color: "orange" }}>
              Profesores
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item key="materias" onClick={() => setTitle("Materias")}>
          <Link to="/materia">
            <Title strong level={5} style={{ color: "orange" }}>
              Materias
            </Title>
          </Link>
        </Menu.Item>
        <Menu.Item key="reportes" onClick={() => setTitle("Reportes")}>
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
