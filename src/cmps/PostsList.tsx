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
            {posts?.map((post) => (
                <div key={post._id}>
                    <PostPreview post={post} loggedInUser={loggedInUser} />
                </div>
            ))}
        </ul>
    )
}