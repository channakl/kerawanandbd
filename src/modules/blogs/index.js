import React from 'react'
import { mergeClasses } from '@helpers/className';
import Layout from '@/modules/layout';
import Image from 'next/image';

const dummy_articles = [
    { title: 'Demam Berdarah', description: 'Setiap tahun di Indonesia, terutama pada pergantian musim, penyakit-penyakit yang disebabkan virus dengue mewabah.', published_date: '11 Juni 2024', img_src: '/img/blog-thumbnail.jpeg'},
    { title: 'Kenali Tanda-Tanda Awal DBD', description: 'Tanda-tanda awal demam berdarah seringkali mirip dengan gejala penyakit lain, seperti flu biasa. Namun, ketika gejala ini muncul pada seseorang yang tinggal atau bepergian ke daerah endemis, perlu dicurigai adanya demam berdarah.', published_date: '11 Juni 2024', img_src: '/img/blog-thumbnail-2.png'},
    { title: 'Hal-Hal yang Dapat Dilakukan Untuk Mengobati DBD', description: 'Cara terbaik untuk mencegah penyakit demam berdarah adalah dengan mencegah gigitan nyamuk yang terinfeksi, terutama jika kamu tinggal atau', published_date: '11 Juni 2024', img_src: '/img/blog-thumbnail-3.png'},
];

const InformasiDbd = () => {
    const propsLayout = {
        overflow: true,
        title: 'Informasi Seputar DBD'
    };

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
                {dummy_articles.map((article) => (
                    <div class="blog-card group mb-3 sm:mb-0 cursor-pointer col-span-1 bg-white border border-gray-200 rounded-md drop-shadow-sm overflow-hidden">
                        <div className='relative w-full pt-[50%] overflow-hidden'>
                            <Image
                                src={article.img_src}
                                width={400}
                                height={267}
                                class="absolute group-hover:scale-[1.05] duration-300 transition-transform top-0 left-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className='h-full p-6 pt-4 relative'>
                            <span className='mt-auto inline-block text-sm text-gray-400'>Dipublikasikan {article.published_date}</span>
                            <h2 class="text-xl text-gray-800 font-semibold leading-6">{article.title}</h2>
                            <p class="mt-2 text-gray-800 text-md line-clamp-3">{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default InformasiDbd;