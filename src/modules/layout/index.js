import React, { createContext } from 'react'
import Sidebar from '@/modules/layout/Sidebar';
import MobileEdge from '@/modules/layout/MobileEdge';
import Header from '@/modules/layout/Header'

const Layout = (props) => {
    const { children, useMobileEdge, mobileEdgeContent } = props;
    return (
        <div className='relative flex w-screen overflow-hidden'>
            {/* <Header /> */}
            <Sidebar />
            <main className='relative w-full h-screen bg-gray-100 p-10'>{children}</main>
            {/* { useMobileEdge && <MobileEdge content={mobileEdgeContent} />} */}
        </div>
    );
}

export default Layout;