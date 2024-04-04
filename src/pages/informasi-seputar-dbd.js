import React from 'react'
import { mergeClasses } from '@helpers/className';

const InformasiDbdPage = () => {
    return (
        <div>
            <h1 className={mergeClasses(
                'text-3xl font-medium text-gray-700',
                'mb-4',
            )}>Informasi Seputar DBD</h1>
        </div>
    )
}

export default InformasiDbdPage;