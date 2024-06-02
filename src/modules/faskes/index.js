import { mergeClasses } from '@helpers/className';
import Layout from '@/modules/layout';
import dynamic from 'next/dynamic';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';
import { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// import "leaflet-defaulticon-compatibility";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
const MapMarker = dynamic(() => import('@/components/MapMarker'), { ssr: false });

const Faskes = () => {
    const { data: faskesList, loading, error } = useFetchingDocs({
        collection: 'faskes'
    });
    useEffect(() => {
        // if (loading) {
        //     window.setLoaderVisibility(true);
        // } else {
        //     window.setLoaderVisibility(false);
        // }
    }, [loading]);

    useEffect(() => {
        if (error) {
            window.showNotification({
                message: error,
                type: 'error',
                duration: 5000,
            })
        }
    }, [error]);

    return (
        <Layout>
            <div className='w-full h-screen absolute top-0 left-0 z-[1]'>
                <Map>
                    {faskesList && faskesList.map((faskes) => (
                        <MapMarker position={[faskes.location._lat, faskes.location._long]}>
                            <div>
                                <h3 className='text-lg font-bold'>{faskes?.name}</h3>
                                <p className='!mt-0'>{faskes?.address}</p>
                                {faskes?.gmaps_url && <a href={faskes.gmaps_url} target='_blank'>See on Google Maps</a> }
                            </div>
                        </MapMarker>
                    ))}
                </Map>
            </div>
        </Layout>   
    )
}

export default Faskes;