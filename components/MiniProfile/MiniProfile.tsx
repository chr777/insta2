import { signOut, useSession } from 'next-auth/react';

function MiniProfile() {

    const { data: session } = useSession();

    return ( 
        <div className="flex items-center justify-between mt-14 ml-10">
           <img className="rounded-full w-16 h-16 border p-[2px]"
                alt='profile pic'
                src={session?.user?.image ? session.user.image :'https://static.vecteezy.com/system/resources/previews/009/397/892/large_2x/woman-face-expression-clipart-design-illustration-free-png.png'}
            />
            <div className="flex-1 mx-4">
                <h2 className="font-bold">{session?.user?.username}</h2>
                <h3 className="text-sm  text-gray-400">Welcome to Instagram</h3>
            </div> 
            <button onClick={() => signOut()} className="text-blue-400 text-sm font-semibold">Sign Out</button>
        </div>
     );
}

export default MiniProfile;