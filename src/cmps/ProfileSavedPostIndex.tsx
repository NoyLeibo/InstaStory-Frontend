import { Post } from "../models/posts.model"
import { User } from "../models/user.model"

interface ProfileSavedPostIndexProps {
    userDetails: User
    userPosts: Post[]

}

export function ProfileSavedPostIndex({ userDetails, userPosts }: ProfileSavedPostIndexProps) {
    console.log(userDetails, userPosts);

    return (
        <section>
            ProfileSavedPostIndex
        </section>
    )
}