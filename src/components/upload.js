import './upload.css'
import { Menu, Dropdown, message, Space } from 'antd';
import { DownOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {React, useState, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import Papa from 'papaparse';
import { createService } from '../services/create';


function Upload() {

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


  const items = [
    getItem('Profesores', '1'), 
    getItem('Grados Academicos', '2'),
    getItem('Temas de Especialidad', '3'), 
    getItem('Materias', '4'),
    getItem('Maestrías Aceptadas', '5'),
    getItem('Materias Impartidas y ECOA', '6'),
    getItem('Materias Bloqueadas', '7'),
  ];

  const [chosenItem, setChosenItem] = useState(items.at(0));
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [countSucc, setCountSucc] = useState(0);

  const onClick = (e) => {
    //console.log('click', e);
    //console.log(e.key);
    const clicked = items.find(({ key }) => key === e.key);
    //console.log(clicked);
    //console.log(clicked.label);
    setChosenItem(clicked);
    //console.log(chosenItem);
    //console.log(label);
  };

  const menu = (
    <Menu
    onClick={onClick}
    style={{
      width: 256,
    }}
    mode="vertical"
    items={items}
  />
  );

  const parseFile = file => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        setParsedCsvData(results.data);
      },
    });
  };

  const onDrop = acceptedFiles => {
    if (acceptedFiles.length) {
      console.log("Acepted Files: ", acceptedFiles);
      console.log("File: ", acceptedFiles[0]);
      parseFile(acceptedFiles[0]);
    }
  };

  useEffect(() => {
    if (parsedCsvData.length){
      console.log("Parsed CSV: ", parsedCsvData);
      for(var x in parsedCsvData){
        console.log(parsedCsvData[x])
        create(parsedCsvData[x]);
      }
      setParsedCsvData([]);
    }
  }, [parsedCsvData]);

  const create = async (data) => {
    try {
      var response = "";
      switch(chosenItem.key){
        case '1':
          response = await
          createService.createProfesor(data);
          console.log(response);
          console.log("Profesor Creado Con Exito");
          setCountSucc(countSucc + 1);
          break;
        case '2':
          response = await
          createService.createGradosAcademicos(data);
          console.log("Grado Academico Creado Con Exito");
          break;
        case '3':
          response = await
          createService.createTemasEspecialidad(data);
          console.log("Tema de Especialidad Creado Con Exito");
          response = await
          createService.createTemasEspecialidadProf(data);
          console.log("Tema de Especialidad Con Profesor Creado Con Exito");
          break;
        case '4':
          response = await
          createService.createMaterias(data);
          console.log("Materia Creada Con Exito");
          break;
        case '5':
          response = await
          createService.createMaestriasAceptadas(data);
          console.log("Maestria Aceptada Creada Con Exito");
          break;
        case '6':
          response = await
          createService.createMateriasImpartidas(data);
          console.log("Materia Impartida Creada Con Exito");
          break;
        case '7':
          response = await
          createService.createMaterisaBloqueadas(data);
          console.log("Materia Bloqueada Creada Con Exito");
          break;
      }
    } catch (error) {
      console.log(`Error Agregando ${chosenItem.label}`)
      console.log(error);
    }
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    //onDropAccepted,
    accept: 'text/csv',
  });

    return (
      <div className="Upload">
        <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
            <Space>
            {chosenItem.label}
            <DownOutlined />
            </Space>
        </a>
        </Dropdown>
            
            <div
              {...getRootProps({
                className: `dropzone 
                ${isDragAccept && 'dropzoneAccept'} 
                ${isDragReject && 'dropzoneReject'}
                ${isFocused && 'dropzoneFocused'}`,
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Upload CSV de {chosenItem.label}</p>
              )}
            </div>
      
          </div>
    );
}

export default Upload;

