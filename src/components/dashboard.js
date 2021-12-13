import { render } from 'react-dom';
import React, { useEffect, useState } from 'react';
import Parser from "react-html-parser";

const displayChart = require('./displayChart');

//const dropdata = [];

const dropdownlist = async() => {

  let select = "";
  let north = "<optgroup label='North County'>";
  let south = "<optgroup label='South County'>";
  let central = "<optgroup label='Central County'>";
  let rural = "<optgroup label='Rural Tier'>";
  let inner = "<optgroup label='Inner Beltsway'>";
  //const [sensoridlists, setSensoridlists] = useState(null);

  try{
    let data = await fetch('/.netlify/functions/allSensorsIDs');
    //data = data.json();
    const sensoridlists = await data.json();
    //setSensoridlists(data);
    console.log("ID Lists: " + sensoridlists)
    for(let key in sensoridlists){
      if(sensoridlists.hasOwnProperty(key)){
          if(sensoridlists[key].Region === "North County"){
            north += `<option value=${key}>${sensoridlists[key].Name} Status: ${sensoridlists[key].Status}</option>`
          }
          if(sensoridlists[key].Region === "South County"){
            south += `<option value=${key}>${sensoridlists[key].Name} Status: ${sensoridlists[key].Status}</option>`
          }
          if(sensoridlists[key].Region === "Central County"){
            central += `<option value=${key}>${sensoridlists[key].Name} Status: ${sensoridlists[key].Status}</option>`
          }
          if(sensoridlists[key].Region === "rural County"){
            rural += `<option value=${key}>${sensoridlists[key].Name} Status: ${sensoridlists[key].Status}</option>`
          }
          if(sensoridlists[key].Region === "Inner Beltsway"){
            inner += `<option value=${key}>${sensoridlists[key].Name} Status: ${sensoridlists[key].Status}</option>`
          }
      }
    }

  }catch(err)
  {
    console.log(err.message);
  }

  north += "</optgroup>";
  south += "</optgroup>";
  central += "</optgroup>";
  inner += "</optgroup>";
  rural += "</optgroup>";

  select = select.concat(north, south, central, rural, inner);
  //select += "</div>";
  //dropdata.push(select)

  return select;
}

export default function HandleInputForm () {
  // const canvasObj = canvasRef.current;
  // const ctx = canvasObj.getContext('2d');
  const [inputs, setInputs] = useState({
    sensorid: '',
    sensorid2:'',
    startdate: '',
    enddate: '',
    temperature: false,
    aqi: false,
    humidity: false,
    pm_1: false,
    pm_25: false,
    pm_10: false
  });
  const [result, setresult] = useState("");


  const handleChange = (e) => {
    setInputs((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e) => {
    setInputs((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.checked
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rootElement = document.getElementById('chart-display');
    const Display = () => displayChart.ShowChart(inputs);
    render(<Display />, rootElement);
  };

  // const Detdropdown = () => {
  //   //event.preventDefault();
  //   //const rootElement = document.getElementById('sensor-id');
  //   //let result = ["wewewe"];
  //   useEffect(() => {
  //     const List = async() => await dropdownlist();
  //     List().then(data => {
  //       setresult(data);
  //       //result.push(data);
  //       console.log("trfehjh: "+ result );
  //       //return result;
  //   });

  //   })
  //   // const List = async() => await dropdownlist();
  //   // List().then(data => {
  //   //   result.push(data);
  //   //   console.log("trfehjh: "+ result );
  //   //   return result;
  //   // });
  //   //delay(1000000);
  //   console.log("Listweeed: " + result)
  //   return result;
  //   //render(<List />, rootElement);
  // }

  useEffect(() => {
    const List = async() => await dropdownlist();
    List().then(data => {
      setresult(data);
      //result.push(data);
      //console.log("trfehjh: "+ result );
      //return result;
    }) 
  });


  //console.log("tr09h: "+ result );

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className='user-inputs'
          method='post'
          name='user-input'
        >
          <h2>
            <b>Select sensor ID and date range:</b>
          </h2>
          <div className='user-input'>
            <label htmlFor='sensor-id' style={{'margin-right':'142px'}}> Sensor ID: </label>
            <select
              type='number'
              id='sensor-id'
              name='sensorid'
              placeholder='Sensor ID'
              value={inputs.sensorid}
              onChange={handleChange}
              required
            >
              {Parser(result )}
            </select>
          </div>
          <div className='user-input'>
            <label htmlFor='sensor-id2'> Second Sensor ID (optional): </label>
            <select
              type='number'
              id='sensor-id2'
              name='sensorid2'
              placeholder='Second Sensor ID'
              value={inputs.sensorid2}
              onChange={handleChange}
            >
              {Parser(result )}
            </select>
          </div>
          <div className='user-input'>
            <label htmlFor='start-date' style={{'margin-right':'138px'}}> Start Date: </label>
            <input
              type='date'
              id='start-date'
              name='startdate'
              value={inputs.startdate}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className='user-input'> 
            <label htmlFor='end-date' style={{'margin-right':'144px'}}> End Date: </label>
            <input
              type='date'
              id='end-date'
              name='enddate'
              value={inputs.enddate}
              onChange={handleChange}
              required
            ></input>
          </div>
          <h2>
            <b>Choose features to compare and graph:</b>
          </h2>
          <div className='user-input'>
            <input
              type='checkbox'
              id='temperature'
              name='temperature'
              value={inputs.temperature}
              onChange={handleCheckboxChange}
            ></input>
            <span htmlFor='temperature' className='ml-2'>Temperature</span>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='humidity'
              name='humidity'
              value={inputs.humidity}
              onChange={handleCheckboxChange}
            ></input>
            <span htmlFor='humidity' className='ml-2'>Humidity</span>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='aqi'
              name='aqi'
              value={inputs.aqi}
              onChange={handleCheckboxChange}
            ></input>
            <span htmlFor='AQI' className='ml-2'>AQI (Air Quality Index)</span>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='pm_1'
              name='pm_1'
              value={inputs.pm_1}
              onChange={handleCheckboxChange}
            ></input>
            <span htmlFor='pm_1_0' className='ml-2'>
              PM_1.0 (Atmospheric Particulate Matter: 1.0 micrometers or less)
            </span>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='pm_25'
              name='pm_25'
              value={inputs.pm_25}
              onChange={handleCheckboxChange}
            ></input>
            <span htmlFor='pm_2_5' className='ml-2'>
              PM_2.5 (Atmospheric Particulate Matter: 2.5 micrometers or less)
            </span>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='pm_10'
              name='pm_10'
              value={inputs.pm_10}
              onChange={handleCheckboxChange}
            ></input>
            <span htmlFor='pm_10_0' className='ml-2'>
              PM_10.0 (Atmospheric Particulate Matter: 10 micrometers or less)
            </span>
          </div>

          <div className='user-input'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mt-3 rounded"
              type='submit'
              value='Submit'
              id='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className='chart-display' id='chart-display'></div>
    </div>
  );
}

//export default HandleInputForm;
