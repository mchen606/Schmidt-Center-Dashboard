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
//import { data } from './displayChart';

//https://api.thingspeak.com/channels/1344510/feeds.json?api_key=VJ570KKB1RMDD6NU

function showLabelMap(sensorData) {
  const dataArray = [];
  for (const sensorKey in sensorData) {
    if (sensorData.hasOwnProperty(sensorKey)) {
      let sensor = sensorData[sensorKey];
      dataArray.push(
        <Marker
          position={[sensor.Latitude, sensor.Longitude]}
          key={sensorKey}
        >
          <Popup>
            <div
              className='container mx-auto p-2 text-center rounded-md'
              id={aqiGradeRGB(sensor.AQI)}
              key={sensorKey}
            >
              <h1 className='font-sans font-bold '>Label: {sensor.Label}</h1>
              <h1 className='font-sans font-bold '>Sensor ID: {sensorKey}</h1>
              <h1 className='font-sans font-bold'>AQI: {sensor.AQI}</h1>
              <h1 className='font-sans font-bold p-1'>
                AQI Description: {sensor.AQIDescription}
              </h1>
              <p className='font-sans p-1'>{sensor.AQIMessage}</p>
            </div>
          </Popup>
        </Marker>
      );

    }

  }

  return dataArray;

}

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
  const center = [38.906334, -76.882176];
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
    const northCountySensorsMarkers = [...showLabelMap(sensors.north)];
    const centralCountySensorsMarkers = [...showLabelMap(sensors.central)];
    const innerBeltwaySensorsMarkers = [...showLabelMap(sensors.inner)];
    const southCountySensorsMarkers = [...showLabelMap(sensors.south)];
    const ruralTierSensorsMarkers = [...showLabelMap(sensors.rural)];
    return (
      <MapContainer center={center} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LayersControl position='topright'>
          <LayersControl.Overlay checked name='North'>
            <FeatureGroup>{northCountySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name='Central'>
            <FeatureGroup>{centralCountySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name='Rural'>
            <FeatureGroup>{ruralTierSensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name='Inner'>
            <FeatureGroup>{innerBeltwaySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name='South'>
            <FeatureGroup>{southCountySensorsMarkers}</FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    );
  }
}

export default MapView;
