import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MapIcon from '@mui/icons-material/Map';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import SidebarMobile from '@modules/layout/Sidebar/mobile';

const iconEnum = {
    active: {
        map: MapIcon,
        case: CoronavirusIcon,
        hospital: ApartmentIcon,
        info: LocalPhoneIcon
    },
    inactive: {
        map: MapOutlinedIcon,
        case: CoronavirusOutlinedIcon,
        hospital: ApartmentOutlinedIcon,
        info: LocalPhoneOutlinedIcon
    }
}

const menuList = [
    { section: 'Main Menu', menus: [
        { icon: 'map', url: '/', label: 'Area kerawanan berdasarkan RW' },
        { icon: 'case', url: '/area-kerawanan-berdasarkan-kasus', label: 'Area kerawanan berdasarkan kasus' },
    ]}, 
    { section: 'Call Center', menus: [
        { icon: 'hospital', url: '/fasilitas-kesehatan-terdekat', label: 'Fasilitas kesehatan terdekat' },
    ]}, 
    { section: 'Informasi', menus: [
        { icon: 'info', url: '/informasi-seputar-dbd', label: 'Informasi seputar DBD' },
    ]}, 
];



const Sidebar = () => {
    const router = useRouter();
    const menuIsActive = (menuUrl) => router.pathname === menuUrl;
    const renderIcon = (iconIdentifier, options = {}) => {
        const isActive = options?.active;
        const Icon = isActive ? iconEnum.active[iconIdentifier] : iconEnum.inactive[iconIdentifier];
        return <Icon size='large'/>;
    }

    return (
        <>
            <SidebarMobile menuList={menuList} iconEnum={iconEnum} />
            <nav className='hidden md:block h-screen bg-white w-[400px] max-w-[33vw] py-10 px-6 text-gray-500 border-gray-200 border-[1px] drop-shadow-md'>
                <h1 className='mb-10 font-extrabold uppercase text-teal-600 text-2xl text-center mb-16'>ANTI-DENGUE APP</h1>
                {menuList.map((sectionMenu) => (
                    <div className='mb-8'>
                        <h3 className='font-bold text-md uppercase mb-2'>{sectionMenu.section}</h3>
                        <div>
                            {sectionMenu.menus.map((menu) => (
                                <Link href={menu.url}>
                                    <div className={`flex items-center py-[15px] px-4 rounded-xl gap-3 ${menuIsActive(menu.url) && 'text-white  font-semibold bg-teal-400'}`}>
                                        {renderIcon(menu.icon, { active: menuIsActive(menu.url) })}
                                        <div className='text-[15px]'>{menu.label}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </>
    )
}

export default Sidebar;