import React, { Fragment, useRef } from 'react';
import { Table, Space, Empty } from 'antd';
import 'antd/dist/antd.less';
import ModalPage from '../components/ModalPage/ModalPage';
import SubjectModalForm from '../components/SubjectModalForm/SubjectModalForm';
import { usePageProvider } from './providers';
import { filterService } from '../services/filter';
import { useMateriasController } from './hooks';

export const ModalButtonContext = React.createContext();

const Materias = () => {
  const searchInput = useRef('');

  const { materiaInfo, rowSelection } = useMateriasController();
  const { onCreateM } = useMateriasController();

  const {
    visibleMateriaModal,
    onCancelModal,
  } = usePageProvider();

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      ...filterService.getColumnSearchProps('codigo', searchInput),
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      ...filterService.getColumnSearchProps('nombre', searchInput),
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      ...filterService.getColumnSearchProps('tipo', searchInput),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      ...filterService.getColumnSearchProps('plan', searchInput),
    },
    {
      title: 'Operación',
      dataIndex: 'operacion',
      render: (text, record, index) => (
        <>
          <ModalPage
            type="materia"
            action="edit"
            payload={materiaInfo[index]}
          />
          <ModalPage
            type="materia"
            action="detail"
            payload={materiaInfo[index]}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <>
        <Space
          direction="horizontal"
          style={{ width: '100%', justifyContent: 'right' }}
        >
          <ModalPage
            type="materia"
            action="add"
            // chosenMaterias={chosenMaterias}
            // onDeleteOk={onDeleteOk}
          />
        </Space>
        {
        materiaInfo.length > 0
          ? (
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              dataSource={materiaInfo}
              columns={columns}
              rowKey="id"
            />
          ) : (
            <Empty
              description="Actualmente no hay información. Utilice el botón de agregar en la parte superior derecha."
            />
          )
        }
      </>
      <SubjectModalForm
        visible={visibleMateriaModal}
        onCreate={onCreateM}
        // action={action}
        // index={index}
        // disabled={action === 'detail'}
        onCancel={() => onCancelModal('materia')}
      />
    </>
  );
};

export default Materias;
