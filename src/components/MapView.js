import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl
} from 'react-leaflet';
import React, { useState, useEffect } from 'react';

//https://api.thingspeak.com/channels/1344510/feeds.json?api_key=VJ570KKB1RMDD6NU
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function MapView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sensors, setSensorData] = useState({
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
        console.log('DATA: ', data);
        await setSensorData({
          allSensors: await data.schmidtSensorsData,
          north: await data.northCountySensorData,
          central: await data.centralCountySensorsData,
          inner: await data.innerBeltwaySensorsData,
          south: await data.southCountySensorsData,
          rural: await data.ruralTierSensorsDatas
        });
        setIsLoaded(true);
      } catch (err) {
        console.log('Hit1: ', err);
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
    console.log('Sensors: ', sensors);
    return (
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker />
        <LayersControl position='topright'>
          <LayersControl.Overlay name='North'>
            <Marker position={center}>
              <Popup>
                <div class='container mx-auto bg '>
                  <h1>North County</h1>
                  {/* <h2>AQI: {items.field2}</h2>
                  <h2>Temperature: {items.field6}F</h2> */}
                </div>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Central'>
            <Marker position={center}>
              <Popup>
                <div class='container mx-auto bg '>
                  <h1>Central County</h1>
                </div>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Rural'>
            <Marker position={center}>
              <Popup>
                <div class='container mx-auto bg '>
                  <h1>Rural</h1>
                </div>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Inner'>
            <Marker position={center}>
              <Popup>
                <div class='container mx-auto bg '>
                  <h1>Inner Beltway</h1>
                </div>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='South'>
            <Marker position={center}>
              <Popup>
                <div class='container mx-auto bg '>
                  <h1>South County</h1>
                </div>
              </Popup>
            </Marker>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    );
  }
}

export default MapView;
