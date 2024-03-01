import { Post } from "../models/posts.model"
import { PostPreview } from "./PostPreview.tsx"

interface PostsListProps {
    posts: Post[]
}


export function PostsList({ posts }: PostsListProps) {
    console.log(posts);

    return (
        <section>
            <ul className="stay-list tests">
                {posts?.map((post) => (
                    <div key={post._id}>
                        <PostPreview post={post} />
                    </div>
                ))}
            </ul>
        </section>
    )
}