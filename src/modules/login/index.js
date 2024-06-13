import Button from "@/components/Button";
import { mergeClasses } from "@/helpers/className";
import { FACEBOOK, GOOGLE } from '@/modules/login/helpers/constants';
import { signIn } from 'next-auth/react';
import Image from "next/image";
import Head from "next/head";

const enumSocialLogin = {
    [GOOGLE]: {
        label: `Masuk dengan ${GOOGLE}`,
        logoUrl: 'https://developers.google.com/identity/images/g-logo.png',
        action: () => signIn(GOOGLE, { prompt: 'select_account' })
    },
    [FACEBOOK]: {
        label: `Masuk dengan ${FACEBOOK}`,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
        action: () => signIn(FACEBOOK)
    },
};

const Login = (props) => {
    return (
        <>
            <Head>
                <title>Aplikasi Pemetaan Kerawanan DBD</title>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </Head>
            <main className={mergeClasses(
                'relative w-screen h-screen overflow-hidden',
                'flex items-center justify-center',
                'bg-gray-200 ',
                'after:content-[""] after:bg-[url("/img/login-background.webp")] after:absolute after:w-screen after:h-screen after:z-[1] after:blur-[3px]'
            )}>
                <div className={mergeClasses(
                    'relative !z-[10]',
                    'w-[640px] max-w-[85vw] py-20 md:py-24 px-8 md:px-20',
                    'flex flex-col justify-center items-center',
                    'h-fit bg-white rounded-xl md:rounded-3xl',
                )}>
                    <div className={mergeClasses(
                        'absolute !-z-[5] w-full h-full rounded-xl md:rounded-3xl shadow-lg',
                        'bg-white'
                    )}/>
                    <div className={mergeClasses(
                        'absolute !-z-[10] w-full h-full rounded-xl md:rounded-3xl shadow-2xl',
                        'bg-teal-700 -rotate-[8deg]'
                    )}/>
                    <div className="mb-4">
                        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-700 mb-1 text-shadow">Selamat Datang!</h1>
                        <p className="text-center text-md text-gray-400 text-shadow">Silahkan masuk terlebih dahulu untuk dapat mengakses fitur-fitur yang tersedia di aplikasi kami</p>
                    </div>
                    <div className="w-full">
                        {Object.keys(enumSocialLogin).map((key) => (
                            <Button
                                key={key}
                                className={mergeClasses(
                                    'w-full mt-2',
                                    'bg-white border border-gray-300',
                                    '!rounded-3xl',
                                    '!text-gray-600 capitalize',
                                    'hover:bg-white'
                                )}
                                onClick={enumSocialLogin[key].action}
                            >
                                <span className="flex justify-center items-center gap-2 !text-md">
                                    <Image
                                        src={enumSocialLogin[key].logoUrl}
                                        width={20}
                                        height={20}
                                        alt={`${key} logo`}
                                    />
                                    {enumSocialLogin[key].label}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}


export default Login;
