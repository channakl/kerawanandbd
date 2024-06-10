import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { getLocalStorage, setLocalStorage } from '@/helpers/localstorage';

const { BaseLayer } = LayersControl;

const LayerChangeHandler = () => {
    useMapEvents({
        baselayerchange: (event) => {
            setLocalStorage('tile', event.name)
        }
    });
    return null;
};

const Map = (props) => {
    const {
        children, geoJson, geoJsonStyle,
        onFeatureClick, onFeatureMouseOver, onFeatureMouseOut, onFeatureTouchStart
    } = props;
    const selectedTile = getLocalStorage('tile') || 'Default';
    const [controlPosition, setControlPosition] = useState({
        tileLayer: 'topright',
        zoom: 'topleft'
    });

    const handleFeatureEvent = (feature, layer) => {
        layer.on({
            click: onFeatureClick,
            mouseout: onFeatureMouseOut,
            mouseover: onFeatureMouseOver,
            touchstart: onFeatureTouchStart,
        });
    };

    useEffect(() => {
        const updateControlPosition = () => {
            if (window.innerWidth < 768) {
                setControlPosition({
                    tileLayer: 'bottomright',
                    zoom: 'bottomright'
                });
            } else {
                setControlPosition({
                    tileLayer: 'topright',
                    zoom: 'topleft'
                });
            }
        };

        updateControlPosition();
        window.addEventListener('resize', updateControlPosition);

        return () => {
            window.removeEventListener('resize', updateControlPosition);
        };
    }, []);

    return (
        <MapContainer
            zoom={15}
            zoomControl={false}
            scrollWheelZoom
            center={[-7.293554425432647, 112.76751232951082]}
            style={{ width: '100%', height: '100%', borderRadius: '.5rem' }}
        >
            <ZoomControl position={controlPosition.zoom} />
            <LayerChangeHandler />
            <LayersControl position={controlPosition.tileLayer}>
                <BaseLayer checked={selectedTile === 'Default'} name="Default">
                    <TileLayer
                        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIAMAPS_API_KEY}`}
                    />
                </BaseLayer>
                <BaseLayer checked={selectedTile === 'Satellite'} name="Satellite">
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    />
                </BaseLayer>
            </LayersControl>
            {geoJson && <GeoJSON data={geoJson} style={geoJsonStyle} onEachFeature={handleFeatureEvent} />}
            {children}
        </MapContainer>
    );
}

export default Map;
