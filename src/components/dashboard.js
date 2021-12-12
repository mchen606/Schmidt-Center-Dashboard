import { useState } from 'react';
import { render } from 'react-dom';

const displayChart = require('./displayChart');

export function HandleInputForm() {
  // const canvasObj = canvasRef.current;
  // const ctx = canvasObj.getContext('2d');
  const [inputs, setInputs] = useState({
    sensorid: '',
    startdate: '',
    enddate: '',
    temperature: false,
    aqi: false,
    humidity: false,
    pm_1: false,
    pm_25: false,
    pm_10: false
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('This was submitted: ' + JSON.stringify(inputs));
    const rootElement = document.getElementById('chart-display');
    const Display = () => displayChart.ShowChart(inputs);
    render(<Display />, rootElement);
    //displayChart.showChart(inputs.sensorid, inputs.startdate, inputs.enddate);
    //getRequestedData(inputs.sensorid, inputs.startdate, inputs.enddate);
  };

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
            <b>Enter sensor ID and date range:</b>
          </h2>
          <div className='user-input'>
            <label htmlFor='sensor-id' style={{'margin-right':'142px'}}> Sensor ID: </label>
            <input
              type='number'
              id='sensor-id'
              name='sensorid'
              placeholder='Sensor ID'
              value={inputs.sensorid}
              onChange={handleChange}
              required
            ></input>
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
          <p>(Default: Temperature and AQI)</p>
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

export default HandleInputForm;
