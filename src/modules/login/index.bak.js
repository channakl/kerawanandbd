import Button from "@/components/Button";
import { mergeClasses } from "@/helpers/className";
import { FACEBOOK, GOOGLE } from '@/modules/login/helpers/constants';
import { signIn, getSession } from 'next-auth/react';
import Image from "next/image";

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
        <main className={mergeClasses(
            'w-screen h-screen overflow-hidden',
            'flex items-center justify-center',
            'bg-cover bg-left bg-[url("/img/login-background.jpg")] sm:bg-teal-500',
        )}>
            <div className={mergeClasses(
                'sm:w-1/2 lg:w-[60%] py-10 px-40',
                'hidden sm:flex flex-col justify-center items-center',
            )}>
                {/* <p className="text-center text-xl text-white">Selamat datang di Aplikasi Pemetaan Kerawanan DBD kami. Akses informasi penting seputar tingkat kerawanan DBD di setiap RW, temukan lokasi fasilitas kesehatan terdekat, dan dapatkan berbagai informasi terkini untuk menjaga kesehatan Anda. Silakan masuk untuk mengakses fitur-fitur kami.</p> */}
            </div>
            <div className={mergeClasses(
                'relative',
                'sm:w-1/2 lg:w-[40%] py-10 px-10 lg:px-12 xl:px-20 2xl:px-32',
                'flex flex-col justify-center items-center',
                'h-fit w-[80vw] bg-white bg-opacity-20 sm:bg-opacity-100 backdrop-blur-lg sm:backdrop-blur-none rounded-xl sm:rounded-none shadow-lg sm:h-full',
            )}>
                <div className="mb-4">
                    <h1 className="text-center text-4xl sm:text-5xl font-medium text-white sm:text-gray-700 mb-1 text-shadow">Selamat Datang!</h1>
                    <p className="text-center text-md text-white text-shadow sm:text-gray-400">Silahkan masuk terlebih dahulu untuk dapat mengakses fitur-fitur yang tersedia di aplikasi kami</p>
                    {/* <p className="text-center text-md text-gray-400">Selamat datang di Aplikasi Pemetaan Kerawanan DBD kami. Akses informasi penting seputar tingkat kerawanan DBD di setiap RW, temukan lokasi fasilitas kesehatan terdekat, dan dapatkan berbagai informasi terkini untuk menjaga kesehatan Anda. Silakan masuk untuk mengakses fitur-fitur kami.</p> */}
                </div>
                <div className="w-full">
                    {Object.keys(enumSocialLogin).map((key) => (
                        <Button
                            key={key}
                            className={mergeClasses(
                                'w-full mt-2',
                                'bg-white sm:border-2 sm:border-gray-300 sm:drop-shadow',
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
    )
}


export default Login;
