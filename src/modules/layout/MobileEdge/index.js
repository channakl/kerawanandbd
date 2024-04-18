import { useEffect, useState, useRef } from 'react';
import { mergeClasses } from '@/helpers/className';
import { useDraggable, useSensors, useSensor, MouseSensor, TouchSensor, DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'

const MobileEdge = (props) => {
    const { title, content} = props;
    const [isDragging, setIsDragging] = useState(false);
    const DEFAULT_HEIGHT = '80px';
    const [height, sethHeight] = useState(DEFAULT_HEIGHT);
    const [open, setOpen] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition} = useDraggable({
        id: 'mobile-edge-puller',
    });
    const pullerRef = useRef();

    
    const dragStart = () => {
        setIsDragging(true);
        console.log(pullerRef.current.offsetHeight)
    };
    const dragging = (e) => {
        if (isDragging) {
            // setScreenY(`${e.pageY}vh`);
        }
    }
    const dragStop = () => {
        setIsDragging(false);
    }

    useEffect(() => {
        document.addEventListener('mousemove', dragging);
        document.addEventListener('mouseup', dragStop);
    }, []);

    const toggleOpen = () => setOpen(!open);

    useEffect(() => {
        const newHeight = open ? '85vh' : DEFAULT_HEIGHT;
        sethHeight(newHeight);
    }, [open]);


    return (
            <div style={{ background: open ? 'rgba(0,0,0,0.5)' : 'none', pointerEvents: open ? 'auto' : 'none' }} className={mergeClasses(
                'mobile-edge-overlay',
                'absolute left-0 top-0 z-50',
                'w-screen h-screen block md:hidden',
                'transition-all ease-in',
                'pointer-events-none'
            )}
                onClick={() => {
                    if (open) setOpen(false);
                }}
            >
                <div style={{ height }} className={mergeClasses(
                    'fixed left-0 -bottom-10',
                    `bg-white w-full rounded-t-2xl`,
                    'transition-all ease-in',
                    'pointer-events-auto'
                )}>
                    <div    
                        ref={pullerRef}
                        className={mergeClasses(
                            'mobile-edge-puller',
                            'flex justify-center',
                            'w-full py-3'
                        )}
                        // onMouseDown={dragStart}
                        onClick={toggleOpen}
                    >
                        <div className={mergeClasses(
                            'mobile-edge-pull-icon',
                            'bg-gray-300 w-16 h-2 rounded-lg'
                        )}/>
                    </div>
                    <div className={mergeClasses('h-[calc(85vh_-_72px)] p-4 overflow-auto')}>{content}</div>
                </div>
            </div>
    );
};

export default MobileEdge