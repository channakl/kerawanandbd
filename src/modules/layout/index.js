import React, { createContext, useEffect, useState } from 'react'
import Sidebar from '@/modules/layout/Sidebar';
import MobileEdge from '@/modules/layout/MobileEdge';
import Header from '@/modules/layout/Header'
import NotificationBar from '@/modules/layout/NotificationBar';
import Loader from '@/modules/layout/Loader';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { mergeClasses } from '@/helpers/className';

const Layout = (props) => {
    const { children, title = "Aplikasi Pemetaan Kerawanan DBD", useMobileEdge, mobileEdgeContent, overflow = false } = props;
    
    return (
        <div>
            <div className='relative flex w-screen overflow-hidden'>
                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon.svg" sizes="any" />
                </Head>
                <Sidebar />
                <main className={mergeClasses(
                    'relative w-full h-screen bg-gray-100 p-10',
                    overflow && 'overflow-auto'
                )}>
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