import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
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
import Button from '@/components/Button';
import { mergeClasses } from '@/helpers/className';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAccountContext } from '@/contexts/accountContext';
import { KSH_STATUS } from '@root/src/helpers/constants';

const iconEnum = {
    active: {
        map: MapIcon,
        case: CoronavirusIcon,
        hospital: ApartmentIcon,
        info: Newspaper,
        danger: DangerIcon,
    },
    inactive: {
        map: MapOutlinedIcon,
        case: CoronavirusOutlinedIcon,
        hospital: ApartmentOutlinedIcon,
        info: NewspaperOutlined,
        danger: DangerIconOutlined
    }
}

const menuList = [
    { section: 'Main Menu', menus: [
        // { icon: 'map', url: '/', label: 'Area Kerawanan Berdasarkan RW' },
        { icon: 'danger', url: '/incident-rate', label: 'Incident Rate' },
    ]}, 
    { section: 'Call Center', menus: [
        { icon: 'hospital', url: '/fasilitas-kesehatan-terdekat', label: 'Fasilitas Kesehatan Terdekat' },
    ]}, 
    { section: 'Informasi', menus: [
        { icon: 'info', url: '/informasi-seputar-dbd', label: 'Informasi Seputar DBD' },
    ]}, 
];

const SidebarContent = (props) => {
    const { handleRegisterKSH } = props;
    const { data: session } = useSession();
    const { kshStatus } = useAccountContext();
    const router = useRouter();

    const menuIsActive = (menuUrl) => router.pathname === menuUrl;
    const renderIcon = (iconIdentifier, options = {}) => {
        const isActive = options?.active;
        const Icon = isActive ? iconEnum.active[iconIdentifier] : iconEnum.inactive[iconIdentifier];
        return <Icon size='large'/>;
    }

    return (
        <>
            <div>
                <h1 className='mb-10 font-bold text-teal-600 text-xl text-center'>
                    Menur Radar
                </h1>
                {menuList.map((sectionMenu) => (
                    <div className='mb-5'>
                        <h3 className='font-bold text-md uppercase mb-1.5'>{sectionMenu.section}</h3>
                        <div>
                            {sectionMenu.menus.map((menu) => (
                                <Link href={menu.url}>
                                    <div className={`flex items-center py-[15px] px-4 rounded-xl gap-3 ${menuIsActive(menu.url) && 'text-teal-600 font-medium bg-gray-100'}`}>
                                        {renderIcon(menu.icon, { active: menuIsActive(menu.url) })}
                                        <div className='text-md'>{menu.label}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                { session && (
                    <div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Image
                                src={session.user.image}
                                width={45}
                                height={45}
                                className="rounded-full"
                            />
                            <div>
                                <span className='block text-md font-medium'>{session.user.name}</span>
                                <span className='block text-[13px] text-gray-400'>{session.user.email}</span>
                            </div>
                        </div>
                        {kshStatus === KSH_STATUS.NOT_REGISTERED && (
                            <Button className={mergeClasses(
                                '!bg-white border-2 border-red-500',
                                'hover:!bg-gray-100 hover:text-red-600',
                                '!text-red-600 text-md',
                                'mt-2 !p-2.5 '
                            )} onClick={handleRegisterKSH}>Daftar Sebagai KSH</Button>
                        )} 
                        <Button className={mergeClasses('!bg-red-500 hover:!bg-red-600', 'mt-1.5')} onClick={signOut}>Keluar Akun</Button>
                    </div>
                )}
            </div>
        </>
    )
}

export default SidebarContent