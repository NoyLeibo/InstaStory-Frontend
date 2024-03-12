import { Post } from "../models/posts.model"
import { User } from "../models/user.model"
import ProfileTaggedSvg from '../../public/svg/profile-page/profile-tagged.svg'
import ProfilePostsSvg from '../../public/svg/profile-page/profile-posts.svg'
import ProfileSavedSvg from '../../public/svg/profile-page/profile-saved.svg'
import { useState } from "react"
import { ProfilePostIndex } from "./ProfilePostIndex"
import { ProfileSavedPostIndex } from "./ProfileSavedPostIndex"

interface ProfileIndexProps {
    userDetails: User
    userPosts: Post[]
}

export function ProfileIndex({ userDetails, userPosts }: ProfileIndexProps) {
    const [activeIcon, setActiveIcon] = useState('Posts')
    const imageUrl = userDetails.imgUrl || ''

    const isActive = (iconName: string) => activeIcon === iconName;

    return (
        <section className="profile-index flex column ">
            <div className="profile-header flex row">
                <img src={imageUrl} alt="Profile" className="profile-image pointer" />
                <div className="profile-bio flex column">
                    <div className="margintop20 fs20">{userDetails.username}</div>
                    <div className="flex row fs16 margintop20">
                        <div>{userPosts.length} posts</div>
                        <div className="marginleft16">{userDetails.followers.length} followers</div>
                        <div className="marginleft16">{userDetails.following.length} following</div>
                    </div>
                    <div className="margintop20 fs14">{userDetails.fullname}</div>
                    <div className="margintop20 fs14">{userDetails.bio ? userDetails.bio : ''}</div>
                </div>
            </div>
            <main className="flex column">
                <div className="profile-links flex margintop40 divider justify-center">
                    <div className={`profile-pics-link ${isActive('Posts') ? 'active' : ''}`} onClick={() => setActiveIcon('Posts')}>
                        <a className="posts-icon">
                            <img src={ProfilePostsSvg} alt="Posts icon" />
                        </a>
                        <span>POSTS</span>
                    </div>

                    <div className={`marginleft16 profile-pics-link ${isActive('Saved') ? 'active' : ''}`} onClick={() => setActiveIcon('Saved')}>
                        <a className="posts-icon">
                            <img src={ProfileSavedSvg} alt="Saved icon" />
                        </a>
                        <span>SAVED</span>
                    </div>

                    <div className={`marginleft16 profile-pics-link ${isActive('Tagged') ? 'active' : ''}`} onClick={() => setActiveIcon('Tagged')}>
                        <a className="posts-icon">
                            <img src={ProfileTaggedSvg} alt="Tagged icon" />
                        </a>
                        <span>TAGGED</span>
                    </div>
                </div>
                {isActive('Posts') && <ProfilePostIndex userPosts={userPosts} />}
                {isActive('Saved') && <ProfileSavedPostIndex userDetails={userDetails} userPosts={userPosts} />}
            </main>
        </section>
    )
}
