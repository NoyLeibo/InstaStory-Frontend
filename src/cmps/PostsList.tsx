import { Post } from "../models/posts.model"
import { PostPreview } from "./PostPreview.tsx"

interface PostsListProps {
    posts: Post[]
}


export function PostsList({ posts }: PostsListProps) {
    console.log(posts);

    return (
        <ul className="posts-list">
            {posts?.map((post) => (
                <div key={post._id}>
                    <PostPreview post={post} />
                </div>
            ))}
        </ul>
    )
}