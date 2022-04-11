import './fileDrop.css'
import {React, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import Papa from 'papaparse';
import { profesorService } from '../services/profesor';

function FileDrop(props) {
  const [parsedCsvData, setParsedCsvData] = useState([]);

  const parseFile = file => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        setParsedCsvData(results.data);
      },
    });
  };


  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
      console.log(parsedCsvData);
      for(var x in parsedCsvData){
        console.log(parsedCsvData[x])
        createProfesor(parsedCsvData[x]);
      }
    }
  }, []);

  const createProfesor = async (data) => {
    try {
      const response = await
        profesorService.createProfesor(data);
      //console.log("profesor agregado")
    } catch (error) {
      //console.log("error agregando profesor")
      //console.log(error);
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
    accept: 'text/csv',
  });

  return (
    <div className="App">
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
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

    </div>
  );
}

export default FileDrop;