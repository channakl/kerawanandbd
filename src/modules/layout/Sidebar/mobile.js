import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mergeClasses } from '@/helpers/className';
import BurgerMenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCloseIcon from '@mui/icons-material/NavigateBefore';


const SidebarMobile = (props) => {
    const { menuList, iconEnum } = props;
    const router = useRouter();

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
                'w-[calc(100vw_-_44px_-_32px)] h-screen pt-6 pb-10 px-6',
                'text-gray-500',
                `${!open && '-translate-x-[100%] drop-shadow-none'} transition-transform !duration-500`
            )}>
                <h1 className={mergeClasses(
                    'font-extrabold uppercase text-teal-600 text-xl text-center',
                    'mb-10'
                )}>ANTI-DENGUE APP</h1>
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
        </div>
  )
}

export default SidebarMobile;