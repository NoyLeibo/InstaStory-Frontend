import { Avatar } from "@mui/material"
import { User } from "../models/user.model.ts"
import { useState } from "react";
import { useNavigate } from "react-router";
import { onFollowsActions } from "../store/actions/user.actions.ts";

interface SuggestModalProps {
    loggedInUser: User | null
    allUsers: User[]
}


export function SuggestedModal({ allUsers, loggedInUser }: SuggestModalProps) {
    const [localLoggedInUser, setLocalLoggedInUser] = useState<User | null>(loggedInUser);
    // const [userGotFollowed, setUserGotFollowed] = useState<User | null>(null);
    const maxCurrSuggest = 5
    let navigate = useNavigate();

    function navigateToUserPage(user = loggedInUser) {
        console.log(user);
        navigate('/user/:' + user?.username)
    } // כשלוחצים על הAVATAR של היוזר זה מעביר לעמוד בית שלו

    // function onLogOut() { }

    function toggleFollows(targetUser: User, action: 'follow' | 'unfollow') {
        if (!localLoggedInUser || targetUser === null) return;
        let updatedFollowing = [...localLoggedInUser.following];

        if (action === 'follow') {
        }
        //         if (!updatedFollowing.some(follower => follower._id === targetUser._id)) {
        //             updatedFollowing.push({
        //                 _id: targetUser._id,
        //                 fullname: targetUser.fullname,
        //                 username: targetUser.username,
        //                 imgUrl: targetUser.imgUrl || '',
        //             });
        //             setUserGotFollowed(targetUser)
        //             setUserGotFollowed(prev => ({
        //                 ...targetUser,
        //                 followers: prev && prev.followers ? [...prev.followers, {
        //                     _id: localLoggedInUser._id,
        //                     fullname: localLoggedInUser.fullname,
        //                     username: localLoggedInUser.username,
        //                     imgUrl: localLoggedInUser.imgUrl || '',
        //                 }] : [{
        //                     _id: localLoggedInUser._id,
        //                     fullname: localLoggedInUser.fullname,
        //                     username: localLoggedInUser.username,
        //                     imgUrl: localLoggedInUser.imgUrl || '',
        //                 }]// adding to his followers the localLoggedInUser
        //             }))
        //         }
        //     } else if (action === 'unfollow') {
        //         updatedFollowing = updatedFollowing.filter(follower => follower._id !== targetUser._id);
        //         if (userGotFollowed && userGotFollowed._id === targetUser._id) {
        //             setUserGotFollowed(null)
        //         }
        //     }
        //     setLocalLoggedInUser({ ...localLoggedInUser, following: updatedFollowing });
        //     onFollowsActions(localLoggedInUser, true)
        //     if (userGotFollowed) onFollowsActions(userGotFollowed, false)
    }

    const isFollowing = (user: User) => {
        return localLoggedInUser?.following.some(follower => follower._id === user._id);
    };

    return (
        <section className="suggested-modal flex column">
            <div className=" flex space-between align-center">
                <div className="flex align-center">
                    {loggedInUser?.imgUrl && <Avatar onClick={() => navigateToUserPage()} className="pointer" src={loggedInUser?.imgUrl} />}
                    <div className="suggested-modal-name flex column">
                        <div onClick={() => navigateToUserPage()} className="blacktxt fs14 pointer">{loggedInUser?.username}</div>
                        <div onClick={() => navigateToUserPage()} className="graytxt fs14 pointer">{loggedInUser?.fullname}</div>
                    </div>
                </div>
                <div className="logout-btn pointer fs12 bold">Logout</div>
            </div>
            <div className="flex space-between margintop20 fs14">
                <div className="graytxt">Suggested for you</div>
                <div className="blacktxt pointer bold fs12">See All</div>
            </div>
            <ul className="padding0 flex column space-between margintop20 fs14">
                {allUsers
                    .filter(user => loggedInUser && user._id !== loggedInUser._id) // Filter out the loggedInUser
                    .slice(0, maxCurrSuggest)
                    .map((user) => (
                        <li key={user._id} className="flex align-center fs14 space-between">
                            <div className="user-suggestion flex marginbottom10" onClick={() => navigateToUserPage(user)}>
                                <Avatar className="pointer" src={user.imgUrl || undefined} alt={user.username} />
                                <div className="suggested-modal-name flex column">
                                    <div className="blacktxt bold fs14 pointer">{user.username}</div>
                                    <div className="graytxt fs14 pointer">{user.fullname}</div>
                                </div>
                            </div>
                            {isFollowing(user) ? (
                                <div onClick={() => toggleFollows(user, 'unfollow')} className="pointer btn-txt-color bold fs12">Unfollow</div>
                            ) : (
                                <div onClick={() => toggleFollows(user, 'follow')} className="pointer btn-txt-color bold fs12">Follow</div>
                            )}
                        </li>
                    ))}
            </ul>
        </section>
    )
}