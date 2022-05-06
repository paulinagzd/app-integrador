import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Modal,
  InputNumber,
  Steps,
} from 'antd';
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

const ProfessorModalForm = ({visible, onCreate, onCancel, payload }) => {
  // const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [current, setCurrent] = React.useState(0);

  const [form] = Form.useForm();

const next = () => {
  setCurrent(current + 1);
};

const prev = () => {
  setCurrent(current - 1);
};

  const handleOk = () => {
    console.log("AQUI FORM")
    console.log(form)
    form
    .validateFields()
    .then((values) => {
      form.resetFields();
      console.log("VALUES")
      console.log(values)
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
            initialValues={payload}
            // onValuesChange={onFormLayoutChange}
            // size={componentSize as SizeType}
          >
            <Form.Item label="Nómina" name="nomina">
              <Input
                placeholder="Nómina o matrícula"
                name="nomina"
                required={true}
              />
            </Form.Item>
            <Form.Item label="Nombre" name="nombre">
              <Input
                placeholder="Nombre del profesor"
                name="nombreProfesor"
                required={true}
              />
            </Form.Item>
            <Form.Item label="Correo institucional" name="correo_institucional">
              <Input
                placeholder="ejemplo@tec.mx"
                name="correoInstitucional"
                // required={true}
              />
            </Form.Item>
            <Form.Item label="Correo personal" name="correo_personal">
              <Input
                placeholder="ejemplo@mail.com"
                name="correoPersonal"
                // required={true}
              />
            </Form.Item>
            <Form.Item label="Teléfono" name="telefono">
              <Input
                placeholder="Teléfono del profesor"
                name="telefono"
                // required={true}
              />
            </Form.Item>
            <Form.Item label="Estatus interno" name="estatus_interno">
              <Select
                options={professorStatus}
              />
            </Form.Item>
            <Form.Item label="Tipo" name="tipo">
              <Select
                options={professorTypes}
              />
            </Form.Item>
            {/* <Form.Item label="Clase en inglés?" name="clase_en_ingles">
            </Form.Item> */}
            <Form.Item label="Unidades de Carga máximas" name="unidades_de_carga_max">
              <InputNumber
                placeholder="Unidades de Carga Máximas"
                name="unidadesCargaMax"
              />
            </Form.Item>
            <Form.Item label="Empresa donde trabaja" name="empresa_donde_trabaja">
            <Input
              placeholder="Empresa donde trabaja"
              name="empresaDondeTrabaja"
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

export default ProfessorModalForm;
