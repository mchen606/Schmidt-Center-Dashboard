import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function MapView() {
  return (
    <MapContainer center={[38.63, -76.75]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[38.63, -76.75]}>
        <Popup>
          William Schmidt Center School
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
