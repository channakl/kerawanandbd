import { MapContainer, TileLayer, useMap, Marker, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = (props) => {
    const {
        extendClassname = false,
        overrideClassname = false,
        customClassname,
    } = props;
    return (
        <MapContainer zoom={13} center={[51.505, -0.09]} scrollWheelZoom={false} style={{ width: '100%', height: '100%', borderRadius: '.5rem'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default Map;