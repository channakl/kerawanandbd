import { MapContainer, TileLayer, GeoJSON, useMap, Marker, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import shpkediri from './geojson/shpkediri.json';

const Map = (props) => {
    const {
        extendClassname = false,
        overrideClassname = false,
        customClassname,
    } = props;

    const blueColors = [
        'rgb(0, 255, 255)', // Muda
        'rgb(0, 191, 255)',
        'rgb(0, 128, 255)', // Normal
        'rgb(0, 64, 255)',
        'rgb(0, 0, 255)'    // Tua
    ];
    const colors = [
        'rgb(255, 0, 0)',     // Merah terang
        'rgb(255, 165, 0)',   // Oranye (campuran merah dan kuning)
        'rgb(255, 255, 0)',   // Kuning
        // 'rgb(218, 165, 32)',  // Kuning tua atau keemasan
        // 'rgb(139, 69, 19)'    // Merah kecoklatan
    ];
    
    const generateRandomColorRgb = (feature) => {
        const r = Math.floor(Math.random() * 256); // Random red value between 0 and 255
        const g = Math.floor(Math.random() * 256); // Random green value between 0 and 255
        const b = Math.floor(Math.random() * 256); // Random blue value between 0 and 255
        return `rgba(${r},${g},${b},1)`; // Return RGB color string
    }
    const geoJSONStyle = (feature) => {
        // const type = feature.properties.type; // Ambil nilai 'type' dari properti
        let fillColor = 'blue';  // Warna default
        const randomIndex = Math.floor(Math.random() * 3);
        const color = colors[randomIndex];
        console.log(feature)
        // if (type === 'A') {
        //     fillColor = 'red';  // Warna untuk 'type' A
        // } else if (type === 'B') {
        //     fillColor = 'green';  // Warna untuk 'type' B
        // }
        return {
            fillColor: color,
            color: color,
            weight: 1
        };
    };

    return (
        <MapContainer zoom={14} center={[-7.8134480, 112.0088097]} scrollWheelZoom style={{ width: '100%', height: '100%', borderRadius: '.5rem'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
                data={shpkediri}
                style={geoJSONStyle}
            />
        </MapContainer>
    )
}

export default Map;