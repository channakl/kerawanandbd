import React, { useEffect } from 'react'
import { mergeClasses } from '@helpers/className';
import Layout from '@/modules/layout';
import Image from 'next/image';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';
import Link from 'next/link';
import { convertSecondsToFormattedDate } from '@/helpers/date';
import { Skeleton } from '@mui/material';

const InformasiDbd = () => {
    const propsLayout = {
        overflow: true,
        title: 'Informasi Seputar DBD'
    };

    const { data, loading } = useFetchingDocs({
        collection: 'blogs',
    });

    return (
        <Layout {...propsLayout}>
            <h1 className={mergeClasses(
                'text-3xl font-bold text-gray-800',
                'mb-4',
            )}>Informasi Seputar DBD</h1>

            <div class={mergeClasses(
                'sm:grid sm:grid-cols-2 sm:gap-3',
                'xl:grid-cols-3 xl:gap-4',
                '2xl:grid-cols-4'

            )}>
                {loading && [1, 2, 3, 4].map(() => (
                    // <div>
                    //     <Skeleton width="100%" variant="rectangular" className='pt-[50%]'/>
                    //     <div className='px-5'>
                    //     <Skeleton type="text" className="mt-5" width="30%" height={15}/>
                    //     <Skeleton type="text" height={30}/>
                    //     <div className="mt-2">
                    //         <Skeleton type="text" width="80%" height={20}/>
                    //         <Skeleton type="text" width="97%" height={20}/>
                    //         <Skeleton type="text" width="92%" height={20}/>
                    //     </div>
                    //     <div className="mt-2">
                    //         <Skeleton className="ml-auto" type="text" width="40%" height={20}/>
                    //     </div>
                    //     </div>
                    // </div>
                    <div>
                        <Skeleton width="100%" variant="rectangular" className='pt-[50%]'/>
                        <div className='px-5'>
                        <Skeleton type="text" className="mt-5" width="30%" height={15}/>
                        <Skeleton type="text" height={30}/>
                        <div className="mt-2">
                            <Skeleton type="text" width="80%" height={20}/>
                            <Skeleton type="text" width="97%" height={20}/>
                            <Skeleton type="text" width="92%" height={20}/>
                        </div>
                        <div className="mt-4">
                            <Skeleton className="ml-auto" type="text" width="35%" height={20}/>
                        </div>
                        </div>
                    </div>
                ))}
                {data && data.map((blog) => (
                    <div class="blog-card group mb-3 sm:mb-0 cursor-pointer col-span-1 bg-white border border-gray-200 rounded-lg drop-shadow-sm overflow-hidden">
                        <div className='relative w-full pt-[50%] overflow-hidden'>
                            <Image
                                src={blog?.image_src || '/img/placeholder.webp'}
                                width={400}
                                height={267}
                                class="absolute group-hover:scale-[1.05] duration-300 transition-transform top-0 left-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className='h-full p-6 pt-4 relative'>
                            <span className='mt-auto inline-block text-sm text-gray-400'>Dipublikasikan {convertSecondsToFormattedDate(blog?.published_date?.seconds)}</span>
                            <h2 class="text-xl text-gray-800 font-semibold leading-6">{blog.title}</h2>
                            <p class="mt-2 text-gray-800 text-md line-clamp-3">{blog.short_description}</p>
                            {blog?.url && (
                                <Link
                                    className="mt-4 inline-block w-full text-right text-md font-medium text-teal-600 hover:underline" 
                                    href={blog?.url}
                                    target='_blank'>
                                        Baca selengkapnya
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default InformasiDbd;