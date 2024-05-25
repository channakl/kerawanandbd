import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const MapFaskes = (props) => {
    const {
        extendClassname = false,
        overrideClassname = false,
        customClassname,
    } = props;

    return (
        <MapContainer zoom={14} center={[-7.289285399999994, 112.76611684538632]} scrollWheelZoom style={{ width: '100%', height: '100%', borderRadius: '.5rem'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* {faskesList.map((faskes) => (
                <Marker position={[faskes.latitude, faskes.longitude]}>
                   <Popup>
                    <div>
                        <h3 className='text-lg font-bold'>{faskes.name}</h3>
                        <p className='!mt-1'>{faskes.address}</p>
                        <a href={faskes.gmaps_url} target='_blank'>See on Google Maps</a>
                    </div>
                    </Popup>
               </Marker>
            ))} */}
        </MapContainer>
    )
}

export default MapFaskes;