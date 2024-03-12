import { Post } from "../models/posts.model"
import { ProfilePostPreview } from "./ProfilePostPreview"

interface ProfilePostIndexProps {
    userPosts: Post[]
}

export function ProfilePostIndex({ userPosts }: ProfilePostIndexProps) {
    return (
        <section className="flex profile-post-index">
            {userPosts.length ?
                (userPosts?.map((post, index) => (
                    <div key={post._id}>
                        <ProfilePostPreview index={index} post={post} />
                    </div>
                ))) : (
                    <span>No post</span>
                )
            }
        </section>
    )
}