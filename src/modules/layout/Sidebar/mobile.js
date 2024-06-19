import { useState } from 'react';
import { mergeClasses } from '@/helpers/className';
import BurgerMenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SidebarContent from './content';

const SidebarMobile = (props) => {
    const [open, setOpen] = useState(false);
    const toggleBurgerMenu = () => setOpen(!open);

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
                'w-[calc(100vw_-_44px_-_32px)] h-screen py-6 px-4',
                'text-gray-500',
                'flex flex-col justify-between',
                `${!open && '-translate-x-[100%] drop-shadow-none'} transition-transform !duration-500`
            )}>
                <SidebarContent/>
            </nav>
        </div>
  )
}

export default SidebarMobile;