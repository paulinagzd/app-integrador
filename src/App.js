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

const App = () => {
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
    <PageProvider>
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
                <Route path="/profesor" element={ <Profesores /> } end />
                <Route path="/materia" element={ <Materias /> } />
                <Route path="/reporte" element={ <Reportes /> } />
                <Route path="/admin" element={<Admin />} />
                <Route path="/upload" element={ <Upload /> }/>
              </Routes>
            </div>
          </Content>
        </BrowserRouter>
      </Layout>
    </PageProvider>
  </div>
);
}

export default App;

