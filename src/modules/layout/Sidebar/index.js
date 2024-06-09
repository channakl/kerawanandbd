import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MapIcon from '@mui/icons-material/Map';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import DangerIcon from '@mui/icons-material/NearbyError';
import Newspaper from '@mui/icons-material/Newspaper';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import DangerIconOutlined from '@mui/icons-material/NearbyErrorOutlined';
import NewspaperOutlined from '@mui/icons-material/NewspaperOutlined';
import SidebarMobile from '@modules/layout/Sidebar/mobile';
import Button from '@/components/Button';
import { mergeClasses } from '@/helpers/className';
import Image from 'next/image';
import SidebarContent from './content';

const Sidebar = () => {
    return (
        <>
            <SidebarMobile />
            <nav className='hidden md:flex h-screen bg-white w-[390px] max-w-[33vw] pt-10 pb-4 px-4 text-gray-500 border-gray-200 border z-50 flex-col justify-between'>
               <SidebarContent /> 
            </nav>
        </>
    )
}

export default Sidebar;