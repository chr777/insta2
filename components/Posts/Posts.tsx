import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Post from "../Post";
import { IPost } from "./type";

function Posts() {

    const [posts, setPosts] = useState<IPost[] | null>(null);

    useEffect(() =>
         onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => setPosts(snapshot.docs))
    ,[db]);

    return (  
        <div>
            {posts && posts.map((post: IPost) => 
                <Post key={post.id} id={post.id} username={post.data().username} postImg={post.data().image} caption={post.data().caption} avatar={post.data().profileImg}/>)}
        </div>
    );
}

export default Posts;
