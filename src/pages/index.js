import dynamic from 'next/dynamic';
import { mergeClasses } from '@helpers/className';
// import MobileEdge from '@/modules/layout/MobileEdge';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const InformasiDbdPage = () => {
  const [screenY, setScreenY] = useState(900);
  const handleDragMove = (event) => {
      setScreenY(event.activatorEvent.screenY)
  }
    return (
      <DndContext onDragMove={handleDragMove}>
        {/* <MobileEdge screenY={screenY}/> */}
        <div className='hidden md:block'>
            <h1 className={mergeClasses(
                'text-3xl font-medium text-gray-700',
                'mb-10',
            )}>Area Kerawanan Berdasarkan RW</h1>
            <div className='flex w-full gap-4 mb-4'>
              <div className='bg-white flex-1 p-5 rounded-lg'>
                <div className='text-md text-gray-500'>RW 1</div>
                <div className='mt-4 text-3xl text-gray-600 font-bold'>143 Kasus</div>
                <div className='text-green-500 font-bold'>+12%</div>
              </div>
              <div className='bg-white flex-1 p-5 rounded-lg'>
                <div className='text-md text-gray-500'>RW 2</div>
                <div className='mt-4 text-3xl text-gray-600 font-bold'>143 Kasus</div>
                <div className='text-green-500 font-bold'>+12%</div>
              </div>
              <div className='bg-white flex-1 p-5 rounded-lg'>
                <div className='text-md text-gray-500'>RW 3</div>
                <div className='mt-4 text-3xl text-gray-600 font-bold'>143 Kasus</div>
                <div className='text-green-500 font-bold'>+12%</div>
              </div>
              <div className='bg-white flex-1 p-5 rounded-lg'>
                <div className='text-md text-gray-500'>RW 4</div>
                <div className='mt-4 text-3xl text-gray-600 font-bold'>143 Kasus</div>
                <div className='text-green-500 font-bold'>+12%</div>
              </div>
            </div>
            <div className='w-full h-[70vh] bg-white border-white border-[6px] rounded-lg'>
              <Map />
            </div>
        </div>
      </DndContext>
    )
}

export default InformasiDbdPage;