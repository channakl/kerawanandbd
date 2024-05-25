import React from 'react'
import { mergeClasses } from '@helpers/className';
import Layout from '@/modules/layout';
import dynamic from 'next/dynamic';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';

const Map = dynamic(() => import('@/modules/faskes/components/Map'), { ssr: false });

const InformasiDbdPage = () => {
    const { data, loading, error } = useFetchingDocs('faskes');
    return (
        <Layout>
            <div className='w-full h-screen absolute top-0 left-0 z-[1] md:pt-16'>
                <Map />
            </div>
        </Layout>   
    )
}

export default InformasiDbdPage;