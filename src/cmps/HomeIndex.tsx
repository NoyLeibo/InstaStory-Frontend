import { useSelector } from "react-redux"
import { RootState } from "../models/user.model";
import { useEffect } from "react";
import { loadPosts } from "../store/actions/posts.actions";
import { PostsList } from "./PostsList.tsx";
import { Post } from "../models/posts.model.ts";


export function HomeIndex() {
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    const posts: Post[] | any = useSelector((state: RootState) => state.postsModule.posts)

    useEffect(() => {
        loadPosts()
        console.log('Hey ', loggedInUser);

    }, [])

    if (!posts) return (<h1>No posts for now</h1>)
    return (
        <section className="home-index">
            {/* <StoryIndex /> */}
            <PostsList posts={posts} />
        </section>
    )
}