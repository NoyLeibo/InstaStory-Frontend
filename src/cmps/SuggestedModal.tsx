import { Avatar } from "@mui/material"
import { User } from "../models/user.model.ts"
import { useNavigate } from "react-router";
import { onLoggedInUserActions } from "../store/actions/user.actions.ts";
import { storageService } from "../services/async-storage.service.ts";

interface SuggestModalProps {
    loggedInUser: User | null
    allUsers: User[]
}


export function SuggestedModal({ allUsers, loggedInUser }: SuggestModalProps) {

    const maxCurrSuggest = 5
    let navigate = useNavigate();

    function navigateToUserPage(user = loggedInUser) {
        console.log(user);
        navigate('/user/' + user?._id)
    } // כשלוחצים על הAVATAR של היוזר זה מעביר לעמוד בית שלו

    // function onLogOut() { logOut(loggedInUser)}

    async function toggleFollows(targetUser: User, action: 'follow' | 'unfollow') {
        const localLoggedInUser = loggedInUser
        if (!localLoggedInUser || !targetUser) return;
        let updatedFollowing = [...localLoggedInUser.following];
        let updatedFollowers = [...targetUser.followers];

        console.log(localLoggedInUser.username, action, 'to', targetUser.username);

        if (action === 'follow') {
            // Add targetUser to loggedInUser Following list DONE
            localLoggedInUser.following.push({
                _id: targetUser._id,
                fullname: targetUser.fullname,
                username: targetUser.username,
                imgUrl: targetUser.imgUrl || '',
            })
            // Add loggedInUser to targetUser Followers list DONE
            targetUser.followers.push({
                _id: localLoggedInUser._id,
                fullname: localLoggedInUser.fullname,
                username: localLoggedInUser.username,
                imgUrl: localLoggedInUser.imgUrl || '',
            })
        }
        else if (action === 'unfollow') {
            // splice tragetUser from loggedInUser Following list DONE
            updatedFollowing.map((following, index) => {
                if (following._id === targetUser._id) {
                    updatedFollowing.splice(index, 1)
                }
            })

            // splice loggedInUser from targetUser Followers list DONE
            updatedFollowers.map((follower, index) => {
                if (follower._id === targetUser._id) {
                    updatedFollowers.splice(index, 1)
                }
            })

            targetUser.followers = updatedFollowers ? updatedFollowers : []
            localLoggedInUser.following = updatedFollowing ? updatedFollowing : []
        }
        await storageService.put("user", targetUser) // שומר ב LocalStorage
        onLoggedInUserActions(localLoggedInUser)
    }

    const isFollowing = (user: User) => {
        return loggedInUser?.following.some(follower => follower._id === user._id);
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