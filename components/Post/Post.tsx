
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, BookmarkIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { IPost } from "./type";

function Post({id, username, avatar, postImg, caption}: IPost) {
    const {data: session } = useSession()
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [hasLiked, setHasLiked] = useState<boolean>(false);


    useEffect(() => 
        onSnapshot(query(
                        collection(db, 'posts', id, 'comments'),
                        orderBy('timestamp', 'desc')),
            snapshot => setComments(snapshot.docs)
        ),
        [db, id]
    );

    useEffect(() => 
        onSnapshot(collection(db, 'posts', id, 'likes'),
            snapshot => setLikes(snapshot.docs)
        ),
        [db, id]
    );

    useEffect(() => 
        setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
    , [likes]);

    const sendComment = async (e: any) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session?.user?.username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp()
        });
    }

    const likePost = async () => {
        console.log(doc(db, 'posts', id, 'likes', session?.user?.uid))
        // if(hasLiked){
        //     await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid))  
        // }else {
        //     await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid), {
        //         username: session?.user?.username
        //     })  
        // }
    }
    
    return (  
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
            <div className="flex items-center p-5">
                <img className="rounded-full h-12 w-12 object-contain border p-1 mr-3" src={avatar}/>
                <p className="flex-1 font-bold">{username}</p>
                <EllipsisHorizontalIcon className="h-5"/>
            </div>
            {/* Img */}
            <img src={postImg} className="object-cover w-full"/>
            {/* Buttons */}
            {session && 
                (<div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        { hasLiked ?
                            <HeartSolid onClick={likePost} className='btn' />
                            :
                            <HeartIcon onClick={likePost} className="btn" />
                        }
                        <ChatBubbleOvalLeftEllipsisIcon className="btn"/>
                        <PaperAirplaneIcon className="btn"/>
                    </div>
                    <BookmarkIcon className="btn"/>
                </div>)}
            {/* Caption */}
            <p className="p-5 truncate">
                <span className="font-bold">{username}{' '}</span>
                {caption}
            </p>
            {/* comments */}
            {comments.length > 0 && 
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                        {comments.map((comment) => 
                                <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                                    <img className="h-7 rounded-full" src={comment.data().userImage}/>
                                    <p className="text-sm flex-1">
                                        <span className="font-bold">
                                            {comment.data().username}
                                            {'shsjshk'}
                                        </span>{' '}
                                        {comment.data().comment}
                                    </p>
                                    <Moment fromNow className="pr-5 text-xs">
                                        {comment.data().timestamp.toDate()}
                                    </Moment>
                                </div>
                        )}
                </div>
            }
           {/* input box */}
            {session && 
                (<form className="flex items-center p-4">
                    <FaceSmileIcon className="h-7"/>
                    <input 
                        type="text" 
                        onChange={e => setComment(e.target.value)}
                        placeholder="Comment..." 
                        value={comment}
                        required 
                        className="border-none flex-1 foun focus:ring-0 outline-none" />
                    <button onClick={sendComment} type="submit" className="font-semibold text-blue-400">Post</button>
                </form>)}
        </div>
    );
}

export default Post;
