import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import rwGeoJson from './geojson/rw.json';
import { VULNERABILITY_LEVELS } from '@/modules/kerawanan/helpers/constants';
import { coordinates } from '@/modules/kerawanan/helpers/dummyData';
import { mergeClasses } from '@/helpers/className';

const MapKerawanan = (props) => {
    const {
        extendClassname = false,
        overrideClassname = false,
        customClassname,
        handleOpenInfoDrawer,
    } = props;

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
        const vulnerabilityLevelKeys = Object.keys(VULNERABILITY_LEVELS)
        const vulnerabilityLevelColors = vulnerabilityLevelKeys.map((key) => VULNERABILITY_LEVELS[key].COLOR);
        const color = vulnerabilityLevelColors[randomIndex];
        // if (type === 'A') {
        //     fillColor = 'red';  // Warna untuk 'type' A
        // } else if (type === 'B') {
        //     fillColor = 'green';  // Warna untuk 'type' B
        // }
        return {
            fillColor: color,
            color: color,
            weight: 2
        };
    };

    return (
        <MapContainer zoom={16} center={[-7.29705665224, 112.770197762]} scrollWheelZoom style={{ width: '100%', height: '100%', borderRadius: '.5rem'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
                data={rwGeoJson}
                style={geoJSONStyle}
            />
            {/* <Marker position={[-7.290687010969636, 112.820735318007891]}>
                <Popup>
                    <h3 className='text-lg font-bold text-center'>RW 03</h3>
                    <div className="flex gap-2 my-2 w-full min-w-72">
                        <div className="bg-gray-200 flex flex-1 flex-col items-center gap-2 px-2 py-3 rounded-md">
                            <p className="text-[15px] font-bold">Gender</p>
                        </div>
                        <div className="bg-gray-200 flex flex-1 flex-col items-center gap-2 px-2 py-3 rounded-md">
                            <p className="text-[15px] font-bold">{'Usia'}</p>
                        </div>
                    </div>
                    <button className={mergeClasses(
                        'w-full mt-4 p-2.5 rounded-md',
                        'bg-teal-500',
                        'text-white text-md font-bold tracking-wide'
                    )}>Laporkan Kasus</button>
                </Popup>
            </Marker> */}
            { coordinates.map((coordinate) => (
                <Marker position={[coordinate.latitude, coordinate.longitude]} eventHandlers={{ click: handleOpenInfoDrawer }} />
            ))}
        </MapContainer>
    )
}

export default MapKerawanan;