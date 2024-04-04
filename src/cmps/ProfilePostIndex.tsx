import { Post } from "../models/posts.model";
import { ProfilePostPreview } from "./ProfilePostPreview";

interface ProfilePostIndexProps {
    userPosts: Post[];
}

export function ProfilePostIndex({ userPosts }: ProfilePostIndexProps) {
    return (
        <section className="flex profile-post-index">
            {userPosts && userPosts.length > 0 ? (
                userPosts.map((post) => (
                    <div key={post._id}>
                        <ProfilePostPreview post={post} />
                    </div>
                ))
            ) : (
                <span>No posts</span>
            )}
        </section>
    );
}
