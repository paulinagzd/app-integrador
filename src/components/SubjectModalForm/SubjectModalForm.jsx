import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Modal,
  InputNumber,
} from 'antd';
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

const SubjectModalForm = ({visible, onCreate, onCancel, payload, disabled }) => {
  // const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [form] = Form.useForm();

  const handleOk = () => {
    form
    .validateFields()
    .then((values) => {
      form.resetFields();
      onCreate(values);
    })
    .catch((info) => {
      console.log('Validate Failed:', info);
    });
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      // setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Modal
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
            initialValues={payload}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
              <Form.Item label="Código" name="codigo">
                <Input
                  placeholder="Código o clave"
                  name="codigo"
                  required={true}
                />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Nombre" name="nombre">
                <Input
                  placeholder="Nombre de la materia"
                  name="nombreMateria"
                  required={true}
                  
                />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                <Form.Item label="CIP" name="CIP">
                  <InputNumber
                    placeholder="CIP"
                    name="cip"
                  />
                </Form.Item>
              </Col>
            </Row>
              <Form.Item label="Tipo" name="tipo">
                <Select
                  options={subjectTypes}
                />
              </Form.Item>
              <Form.Item label="Periodo" name="periodo">
                <Select
                  options={subjectPeriods}
                />
              </Form.Item>
              <Form.Item label="Duración" name="duracion_en_semanas">
                <Select
                  options={subjectDurationWeeks}
                />
              </Form.Item>
              <Form.Item label="Plan" name="plan">
                <Select
                  options={subjectPlans}
                />
              </Form.Item>
              <Form.Item label="Maestrías aceptadas" name="maestrias_aceptadas">
              <Input
                placeholder="Maestrías aceptadas"
                name="maestriasAceptadas"
              />
              </Form.Item>
              <Form.Item label="Comentarios" name="notas">
                <TextArea
                  showCount
                  maxLength={100}
                />
              </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default SubjectModalForm;