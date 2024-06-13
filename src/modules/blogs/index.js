import React, { useEffect } from 'react'
import { mergeClasses } from '@helpers/className';
import Layout from '@/modules/layout';
import Image from 'next/image';
import { useFetchingDocs } from '@/hooks/useFetchingDocs';
import Link from 'next/link';
import { convertSecondsToFormattedDate } from '@/helpers/date';

const InformasiDbd = () => {
    const propsLayout = {
        overflow: true,
        title: 'Informasi Seputar DBD'
    };

    const { data, loading } = useFetchingDocs({
        collection: 'blogs',
    });

    useEffect(() => {
        window.setLoaderVisibility(loading);
    }, [loading]);

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