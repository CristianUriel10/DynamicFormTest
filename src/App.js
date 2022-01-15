import './App.css';
import React, { useState } from 'react';
import Select from "react-select";
import nextId from "react-id-generator";


function App() {
  const [optionsState, setOptionsState] = useState('Seleccionar');
  const [fields, setFields] = useState([]);

    function addField() {
      var htmlId = nextId();
      if (optionsState !== 'Seleccionar'){
        let obj = {
          component: optionsState,
          label: "Campo " + htmlId,
          type: optionsState,
          _uid: htmlId
        }
        
        setFields([...fields, obj]);
        setOptionsState('Seleccionar')
      } else {
        alert('Selecciona un tipo de campo')
      }
    }

    function deleteFielt(fieldId){
      setFields(fields.filter(({ _uid }) => _uid !== fieldId));
    }

    const handleChange = (value) => {
      const valueSelect = value.value;
      setOptionsState(valueSelect);
    };

    const options = [
      { label: "Seleccionar", value: "Seleccionar" },
      { label: "Text", value: "text" },
      { label: "Select", value: "select" },
      { label: "Radio", value: "radio" }
    ];

    const optionsCampo = [
      { label: "opcion1", value: "Opcion 1" },
      { label: "opcion2", value: "Opcion 2" },
      { label: "opcion3", value: "Opcion 3" },
      { label: "opcion4", value: "Opcion 4" }
    ];
  return (
    <div className="row">
      <div className="column">
        <label className="text-3xl font-bold">Elige el tipo de campo</label>
        <br/> 
        <Select placeholder="Seleccionar" className="mt-8" onChange={handleChange} options={options} value={
                  options.filter(option => 
                      option.value === optionsState)
                }/>
        <br/> 
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addField()}>Agregar Campo</button>
      </div>
      <div className="column mt-10">
        <h3 className="text-3xl font-bold">Formulario</h3>
        {fields.map(function(d){
          if (d.type === 'text'){
            return (
              <div id={d._uid} className="mt-4">
                <label className="text-gray-700 font-bold">{d.label}</label>
                <input type="text" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => deleteFielt(d._uid)}>Eliminar Campo</button>
              </div>
            )
          }else if (d.type === 'select') {
            return (
              <div id={d._uid} className="mt-4">
                <label className="text-gray-700 font-bold">{d.label}</label>
                <Select options={optionsCampo} />
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => deleteFielt(d._uid)}>Eliminar Campo</button>
              </div>
            )
          }else if (d.type === 'radio') {
            return (
              <div id={d._uid} className="mt-4">
                <label className="text-gray-700  font-bold">{d.label}</label><br/>
                <input type="radio" className="form-radio" id={d._uid + 'radio'} name={d._uid + 'radioName'} value="1" />
                <label for={d._uid + 'radioName'}>0 - 30</label><br/>
                <input type="radio" className="form-radio" id={d._uid + 'radio'} name={d._uid + 'radioName'} value="2" />
                <label for={d._uid + 'radioName'}>31 - 60</label><br/>  
                <input type="radio" className="form-radio" id={d._uid + 'radio'} name={d._uid + 'radioName'} value="3" />
                <label for={d._uid + 'radioName'}>61 - 100</label><br/>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => deleteFielt(d._uid)}>Eliminar Campo</button>
              </div>
            )
          }

          return null;
        })} 
      </div>
    </div>
  );
}

export default App;
