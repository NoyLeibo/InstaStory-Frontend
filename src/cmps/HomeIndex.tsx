import { useSelector } from "react-redux"
import { RootState, User } from "../models/user.model";
import { useEffect } from "react";
import { loadPosts } from "../store/actions/posts.actions";
import { PostsList } from "./PostsList";
import { SuggestedModal } from "./SuggestedModal.tsx";
import { Post } from "../models/posts.model.ts";
import { loadUsers } from "../store/actions/user.actions.ts";


export function HomeIndex() {
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    const posts: Post[] | any = useSelector((state: RootState) => state.postsModule.posts)
    const allUsers: User[] | any = useSelector((state: RootState) => state.userModule.users)

    useEffect(() => {
        loadPosts()
        loadUsers()
        console.log('welcome back', loggedInUser?.username);
    }, [])

    if (!posts) return (<h1>No posts for now</h1>)
    return (
        <section className="home-index flex">
            {/* <StoryIndex /> */}
            <PostsList posts={posts} loggedInUser={loggedInUser} />
            <SuggestedModal allUsers={allUsers} loggedInUser={loggedInUser} />
        </section>
    )
}