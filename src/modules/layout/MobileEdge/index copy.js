import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { mergeClasses } from '@/helpers/className';

const MobileEdge = (props) => {
    const { children } = props;
    const container = typeof window !== 'undefined' ? document.body : undefined; 

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <SwipeableDrawer
            container={container}
            anchor='bottom'
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            swipeAreaWidth={75}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true,
            }}
            id='custom-mobile-edge'
        >
            <div className={mergeClasses(
                'min-h-[70vh] p-8'
            )} />
        </SwipeableDrawer>
    );
};

export default MobileEdge