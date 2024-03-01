import { Post } from "../models/posts.model";

interface PostPreviewProps {
    post: Post
}

export function PostPreview({ post }: PostPreviewProps) {
    console.log(post.by.imgUrl);

    return (
        <img src={post.by.imgUrl} />
        // <h1>{post.imgUrl}</h1>
    )
}