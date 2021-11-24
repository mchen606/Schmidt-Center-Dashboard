import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';

//https://api.thingspeak.com/channels/1344510/feeds.json?api_key=VJ570KKB1RMDD6NU

function MapView() {
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
      <MapContainer center={[38.63, -76.75]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[38.63, -76.75]}>
          <Popup>
            <div class='container mx-auto'>
              <h1>
                <strong>William Schmidt Center School</strong>
              </h1>
              {/* 
              {items.feeds[0].field2} 
              {items.feeds[0].field6}
              */}
              <h2>AQI: </h2>
              <h2>Weather: </h2>
            </div>
          </Popup>
        </Marker>
        <Marker position={[38.63, -76.75]}>
          <Popup>
            <div class='container mx-auto'>
              <h1>
                <strong>William Schmidt Center School</strong>
              </h1>
              <h2>AQI: {items.field2}</h2>
              <h2>Temperature: {items.field6}F</h2>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default MapView;
