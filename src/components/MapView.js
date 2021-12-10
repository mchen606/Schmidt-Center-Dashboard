import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  FeatureGroup
} from 'react-leaflet';
import aqiGradeRGB from '../helpers/AQI';

import React, { useState, useEffect } from 'react';

//https://api.thingspeak.com/channels/1344510/feeds.json?api_key=VJ570KKB1RMDD6NU

function MapView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sensors, setSensorData] = useState({
    allSensors: null,
    north: null,
    central: null,
    inner: null,
    south: null,
    rural: null
  });
  const center = [38.63, -76.75];
  // const centralCounty = [38.8275, -76.751111];
  // const northCounty = [39.019989, -76.879418];
  // const innerBeltway = [38.85944, -76.889167];
  // const southCounty = [38.810556, -76.946389];
  // const rural = [38.698611, -76.849167];
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        let data = await fetch('/.netlify/functions/processed');
        data = await data.json();
        setSensorData({
          allSensors: data.schmidtSensorsData,
          north: data.northCountySensorsData,
          central: data.centralCountySensorsData,
          inner: data.innerBeltwaySensorsData,
          south: data.southCountySensorsData,
          rural: data.ruralTierSensorsData
        });
        setIsLoaded(true);
      } catch (err) {
        setError(true);
      }
    };
    fetchData1();
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const northCountySensorsMarkers = [];
    for (const sensor of sensors.north) {
      northCountySensorsMarkers.push(
        <Marker
          position={[sensor.Latitude, sensor.Longitude]}
          key={sensor.sensor_ID}
        >
          <Popup>
            <div
              className='container mx-auto p-2 text-center rounded-md'
              id={aqiGradeRGB(sensor.AQI)}
              key={sensor.sensor_ID}
            >
              <h1 className='font-sans font-bold '>{sensor.Label}</h1>
              <h1 className='font-sans font-bold'>AQI: {sensor.AQI}</h1>
              <h1 className='font-sans font-bold p-1'>
                {sensor.AQIDescription}
              </h1>
              <p className='font-sans p-1'>{sensor.AQIMessage}</p>
            </div>
          </Popup>
        </Marker>
      );
    }
    const centralCountySensorsMarkers = [];
    for (const sensor of sensors.central) {
      centralCountySensorsMarkers.push(
        <Marker
          position={[sensor.Latitude, sensor.Longitude]}
          key={sensor.sensor_ID}
        >
          <Popup>
            <div
              className='container mx-auto p-2 text-center rounded-md'
              id={aqiGradeRGB(sensor.AQI)}
              key={sensor.sensor_ID}
            >
              <h1 className='font-sans font-bold '>{sensor.Label}</h1>
              <h1 className='font-sans font-bold'>AQI: {sensor.AQI}</h1>
              <h1 className='font-sans font-bold p-1'>
                {sensor.AQIDescription}
              </h1>
              <p className='font-sans p-1'>{sensor.AQIMessage}</p>
            </div>
          </Popup>
        </Marker>
      );
    }
    const innerBeltwaySensorsMarkers = [];
    for (const sensor of sensors.inner) {
      innerBeltwaySensorsMarkers.push(
        <Marker
          position={[sensor.Latitude, sensor.Longitude]}
          key={sensor.sensor_ID}
        >
          <Popup>
            <div
              className='container mx-auto p-2 text-center rounded-md'
              id={aqiGradeRGB(sensor.AQI)}
              key={sensor.sensor_ID}
            >
              <h1 className='font-sans font-bold '>{sensor.Label}</h1>
              <h1 className='font-sans font-bold'>AQI: {sensor.AQI}</h1>
              <h1 className='font-sans font-bold p-1'>
                {sensor.AQIDescription}
              </h1>
              <p className='font-sans p-1'>{sensor.AQIMessage}</p>
            </div>
          </Popup>
        </Marker>
      );
    }
    const southCountySensorsMarkers = [];
    for (const sensor of sensors.south) {
      southCountySensorsMarkers.push(
        <Marker
          position={[sensor.Latitude, sensor.Longitude]}
          key={sensor.sensor_ID}
        >
          <Popup>
            <div
              className='container mx-auto p-2 text-center rounded-md'
              id={aqiGradeRGB(sensor.AQI)}
              key={sensor.sensor_ID}
            >
              <h1 className='font-sans font-bold '>{sensor.Label}</h1>
              <h1 className='font-sans font-bold'>AQI: {sensor.AQI}</h1>
              <h1 className='font-sans font-bold p-1'>
                {sensor.AQIDescription}
              </h1>
              <p className='font-sans p-1'>{sensor.AQIMessage}</p>
            </div>
          </Popup>
        </Marker>
      );
    }
    const ruralTierSensorsMarkers = [];
    for (const sensor of sensors.rural) {
      ruralTierSensorsMarkers.push(
        <Marker
          position={[sensor.Latitude, sensor.Longitude]}
          key={sensor.sensor_ID}
        >
          <Popup>
            <div
              className='container mx-auto p-2 text-center rounded-md'
              id={aqiGradeRGB(sensor.AQI)}
              key={sensor.sensor_ID}
            >
              <h1 className='font-sans font-bold '>{sensor.Label}</h1>
              <h1 className='font-sans font-bold'>AQI: {sensor.AQI}</h1>
              <h1 className='font-sans font-bold p-1'>
                {sensor.AQIDescription}
              </h1>
              <p className='font-sans p-1'>{sensor.AQIMessage}</p>
            </div>
          </Popup>
        </Marker>
      );
    }
    return (
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LayersControl position='topright'>
          <LayersControl.Overlay name='North'>
            <FeatureGroup>{northCountySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Central'>
            <FeatureGroup>{centralCountySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Rural'>
            <FeatureGroup>{ruralTierSensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Inner'>
            <FeatureGroup>{innerBeltwaySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='South'>
            <FeatureGroup>{southCountySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    );
  }
}

export default MapView;
