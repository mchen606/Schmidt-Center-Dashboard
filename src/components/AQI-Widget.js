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
        <div className='flex-col'>
          <div>
            <p className='text-2xl text-gray-600'>
              <span className='font-bold'>County AQI: </span>
              {items.field2}
            </p>
          </div>
          <div
            className='mt-3 py-4 rounded-md text-center'
            id={aqiGradeRGB(items.field2)}
          >
            <h2>{aqiGradeRGB(items.field2)}</h2>
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
