/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  Input,
  Select,
  Modal,
  InputNumber,
  Steps,
  Row,
  Col,
  Checkbox,
} from 'antd';
import { usePageProvider } from '../../pages/providers';
import {
  professorStatus,
  professorTypes,
} from '../../constants/professor';

const { TextArea } = Input;
const { Step } = Steps;

const steps = [
  {
    title: 'General Information',
    content: 'General-info',
  },
  {
    title: 'Materias',
    content: 'materias',
  },
  {
    title: 'ECOA',
    content: 'Evaluaciones',
  },
];

function ProfessorModalForm({
  visible, onCreate, onCancel, disabled, index,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [current, setCurrent] = React.useState(0);

  const [form] = Form.useForm();

  const { selected, action, onCancelModal } = usePageProvider();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    form.resetFields();
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log('VALUES');
        onCreate(values, selected, action, index);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      // setVisible(false);
      onCancelModal('profesor');
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      mask={false}
      title="Profesor"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      {/* <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps> */}
      {/* <div className="steps-content">{steps[current].content}</div> */}
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
      <div>
        <Form
          form={form}
          layout="vertical"
          initialValues={selected}
        >
          <Form.Item label="Nómina" name="nomina">
            <Input
              placeholder="Nómina o matrícula"
              name="nomina"
              required
            />
          </Form.Item>
          <Form.Item label="Nombre" name="nombre">
            <Input
              placeholder="Nombre del profesor"
              name="nombreProfesor"
              required
            />
          </Form.Item>
          <Row gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          >
            <Col span={12}>
              <Form.Item label="Correo institucional" name="correo_institucional">
                <Input
                  placeholder="ejemplo@tec.mx"
                  name="correoInstitucional"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Correo personal" name="correo_personal">
                <Input
                  placeholder="ejemplo@mail.com"
                  name="correoPersonal"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          >
            <Col span={8}>
              <Form.Item label="Teléfono" name="telefono">
                <Input
                  placeholder="Teléfono del profesor"
                  name="telefono"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Estatus interno" name="estatus_interno">
                <Select
                  options={professorStatus}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tipo" name="tipo">
                <Select
                  options={professorTypes}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          >
            <Col span={12}>
              <Form.Item label="Unidades de Carga máximas" name="unidades_de_carga_max">
                <InputNumber
                  placeholder="Unidades de Carga Máximas"
                  name="unidadesCargaMax"
                />
              </Form.Item>
            </Col>
            <Form.Item label="Clase en inglés?" name="clase_en_ingles">
              <Col span={12}>
                <Checkbox
                  defaultChecked={
                    selected && selected.clase_en_ingles ? selected.clase_en_ingles : false
                  }
                  onChange={(e) => console.log(e.target.checked)}
                >
                  {/* ¿Clase en inglés? */}
                </Checkbox>
              </Col>
            </Form.Item>
          </Row>
          <Form.Item label="Empresa donde trabaja" name="empresa_donde_trabaja">
            <Input
              placeholder="Empresa donde trabaja"
              name="empresaDondeTrabaja"
            />
          </Form.Item>
          { action !== 'add' && (
          <>
            <Form.Item label="Temas de especialidad" name="tema_especialidad">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Temas de especialidad"
                defaultValue={selected ? selected.especialidades : []}
                    // onChange={handleChange}
                name="temasEspecialidad"
                options={selected ? selected.especialidades : []}
              />
            </Form.Item>
            <Form.Item label="Grados académicos" name="grado_academico">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Grados académicos"
                defaultValue={selected ? selected.grados : []}
                    // onChange={handleChange}
                name="gradosAcademicos"
                options={selected ? selected.grados : []}
              />
            </Form.Item>
            <Form.Item label="Materias impartidas" name="materia_impartida">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Materias impartidas"
                defaultValue={selected ? selected.materiasImpartidas : []}
                    // onChange={handleChange}
                name="materiasImpartidas"
                options={selected ? selected.materiasImpartidas : []}
              />
            </Form.Item>
          </>
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

export default ProfessorModalForm;
