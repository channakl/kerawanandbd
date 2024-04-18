import { MapContainer, TileLayer, GeoJSON, useMap, Marker, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import shpkediri from '../../public/geojson/shpkediri.json';

const Map = (props) => {
    const {
        extendClassname = false,
        overrideClassname = false,
        customClassname,
    } = props;
    return (
        <MapContainer zoom={14} center={[-7.8134480, 112.0088097]} scrollWheelZoom={false} style={{ width: '100%', height: '100%', borderRadius: '.5rem'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={shpkediri} />
        </MapContainer>
    )
}

export default Map;