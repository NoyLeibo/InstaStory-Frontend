import { Post } from "../models/posts.model"
import { RootState, User } from "../models/user.model"
import ProfileTaggedSvg from '/svg/profile-page/profile-tagged.svg'
import ProfilePostsSvg from '/svg/profile-page/profile-posts.svg'
import ProfileSavedSvg from '/svg/profile-page/profile-saved.svg'
import { useState } from "react"
import { ProfilePostIndex } from "./ProfilePostIndex"
import { ProfileSavedPostIndex } from "./ProfileSavedPostIndex"
import { useSelector } from "react-redux"
import { httpService } from "../services/http.service"
import { onLoggedInUserActions } from "../store/actions/user.actions"

interface ProfileIndexProps {
    userDetails: User
    userPosts: Post[]
    setUserDetails: React.Dispatch<React.SetStateAction<User | null>>

}

export function ProfileIndex({ setUserDetails, userDetails, userPosts }: ProfileIndexProps) {
    const [activeIcon, setActiveIcon] = useState('Posts')
    const imageUrl = userDetails.imgUrl || ''
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);

    const isActive = (iconName: string) => activeIcon === iconName;

    function checkIfLoggedInUserProfile() {
        return userDetails._id === loggedInUser?._id
    }

    function checkIfUserFollow() {
        return loggedInUser?.following.some(following => following._id === userDetails._id);
    }

    async function userFollowAction(action = checkIfUserFollow()) {
        const targetUser = { ...userDetails } // Shallow copy for immutability
        if (!targetUser || !loggedInUser) return
        const localLoggedInUser = { ...loggedInUser } // Shallow copy for immutability

        if (action) {
            // User wants to unfollow
            // Remove targetUser from loggedInUser's following list
            localLoggedInUser.following = localLoggedInUser.following.filter(following => following._id !== targetUser._id)

            // Remove loggedInUser from targetUser's followers list
            targetUser.followers = targetUser.followers.filter(follower => follower._id !== localLoggedInUser._id);
            console.log('after', targetUser);
        } else {
            // User wants to follow
            // Add targetUser to loggedInUser's following list
            localLoggedInUser.following.push({
                _id: targetUser._id,
                fullname: targetUser.fullname,
                username: targetUser.username,
                imgUrl: targetUser.imgUrl || '',
            })

            // Add loggedInUser to targetUser's followers list
            targetUser.followers.push({
                _id: localLoggedInUser._id,
                fullname: localLoggedInUser.fullname,
                username: localLoggedInUser.username,
                imgUrl: localLoggedInUser.imgUrl || '',
            })
        }
        // console.log(localLoggedInUser, action ? 'Unfollow' : 'Follow', 'to', targetUser);
        // Update both users in the database
        try {
            await httpService.put("user", targetUser) // שומר ב Database
            setUserDetails(targetUser)
            onLoggedInUserActions(localLoggedInUser)// שומר ב Database ובSession-Storage
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section className="profile-index flex column ">
            <div className="profile-header align-center flex row">
                <img src={imageUrl} alt="Profile" className="profile-image pointer" />
                <div className="profile-bio flex column">
                    <div className="margintop20 fs20">{userDetails.username}</div>
                    <div className="flex row fs16 margintop20">
                        <div className="fs14">{userPosts.length | 0} posts</div>
                        <div className="fs14 marginleft16">{userDetails.followers.length | 0} followers</div>
                        <div className="fs14 marginleft16">{userDetails.following.length | 0} following</div>
                    </div>
                    <div className="margintop20 fs14">{userDetails.fullname}</div>
                    <div className="margintop20 fs14">{userDetails.bio ? userDetails.bio : ''}</div>
                    {checkIfLoggedInUserProfile() ? '' : <button className={checkIfUserFollow() ? 'unfollow-btn' : 'follow-btn'} onClick={() => userFollowAction()}>{checkIfUserFollow() ? 'Unfollow' : 'Follow'}</button>}

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

                    {loggedInUser?._id === userDetails._id && (
                        <>
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
                        </>)}
                </div>
                {isActive('Posts') && <ProfilePostIndex userPosts={userPosts} />}
                {loggedInUser?._id === userDetails._id && isActive('Saved') && <ProfileSavedPostIndex userDetails={userDetails} />}
            </main>
        </section>
    )
}
