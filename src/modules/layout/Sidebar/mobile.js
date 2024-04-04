import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mergeClasses } from '@/helpers/className';
import BurgerMenuIcon from '@mui/icons-material/Menu';
import ArrowCloseIcon from '@mui/icons-material/NavigateBefore';


const SidebarMobile = (props) => {
    const { menuList, iconEnum } = props;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const handleOpenBurgerMenu = () => setOpen(true);
    const handleCloseBurgerMenu = () => setOpen(false);

    const menuIsActive = (menuUrl) => router.pathname === menuUrl;
    const renderIcon = (iconIdentifier, options = {}) => {
        const isActive = options?.active;
        const Icon = isActive ? iconEnum.active[iconIdentifier] : iconEnum.inactive[iconIdentifier];
        return <Icon size='large'/>;
    }

    return (
        <div className={mergeClasses(
            'md:hidden',
            'absolute left-0 top-0'
        )}>
            <div
                className={mergeClasses(
                    'relative left-5 top-5 z-10',
                    'bg-white rounded-full shadow-md pointer',
                    'p-3',
                )}
                onClick={handleOpenBurgerMenu}
            >
                <BurgerMenuIcon />
            </div>

            <nav className={mergeClasses(
                'absolute top-0 z-20',
                'bg-white border-gray-200 border-[1px] drop-shadow-md',
                'w-[90vw] h-screen pt-6 pb-10 px-6',
                'text-gray-500',
                `${!open && '-translate-x-[100%] drop-shadow-none'} transition-transform !duration-500`
            )}>
                <div
                    className={mergeClasses(
                        'absolute right-0 translate-x-1/2',
                        'bg-white rounded-full drop-shadow pointer',
                        'p-2',
                        `${!open && 'opacity-0'}`
                    )}
                    onClick={handleCloseBurgerMenu}
                >
                    <ArrowCloseIcon size='large'/>
                </div>
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