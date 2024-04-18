import React from 'react'
import { mergeClasses } from '@helpers/className';
import Layout from '@/modules/layout';

const InformasiDbdPage = () => {
    return (
        <Layout>
            <h1 className={mergeClasses(
                'text-3xl font-medium text-gray-700',
                'mb-4',
            )}>Informasi Seputar DBD</h1>
        </Layout>
    )
}

export default InformasiDbdPage;