import React, { useState } from 'react'
import Sidebar from '@/modules/layout/Sidebar';

const Layout = ({ children }) => {

    return (
        <div className='flex w-full'>
            <Sidebar/>
            <main className='w-full h-screen bg-gray-100 p-10'>{children}</main>
        </div>
    );
}

export default Layout;