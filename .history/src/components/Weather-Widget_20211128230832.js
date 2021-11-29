import React, { useState, useEffect } from 'react';
import '../index.css'

function WeatherWidget() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [resObj, setResObj] = useState({});
    useEffect(() => {
        fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=38&lon=-76&units=imperial&appid=9cf81dbd01ad9692bf2dcd8da6af1deb'
        )
          .then((res) => res.json())
          .then((result) => {
              setResObj(result);    
              setIsLoaded(true);       
            },
        
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      }, []);
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
    return (
        <div>
          <div class = "box-border h-45 w-60 p-4...">
          <div class = "border-4 border-light-blue-500 border-opacity-100 ...">
          <div class="shadow-lg bg-white rounded-lg h-18">
            <h2>Prince George's County, MD</h2>
            <div>
               {console.log(JSON.stringify(resObj))}
              <p>{resObj.main.temp} ºF, feels like: {resObj.main.feels_like}</p>
              <p>{resObj.weather[0].description}</p>
              <p>Wind: {resObj.wind.speed} MPH</p>
              <p>Humidity: {resObj.main.humidity}%</p>
            </div>
        </div> 
        </div>
        </div>
        </div>
    )}
}

export default WeatherWidget;
