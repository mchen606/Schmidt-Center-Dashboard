
import { useRef } from "react";
import { useState } from "react";

var thingspeakHandler = require('./dataHandler');

//import ReactDOM from "react-dom";


async function getRequestedData(sensorids, startdate, enddate, datafield) {
    
    console.log("received id:"+ sensorids)
    const data = await thingspeakHandler.getThingspeakProcessedData([sensorids], startdate, enddate);
    
    console.log('DATA: ', data);   

}

function draw(canvasRef) {


    console.log("Drawing");

    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');

    ctx.clearRect(0, 0, 250, 250);
    
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
        
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
    
}

// function DisplayCanvasOnSubmit()  {

//     const canvasRef = useRef(null);
//     const canvasObj = canvasRef.current;
//     const ctx = canvasObj.getContext('2d');

//     draw(ctx);

//     return (
//         <canvas id="canvas" ref={canvasRef} width="250" height="250"></canvas>
//     )

// }


function MyhtmlForm() {

    const canvasRef = useRef(null);
    // const canvasObj = canvasRef.current;
    // const ctx = canvasObj.getContext('2d');

  const [inputs, setInputs] = useState({
      sensorid: '',
      startdate: '',
      enddate: ''
  });

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs(values => ({...values, [name]: value}))
//   }

  const handleChange = e => {
    setInputs(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('This was submitted: ' + inputs.sensorid + " " + inputs.startdate);
    getRequestedData(inputs.sensorid, inputs.startdate, inputs.enddate);
    draw(canvasRef);
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
          <div className="result-display">
            <canvas id="canvas" ref={canvasRef} width="250" height="250"></canvas>
          </div>
      </div>

  )
}


export default MyhtmlForm;