/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Modal,
  InputNumber,
} from 'antd';
import { usePageProvider } from '../../pages/providers';
import {
  subjectTypes,
  subjectPeriods,
  subjectDurationWeeks,
  subjectPlans,
} from '../../constants/subject';

const { TextArea } = Input;

// SELECT/ADD
//  agregar un tipo POOL o csv de MAESTRIAS_ACEPTADAS
//    id_materia
//    nombre (input)

function SubjectModalForm({
  visible, onCreate, onCancel, disabled, index,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [form] = Form.useForm();

  const formRef = useRef(null); // set initial ref as null

  const { selected, action, onCancelModal } = usePageProvider();

  // maestrias aceptadas
  // cips siendo csvs

  // if (action !== 'add') {

  // }

  console.log(selected);

  useEffect(() => {
    form.resetFields();
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values, selected, action, index);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      // setVisible(false);
      onCancelModal('materia');
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
        // getContainer={false}
      mask={false}
      title="Materia"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <div>
        <Form
          form={form}
          layout="vertical"
          initialValues={selected}
        >
          <Row gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          >
            <Col span={12}>
              <Form.Item label="Código" name="codigo">
                <Input
                  placeholder="Código o clave"
                  name="codigo"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Nombre" name="nombre">
                <Input
                  placeholder="Nombre de la materia"
                  name="nombreMateria"
                  required
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          >
            <Col span={8}>
              <Form.Item label="Semestre" name="semestre">
                <InputNumber
                  min={1}
                  max={8}
                  placeholder="Semestre"
                  name="semestreMateria"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Unidades de Carga" name="unidades_de_carga">
                <InputNumber
                  placeholder="Unidades de Carga"
                  name="unidadesCarga"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Plan" name="plan">
                <Select
                  options={subjectPlans}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="CIPS" name="CIPS" extra="Ingrese los CIPS separados por comas. (Ej. 1, 2, 3...)">
            <Input />
          </Form.Item>
          <Row gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          >
            <Col span={8}>
              <Form.Item label="Tipo" name="tipo">
                <Select
                  options={subjectTypes}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Periodo" name="periodo">
                <Select
                  options={subjectPeriods}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Duración" name="duracion_en_semanas">
                <Select
                  options={subjectDurationWeeks}
                />
              </Form.Item>
            </Col>
          </Row>
          { action !== 'add' && (
            <Form.Item label="Maestrías aceptadas" name="maestrias_aceptadas">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Maestrías aceptadas"
                defaultValue={selected ? selected.maestrias : []}
                  // onChange={handleChange}
                name="maestriasAceptadas"
                options={selected ? selected.maestrias : []}
              />
              {/* <Input
                  placeholder="Maestrías aceptadas"
                  name="maestriasAceptadas"
                /> */}
            </Form.Item>
          )}
          <Form.Item label="Comentarios" name="notas">
            <TextArea
              showCount
              maxLength={100}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default SubjectModalForm;
