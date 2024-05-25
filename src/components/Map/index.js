import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = (props) => {
    const { children, geoJson, geoJsonStyle, onEachGeoJsonFeature = () => {} } = props;
    return (
        <MapContainer zoom={16} center={[-7.29705665224, 112.770197762]} scrollWheelZoom style={{ width: '100%', height: '100%', borderRadius: '.5rem'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIAMAPS_API_KEY}`}
            />
            {geoJson && <GeoJSON data={geoJson} style={geoJsonStyle} onEachFeature={onEachGeoJsonFeature} />}
            {children}
        </MapContainer>
    )
}

export default Map;