import "./App.css";
import Upload from "./components/upload";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Profesores from "./pages/Profesores";
import Materias from "./pages/Materias";
// import Inicio from "./pages/Inicio";
import Reportes from "./pages/Reportes";
import Navbar from "./components/Navbar";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
const { Content } = Layout;

function App() {
  const [loadNavBar, setLoadNavBar] = useState(false);
  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      setLoadNavBar(true);
    }
  }, []);
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          {loadNavBar ? <Navbar /> : null}
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                  path="/login"
                  element={<Login setLoadNavBar={setLoadNavBar} />}
                />
                {/* <Route path="/inicio" element={<Inicio />} /> */}
                <Route path="/profesor" element={<Profesores />} end />
                <Route path="/materia" element={<Materias />} />
                <Route path="/reporte" element={<Reportes />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/upload" element={<Upload />} />
              </Routes>
              {/* <FileDrop></FileDrop> */}
            </div>
          </Content>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;

{
  /* <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            // items={new Array(15).fill(null).map((_, index) => {
            //   const key = index + 1;
            //   return {
            //     key,
            //     label: `nav ${key}`,
            //   };
            // })}
          >
            <Button>Inicio</Button>
            <Button>Profesores</Button>
            <Button>Materias</Button>
            <Button>Reportes</Button>
            <Button>Admin</Button>
            
          </Menu>
          </Header> */
}
