import { useEffect, useState, useRef } from 'react';
import { mergeClasses } from '@/helpers/className';
import { useDraggable, useSensors, useSensor, MouseSensor, TouchSensor, DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'

const MobileEdge = (props) => {
    const { children} = props;
    const [isDragging, setIsDragging] = useState(false);
    const [screenY, setScreenY] = useState('75vh');
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


    return (
            <div className={mergeClasses(
                'mobile-edge-overlay',
                'absolute left-0 top-0',
                'bg-[rgba(0,0,0,0.5)] w-screen h-screen'
            )}>
                <div style={{ height: '60vh' }} className={mergeClasses(
                    'fixed left-0 -bottom-10',
                    `bg-white w-full rounded-t-2xl`
                )}>
                        <div    
                            ref={pullerRef}
                            className={mergeClasses(
                                'mobile-edge-puller',
                                'flex justify-center',
                                'w-full py-3'
                            )}
                            onMouseDown={dragStart}
                        >
                            <div className={mergeClasses(
                                'mobile-edge-pull-icon',
                                'bg-gray-300 w-16 h-2 rounded-lg'
                            )}/>
                        </div>
                </div>
            </div>
    );
};

export default MobileEdge