import dynamic from 'next/dynamic';
import Layout from '@/modules/layout';
import { dataKerawanan } from '@/modules/incidentrate/helpers/dummyData';
import { useState } from 'react';
import DrawerInfo from '@/modules/incidentrate/components/InfoDrawer';
import rwGeoJson from '@/components/Map/geojson/rw.json';
import { VULNERABILITY_LEVELS } from '@/modules/incidentrate/helpers/constants';
import { coordinates } from '@/modules/incidentrate/helpers/dummyData';
// import { Marker } from 'react-leaflet';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const InformasiDbdPage = () => {
  const [sideInfoOpen, setSideInfoOpen] = useState(false);
  const layoutProps = {
    useMobileEdge: true
  }

  const handleOpenInfoDrawer = () => {
    setSideInfoOpen(true);
  };
  const handleCloseInfoDrawer = () => {
    setSideInfoOpen(false);
  };

  const geoJsonStyle = (feature) => {
    const randomIndex = Math.floor(Math.random() * 3);
    const vulnerabilityLevelKeys = Object.keys(VULNERABILITY_LEVELS)
    const vulnerabilityLevelColors = vulnerabilityLevelKeys.map((key) => VULNERABILITY_LEVELS[key].COLOR);
    const color = vulnerabilityLevelColors[randomIndex];
    return {
        fillColor: color,
        color: '#FFF',
        weight: 1,
        fillOpacity: 0.55,
    };
  };

  const onEachGeoJsonFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#FFF',
          fillOpacity: 0.9,
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          color: '#FFF',
          weight: 1,
          fillOpacity: 0.55,
        });
      },
      click: handleOpenInfoDrawer,
    });
  }
 

  return (
    <Layout {...layoutProps} >
        <div className='w-full h-screen absolute top-0 left-0 z-[1]'>
        <Map 
            geoJson={rwGeoJson}
            geoJsonStyle={geoJsonStyle}
            onEachGeoJsonFeature={onEachGeoJsonFeature}
        />
        </div>
        <DrawerInfo open={sideInfoOpen} handleClose={handleCloseInfoDrawer} data={dataKerawanan} />
    </Layout>
  )
}

export default InformasiDbdPage;