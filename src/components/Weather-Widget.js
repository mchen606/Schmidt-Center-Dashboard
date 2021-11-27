import React, { useState } from 'react';


function WeatherWidget() {
    /*
    let [resObj, setResObj] = useState({});
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=38&lon=-76&appid=9cf81dbd01ad9692bf2dcd8da6af1deb' 
    )
    .then(res => res.json())
    .then(result => {
        setResObj(result)
        console.log(JSON.stringify(result.data));
        })
*/
    return (
        <div>
            <h2>Prince George's County, MD</h2>
            <h2>Local Weather</h2>
            <div>
            </div>
        </div> 
    )
}

export default WeatherWidget;
