import React from 'react'
import { mergeClasses } from '@helpers/className';

const InformasiDbdPage = () => {
    return (
        <div>
            <h1 className={mergeClasses(
                'text-3xl font-medium text-gray-700',
                'mb-4',
            )}>Area Kerawanan Berdasarkan Kasus</h1>
        </div>
    )
}

export default InformasiDbdPage;