import React, { createContext, useEffect, useState } from 'react'
import Sidebar from '@/modules/layout/Sidebar';
import MobileEdge from '@/modules/layout/MobileEdge';
import Header from '@/modules/layout/Header'
import NotificationBar from '@/modules/layout/NotificationBar';
import Loader from '@/modules/layout/Loader';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Layout = (props) => {
    const { children, title = "Aplikasi Pemetaan Kerawanan DBD", useMobileEdge, mobileEdgeContent } = props;
    
    return (
        <div>
            <div className='relative flex w-screen overflow-hidden'>
                <Head>
                    <title>{title}</title>
                </Head>
                <Sidebar />
                <main className='relative w-full h-screen bg-gray-100 p-10'>
                    {children}
                    <Loader global />
                </main>
                {/* { useMobileEdge && <MobileEdge content={mobileEdgeContent} />} */}
                <NotificationBar />
            </div>
        </div>
    );
}

export default Layout;