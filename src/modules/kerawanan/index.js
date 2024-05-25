import dynamic from 'next/dynamic';
import Layout from '@/modules/layout';
import rwGeoJson from '@/components/Map/geojson/rw.json';
import { VULNERABILITY_LEVELS } from '@/modules/kerawanan/helpers/constants';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const InformasiDbdPage = () => {
  const layoutProps = {
    useMobileEdge: true
  }

  const geoJsonStyle = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    const vulnerabilityLevelKeys = Object.keys(VULNERABILITY_LEVELS)
    const vulnerabilityLevelColors = vulnerabilityLevelKeys.map((key) => VULNERABILITY_LEVELS[key].COLOR);
    const color = vulnerabilityLevelColors[randomIndex];
    return {
        fillColor: color,
        color: '#444',
        weight: 2
    };
};
  return (
    <Layout {...layoutProps} >
        <div className='w-full h-screen absolute top-0 left-0 z-[1]'>
            <Map 
                geoJson={rwGeoJson}
                geoJsonStyle={geoJsonStyle}
            />
        </div>
    </Layout>
  )
}

export default InformasiDbdPage;