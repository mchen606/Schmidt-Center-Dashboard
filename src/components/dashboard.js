
import { useRef } from "react";
import { useState } from "react";
import { render } from 'react-dom';

const displayChart = require('./displayChart')

export function HandleInputForm() {

    const canvasRef = useRef(null);
    // const canvasObj = canvasRef.current;
    // const ctx = canvasObj.getContext('2d');
    const [inputs, setInputs] = useState({
        sensorid: '',
        startdate: '',
        enddate: ''
    });

    const handleChange = e => {
        setInputs(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('This was submitted: ' + inputs.sensorid + " " + inputs.startdate);
        const rootElement = document.getElementById("chart-display");
        const Display = () => displayChart.showChart(inputs.sensorid, inputs.startdate, inputs.enddate);
        render(<Display />, rootElement);
        //displayChart.showChart(inputs.sensorid, inputs.startdate, inputs.enddate);
        //getRequestedData(inputs.sensorid, inputs.startdate, inputs.enddate);
    }

  return (
      <div>
          <div>
              <form onSubmit={handleSubmit} class="user-inputs" method="post" name="user-input">
                <p>Enter desired sensor id and date range:</p>
                <div class="user-input">
                    <label htmlFor="sensor-id"> Sensor ID: </label>
                    <input type="number" id="sensor-id" name="sensorid" placeholder="Sensor ID"
                        value={inputs.sensorid} 
                        onChange={handleChange} required>
                    </input>
                </div>
                <div class="user-input">
                    <label htmlFor="start-date"> Start Date: </label>
                    <input type="date" id="start-date" name="startdate" 
                        value={inputs.startdate} 
                        onChange={handleChange} required>
                    </input>
                </div>
                <div class="user-input">
                    <label htmlFor="end-date"> End Date: </label>
                    <input type="date" id="end-date" name="enddate"
                        value={inputs.enddate} 
                        onChange={handleChange} required>
                    </input>
                </div>
                <p>Choose a feature to compare:</p>
                <div class="user-input">
                    <input type="checkbox" id="temperature" name="temperature"></input>
                    <label htmlFor="temperature">Temperature</label>
                </div>
                <div class="user-input">
                    <input type="checkbox" id="AQI" name="AQI"></input>
                    <label htmlFor="AQI">AQI</label>
                </div>
                <div class="user-input">
                    <input type="checkbox" id="pm_25" name="pm_25"></input>
                    <label htmlFor="pm_25">PM_2.5</label>
                </div>
                <p>Submit to see result</p>
                <div class="user-input">
                    <input type="submit" value="Submit" id="submit"></input>
                </div>
              </form>
          </div>
          <div className="result-display" id="result-display">
            <canvas id="canvas" ref={canvasRef} width="250" height="250"></canvas>
          </div>
          <div className="chart-display" id="chart-display">
              
          </div>
      </div>

  )
}

export default HandleInputForm;