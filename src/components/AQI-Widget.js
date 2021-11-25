import aqiGradeRGB from '../helpers/AQI';
import React, { useState, useEffect } from 'react';
import './aqi.css';
function AQIWidget() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      'https://api.thingspeak.com/channels/1344510/feeds.json?api_key=VJ570KKB1RMDD6NU'
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.feeds[0]);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
      <>
        <div className='flex-col space-y-5'>
          <div>
            <h1 className='text-lg'>Selected AQI (Avg): {items.field2}</h1>
            <h1 className='text-lg'>Selected Temperature: {items.field6}</h1>
          </div>
          <div
            className='py-5 rounded-md text-center'
            id={aqiGradeRGB(items.field2)}
          >
            <h2 className=''>
              <stong>{aqiGradeRGB(items.field2)}</stong>
            </h2>
          </div>
          <div className='flex'>
            <div className='px-2 self-center'>0</div>
            <div className='px-2'>
              <img
                src='https://lh3.googleusercontent.com/proxy/BpSZ597XwEJHn1s7CbJIcMmJ2NlixK8u6T20OW75qvszp3aUwq2B1eXHNK9Sp4S88xK-VLFD9U2TphwWxJZ05rcC'
                alt='Double Sided Arrow'
              />
            </div>
            <div className='px-2 self-center'>50</div>
          </div>
        </div>
      </>
    );
  }
}

export default AQIWidget;
