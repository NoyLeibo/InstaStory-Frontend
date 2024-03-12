import { User } from "../models/user.model"

interface ProfileIndexProps {
    userDetails: User
}

export function ProfileIndex({ userDetails }: ProfileIndexProps) {

    const imageUrl = userDetails.imgUrl || ''

    return (
        <section className="profile-index flex justify-center">
            <div className="profile-header">
                <img src={imageUrl} alt="Profile" className="profile-image" />
                <div className="profile-bio">
                    <div>
                        {userDetails.username}
                    </div>
                </div>
            </div>
        </section>
    )
}
