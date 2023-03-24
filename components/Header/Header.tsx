import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import {
    MagnifyingGlassIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon, 
    PaperAirplaneIcon,
    Bars3Icon
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { modalState } from '../../atoms/modalAtom';

function Header() {

    const router = useRouter()
    const { data: session } = useSession();
    const [ open, setOpen ] = useRecoilState(modalState); 
    
    const handleSignIn = () => {
        signIn()
    }

    const handleSignOut = () => {
        signOut()
    }

    return(
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
            {/* Left */}
                <div onClick={() => router.push('/')} className='relative hidden lg:inline-grid w-24 cursor-pointer'>
                    <Image width={300} height={24} alt='logo' src='https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration-958x575.png' />
                </div>
                <div onClick={() => router.push('/')} className='relative lg:hidden mt-6 w-10 flex-shrink-0 cursor-pointer'>
                    <Image width={24} height={24}  alt='logo' src='https://cdn-icons-png.flaticon.com/512/87/87390.png' />
                </div>
                {/* Center */}
                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <MagnifyingGlassIcon className='w-5 text-gray-500'/>
                        </div>
                        <input type='text' placeholder='Search' className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus: ring-black rounded-md'/>
                    </div>
                </div>
                {/* Right */}
                <div className='flex items-center justify-end space-x-4'>
                    <Bars3Icon onClick={() => router.push('/')} className='w-6 h-6 md:hidden cursor-pointer'/>
                    <HomeIcon className='navBtn'/>
                    {session ? (
                        <>
                            <div className='relative navBtn'>
                                <PaperAirplaneIcon className='navBtn -rotate-45'/>
                                <div className='absolute -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center animate-pulse text-white'>
                                    3
                                </div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn'/>
                            <UserGroupIcon className='navBtn' />
                            <HeartIcon className='navBtn' />
                            <img onClick={handleSignOut} className='h-10 w-10 rounded-full cursor-pointer' alt='profile pic' src={session.user?.image ? session.user.image :'https://static.vecteezy.com/system/resources/previews/009/397/892/large_2x/woman-face-expression-clipart-design-illustration-free-png.png'} />
                        </>
                    ) : <button onClick={handleSignIn}>Sign In</button>}
                </div>

            </div>
        </div> 
     
    )
}

export default Header;
