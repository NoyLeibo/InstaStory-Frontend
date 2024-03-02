import { Post } from "../models/posts.model";

interface PostPreviewProps {
    post: Post
}

export function PostPreview({ post }: PostPreviewProps) {
    console.log(post.by.imgUrl);

    return (
        <section className="post-preview flex column">
            <div className="post-header flex">
                <img className="profile-img-avatar" src={post.by.imgUrl} />
                <div className="flex column fs14 ">
                    <span className="bold">{post.by.username}</span>
                    {post.loc.name && <span className="pointer">{post.loc.name}</span>}
                </div>
            </div>
            <img className="post-image" src={post.imgUrl} />
            <div>{post.imgUrl}</div>
        </section>
    )
}