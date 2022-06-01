/* eslint-disable no-lone-blocks */
import React from 'react';
import { Layout } from 'antd';
import {
  Route, Routes, Navigate, BrowserRouter,
} from 'react-router-dom';
import './App.css';
import Upload from './components/upload';
import Profesores from './pages/Profesores';
import Materias from './pages/Materias';
import Inicio from './pages/Inicio';
import Reportes from './pages/Reportes';
import Navbar from './components/Navbar';
import 'antd/dist/antd.min.css';
import { PageProvider } from './pages/providers';

const { Content } = Layout;

const App = () => (
  <div className="App">
    <PageProvider>
      <Layout>
        <BrowserRouter>
          <Navbar />
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Routes>
                <Route path="/" element={<Navigate to="/inicio" replace />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/profesor" element={<Profesores />} end />
                <Route path="/materia" element={<Materias />} />
                <Route path="/reporte" element={<Reportes />} />
                {/* <Route path="/admin" element={<Admin/>} />  */}
                <Route path="/upload" element={<Upload />} />
                {/* <Route path="/reportes" element={<Reportes/>} />
                <Route path="/admin" element={<Admin/>} /> */}
              </Routes>

              {/* <Profesores /> */}
              {/* <FileDrop></FileDrop> */}
            </div>
          </Content>
        </BrowserRouter>
      </Layout>
    </PageProvider>
  </div>
);

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
