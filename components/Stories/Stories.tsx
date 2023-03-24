import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { faker } from '@faker-js/faker';
import Story from "../Story";
import { IStory } from "../Story";

function Stories() {

    const [suggestions, setSuggetsions] = useState<IStory[] | null>(null);
    const { data: session } = useSession();

    useEffect(() =>{
        const suggestions = [...Array(20)].map(() => ({
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(), 
        }))

        setSuggetsions(suggestions)
    },[]);

    return (  
        <div className="flex space-x-2 p-6 bg-white mt-8
                        boder-gray-200 border rounded-sm overflow-x-scroll 
                        scrollbar-thin scrollbar-thumb-black">
            {session && <Story
                            userId={session.user?.uuid}
                            email={session.user?.email}
                            avatar={session.user?.image}
                            username={session.user?.username}/>}
            {suggestions && suggestions.map((profile: IStory) => (
                <Story key={profile.userId} userId={profile.userId} username={profile.username} email={profile.email} avatar={profile.avatar} />
            ))}

        </div>
    );
}

export default Stories;