import { Post } from "../models/posts.model"
import { User } from "../models/user.model.ts";
import { PostPreview } from "./PostPreview.tsx"

interface PostsListProps {
    posts: Post[]
    loggedInUser: User | null
}


export function PostsList({ posts, loggedInUser }: PostsListProps) {

    return (
        <ul className="posts-list">
            {posts?.map((post, index) => (
                <PostPreview key={post._id} index={index} post={post} loggedInUser={loggedInUser} />
            ))}
        </ul>
    )
}