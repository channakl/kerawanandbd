import dynamic from 'next/dynamic';
import Layout from '@/modules/layout';
import { mergeClasses } from '@/helpers/className';
import DataVisualizationBox from '@/components/DataVisualizationBox';
import { dataKerawanan } from '@/modules/kerawanan/helpers/dummyData';
import { useState } from 'react';
import DrawerInfo from '@/modules/kerawanan/components/InfoDrawer';
// import PieChart from '@/modules/kerawanan/components/PieChart';
const Map = dynamic(() => import('@/modules/kerawanan/components/Map'), { ssr: false });
const PieChart = dynamic(() => import('@/modules/kerawanan/components/PieChart'), { ssr: false });

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

  return (
    <Layout {...layoutProps} >
        <div className='w-full h-screen absolute top-0 left-0 z-[1]'>
          <Map handleOpenInfoDrawer={handleOpenInfoDrawer} />
        </div>
        <DrawerInfo open={sideInfoOpen} handleClose={handleCloseInfoDrawer} data={dataKerawanan} />
    </Layout>
  )
}

export default InformasiDbdPage;