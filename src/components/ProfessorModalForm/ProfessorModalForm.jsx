/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
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
  Button,
} from 'antd';
import { usePageProvider } from '../../pages/providers';
import {
  professorStatus,
  professorTypes,
} from '../../constants/professor';

const { TextArea } = Input;
const { Step } = Steps;

const GeneralInfo = () => {
  const {
    selected, checked, action,
  } = usePageProvider();

  return (
    <>
      <Form.Item
        label="Nómina"
        name="nomina"
        rules={[
          {
            required: true,
            max: 9,
            message: 'Deben ser 9 carácteres y empezar con L.',
          }]}
      >
        <Input
          disabled={action==='detail'}
          placeholder="Nómina o matrícula"
          name="nomina"
          required
        />
      </Form.Item>
      <Form.Item label="Nombre" name="nombre">
        <Input
          disabled={action==='detail'}
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
              disabled={action==='detail'}
              placeholder="ejemplo@tec.mx"
              name="correoInstitucional"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Correo personal" name="correo_personal">
            <Input
              disabled={action==='detail'}
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
              disabled={action==='detail'}
              placeholder="Teléfono del profesor"
              name="telefono"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Estatus interno" name="estatus_interno">
            <Select
              disabled={action==='detail'}
              options={professorStatus}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tipo" name="tipo">
            <Select
              disabled={action==='detail'}
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
          <Form.Item
            label="Unidades de Carga máximas"
            name="unidades_de_carga_max"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 20,
                message: 'Deben ser entre 0 y 20 unidades.',
              }]}
          >
            <InputNumber
              disabled={action==='detail'}
              placeholder="Unidades de Carga Máximas"
              name="unidadesCargaMax"
            />
          </Form.Item>
        </Col>
        {/* <Form.Item label="Clase en inglés?" name="clase_en_ingles">
          <Col span={12}>
            <Checkbox
              disabled={action==='detail'}
              defaultChecked={
                selected && selected.clase_en_ingles ? selected.clase_en_ingles : false
              }
              onChange={(e) => onCheck(e.target.checked)}
              checked={checked}
            />
          </Col>
        </Form.Item> */}
      </Row>
      <Form.Item label="Empresa donde trabaja" name="empresa_donde_trabaja">
        <Input
          disabled={action==='detail'}
          placeholder="Empresa donde trabaja"
          name="empresaDondeTrabaja"
        />
      </Form.Item>
      <Form.Item label="Comentarios" name="notas">
        <TextArea
          disabled={action==='detail'}
          showCount
          maxLength={100}
        />
      </Form.Item>
    </>
  );
};

const MateriasStep = () => {
  const {
    selected, action, checked
  } = usePageProvider();

  return (
    <>
      { action !== 'add' && (
      <>
        <Form.Item label="Temas de especialidad" name="tema_especialidad">
          <Select
            disabled={action==='detail'}
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
            disabled={action==='detail'}
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
            disabled={action==='detail'}
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
        <Form.Item label="Materias bloqueadas" name="materia_bloqueada">
          <Select
            disabled={action==='detail'}
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Materias bloqueadas"
            defaultValue={selected ? selected.materiasBloqueadas : []}
                  // onChange={handleChange}
            name="materiasImpartidas"
            options={selected ? selected.materiasBloqueadas : []}
          />
        </Form.Item>
      </>
      )}
    </>
  );
};

const ProfessorModalForm = ({
  onCreate, onCancel, disabled,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [current, setCurrent] = React.useState(0);

  const [form] = Form.useForm();

  const {
    selected, action, onCancelModal, index, visibleProfesorModal,
  } = usePageProvider();

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
    const formData = form.getFieldsValue(true);
    onCreate(formData, selected, action, index);
    setConfirmLoading(true);
    setTimeout(() => {
      // setVisible(false);
      onCancelModal('profesor');
      setConfirmLoading(false);
    }, 2000);
  };

  const steps = [
    {
      title: 'Información',
      content: <GeneralInfo />,
    },
    {
      title: 'Materias',
      content: <MateriasStep />,
    },
    // {
    //   title: 'ECOA',
    //   content: 'Evaluaciones',
    // },
  ];

  console.log("ACTION MODAL FORM", action, action === 'detail')

  const StepButtons = () => {
    console.log("CYRREBT", current)
    return (
    <>
    {current == 0 && (
    <Button type="primary" onClick={() => next()}>
      Next
    </Button>
    )}
    {/* {current === steps.length - 1 && (
    <Button type="primary">
      Done
    </Button>
    )} */}
    {current > 0 && (
    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
      Previous
    </Button>
    )}
    </>
  )}

  return (
    <Modal
      mask={false}
      title="Profesor"
      visible={visibleProfesorModal}
      onCancel={() => onCancelModal('profesor')}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      footer={[
        <Button key="back" onClick={() => onCancelModal('profesor')}>
          Cancel
        </Button>,
        <StepButtons/>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{...selected, disabled: action === 'detail'}}
        disabled={true}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </Form>
    </Modal>
  );
};

export default ProfessorModalForm;
