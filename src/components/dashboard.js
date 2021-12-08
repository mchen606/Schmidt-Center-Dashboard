import { useRef } from 'react';
import { useState } from 'react';
import { render } from 'react-dom';

const displayChart = require('./displayChart');

export function HandleInputForm() {
  const canvasRef = useRef(null);
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
            <label htmlFor='sensor-id'> Sensor ID: </label>
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
            <label htmlFor='start-date'> Start Date: </label>
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
            <label htmlFor='end-date'> End Date: </label>
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
            <b>Choose a feature to compare:</b>
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
            <label htmlFor='temperature'>Temperature</label>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='humidity'
              name='humidity'
              value={inputs.humidity}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor='humidity'>Humidity</label>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='AQI'
              name='AQI'
              value={inputs.aqi}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor='AQI'>AQI (Air Quality Index)</label>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='pm_1'
              name='pm_1'
              value={inputs.pm_1}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor='pm_1_0'>
              PM_1.0 (Atmospheric Particulate Matter: 1.0 micrometers or less)
            </label>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='pm_25'
              name='pm_25'
              value={inputs.pm_25}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor='pm_2_5'>
              PM_2.5 (Atmospheric Particulate Matter: 2.5 micrometers or less)
            </label>
          </div>
          <div className='user-input'>
            <input
              type='checkbox'
              id='pm_10'
              name='pm_10'
              value={inputs.pm_10}
              onChange={handleCheckboxChange}
            ></input>
            <label htmlFor='pm_10_0'>
              PM_10.0 (Atmospheric Particulate Matter: 10 micrometers or less)
            </label>
          </div>

          <div className='user-input'>
            <input type='submit' value='Submit' id='submit'></input>
          </div>
        </form>
      </div>
      <div className='chart-display' id='chart-display'></div>
    </div>
  );
}

export default HandleInputForm;
