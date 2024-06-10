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
            'relative w-screen h-screen overflow-hidden',
            'flex items-center justify-center',
            'bg-gray-200 ',
            // 'bg-gradient-to-r from-gray-200 to-neutral-200'
            'after:content-[""] after:bg-[url("/img/login-background.png")] after:absolute after:w-screen after:h-screen after:z-[1] after:blur-[3px]'
        )}>
                {/* <svg className="absolute w-[600px] top-0 right-0 -translate-y-1/4 translate-x-1/3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#00897b88" d="M40.5,-47.3C47.6,-33.3,45.3,-16.7,44.4,-0.9C43.6,15,44.2,29.9,37.1,39.6C29.9,49.2,15,53.6,2.6,51C-9.7,48.3,-19.4,38.7,-33.8,29.1C-48.1,19.4,-67.1,9.7,-72.8,-5.7C-78.4,-21.1,-70.8,-42.1,-56.5,-56.1C-42.1,-70,-21.1,-76.9,-2.2,-74.7C16.7,-72.5,33.3,-61.2,40.5,-47.3Z" transform="translate(100 100)" />
                </svg>
                <svg className="absolute w-[400px] bottom-0 right-0 translate-y-1/2 -rotate-[30deg]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F1C21Bbb" d="M28.7,-44.8C39.1,-32,50.6,-26.1,59.3,-15.4C68,-4.8,73.9,10.6,68.2,20.3C62.5,30.1,45.2,34.2,31.9,45.7C18.6,57.2,9.3,76.1,0,76.1C-9.3,76.1,-18.6,57.3,-30.3,45.3C-42,33.2,-56,28,-63.5,17.6C-71,7.3,-72,-8.2,-69.4,-24.5C-66.9,-40.9,-60.7,-58,-48.6,-70.2C-36.4,-82.4,-18.2,-89.6,-4.5,-83.4C9.2,-77.2,18.3,-57.5,28.7,-44.8Z" transform="translate(100 100)" />
                </svg>
                <svg className="absolute w-[1400px] top-0 left-0 -translate-x-[55%]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#d8431566" d="M59.9,0C59.9,30.9,30,61.7,2.1,61.7C-25.8,61.7,-51.5,30.9,-51.5,0C-51.5,-30.8,-25.8,-61.6,2.1,-61.6C30,-61.6,59.9,-30.8,59.9,0Z" transform="translate(100 100)" />
                </svg> */}
            <div className={mergeClasses(
                'relative !z-[10]',
                'w-[640px] max-w-[85vw] py-20 md:py-24 px-8 md:px-20',
                'flex flex-col justify-center items-center',
                'h-fit bg-white rounded-xl md:rounded-3xl',
                // 'border border-gray-100'
                // 'before:content-[""] before:absolute before:z-0 before:shadow-xl before:rounded-3xl before:w-full before:h-full before:bg-teal-600 before:rotate-6'
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
    )
}


export default Login;
