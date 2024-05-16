import { mergeClasses } from "@/helpers/className";
import AccountIcon from '@mui/icons-material/AccountCircle';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";

const Headers = (props) => {
    const { data: session } = useSession();
    if (session) {
        console.log(session)
    }
    return (
        <header className={mergeClasses(
            'fixed top-0 z-50',
            'w-screen h-16 py-4 px-8',
            'bg-white shadow-sm',
            'flex justify-end items-center',
            'hidden md:flex'
        )}>
            <div
                className={mergeClasses(
                    'flex items-center gap-2',
                    'cursor-pointer'
                )}
                onClick={session ? signOut : signIn}
            >
                { session ? (
                    <>
                        <span>Hi, {session.user.name}!</span>
                        <Image
                            src={session.user.image}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </>
                ) : (
                    <>
                        <span>Login</span>
                        <AccountIcon fontSize='large' className='text-gray-400'/>
                    </>
                )}
            </div>
        </header>
    )
};

export default Headers;