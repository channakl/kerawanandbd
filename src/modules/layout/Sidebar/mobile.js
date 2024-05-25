import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mergeClasses } from '@/helpers/className';
import BurgerMenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import Button from '@/components/Button';


const SidebarMobile = (props) => {
    const { menuList, iconEnum } = props;
    const router = useRouter();
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const toggleBurgerMenu = () => setOpen(!open);
    const menuIsActive = (menuUrl) => router.pathname === menuUrl;
    const renderIcon = (iconIdentifier, options = {}) => {
        const isActive = options?.active;
        const Icon = isActive ? iconEnum.active[iconIdentifier] : iconEnum.inactive[iconIdentifier];
        return <Icon size='large'/>;
    }


    return (
        <div className={mergeClasses(
            'w-full md:hidden',
            'absolute left-0 top-0'
        )}>
            <div
                className={mergeClasses(
                    'absolute right-4 top-4 z-10',
                    'bg-white rounded-full shadow-md pointer',
                    'flex items-center justify-center',
                    'w-11 h-11',
                )}
                onClick={toggleBurgerMenu}
            >
                {open ? <CloseIcon fontSize='small' /> : <BurgerMenuIcon fontSize='small' />} 
            </div>

            <nav className={mergeClasses(
                'absolute top-0 z-20',
                'bg-white border-gray-200 border-[1px] drop-shadow-md',
                'w-[calc(100vw_-_44px_-_32px)] h-screen py-6 px-6',
                'text-gray-500',
                'flex flex-col justify-between',
                `${!open && '-translate-x-[100%] drop-shadow-none'} transition-transform !duration-500`
            )}>
                <div>
                    <div>
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
                    </div>
                </div>
                { session ? (
                    <div>
                        <div className='flex items-center gap-2'>
                            <Image
                                src={session.user.image}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <span className='block text-md font-medium'>{session.user.name}</span>
                                <span className='block text-[13px] text-gray-400'>{session.user.email}</span>
                            </div>
                        </div>
                        <Button className={mergeClasses('!bg-red-500 hover:!bg-red-600', '!p-2.5', 'mt-4')} onClick={signOut}>Sign out</Button>
                    </div>
                ) : (
                    <div>
                        <p className='font-bold'>Sign in</p>
                        <p className='text-md font-medium text-gray-400 mb-3'>Experience the full features of this app by signing in</p>
                        <Button onClick={signIn}>Sign in</Button>
                    </div>
                )}
            </nav>
        </div>
  )
}

export default SidebarMobile;