import aqiGradeRGB from '../helpers/AQI';
import React, { useState, useEffect } from 'react';
import './aqi.css';

function calcAvgAQI(sensors) {
  let sum = 0;
  for (const sensorID in sensors) {
    if (sensors.hasOwnProperty(sensorID)) {
      let sensor = sensors[sensorID];
      sum += sensor.AQI;
    }
  }
 
  let avg = Math.round(sum / (Object.keys(sensors).length));
  return avg;
}

function AQIWidget() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sensors, setSensorData] = useState({
    allSensors: null
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch('/.netlify/functions/processed');
        data = await data.json();
        setSensorData({
          allSensors: data.schmidtSensorsData
        });
        setIsLoaded(true);
      } catch (err) { 
        setError(true);
      } 
    };
    fetchData();
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const avg = calcAvgAQI(sensors.allSensors);
    return (
      <>
        <div className='flex-col'>
          <div>
            <p className='text-2xl text-gray-600'>
              <span className='font-bold'>County AQI: </span>\
              {avg}
            </p>
          </div>
          <div className='mt-3 py-4 rounded-md text-center' id={aqiGradeRGB(avg)}>
            <h2>{aqiGradeRGB(avg)}</h2>
          </div>
          <div className='flex'>
            <div className='py-4 font-medium'>0</div>
            <div>
              <img src='/arrow.jpg' alt='Double Sided Arrow' />
            </div>
            <div className='py-4 font-medium'>50</div>
          </div>
        </div>
      </>
    );
  }
}

export default AQIWidget;
