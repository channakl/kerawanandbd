import { Marker, Popup } from 'react-leaflet'

const MapMarker = (props) => {
    const { position, children } = props;
    return (
        <Marker position={position}>
            <Popup>{children}</Popup>
        </Marker>
    )
};

export default MapMarker;