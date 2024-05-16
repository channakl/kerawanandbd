import dynamic from 'next/dynamic';
import Layout from '@/modules/layout';

const Map = dynamic(() => import('@/modules/kerawanan/components/Map'), { ssr: false });
const NewMap = dynamic(() => import('@/components/NewMap'), { ssr: false });

const InformasiDbdPage = () => {
  const layoutProps = {
    useMobileEdge: true
  }
  return (
    <Layout {...layoutProps} >
        <div className='w-full h-screen absolute top-0 left-0 z-[1] md:pt-16'>
          <Map />
        </div>
    </Layout>
  )
}

export default InformasiDbdPage;