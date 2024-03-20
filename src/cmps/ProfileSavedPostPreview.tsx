import { useSelector } from "react-redux";
import { Post } from "../models/posts.model";
import { RootState } from "../models/user.model";
import { useState } from "react";
import { CommentModal } from "./CommentModal";
import { savePostAction } from "../store/actions/user.actions";
import { CommentModalResponsive } from "./CommentModalResponsive";

interface ProfileSavedPostPreviewProps {
    post: Post
}

export function ProfileSavedPostPreview({ post }: ProfileSavedPostPreviewProps) {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);


    function getInitialIsLikedState() {
        if (loggedInUser?._id) {
            return (post.likedBy.some((like) => like._id === loggedInUser._id))
        }
        return false
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            console.log("Enter was pressed without Shift. Handling custom action.");
        }
    }

    function savePost() {
        if (loggedInUser) savePostAction(loggedInUser, post)
    }
    return (
        <section>
            <img className="profile-post-preview pointer" onClick={() => setIsCommentModalOpen(true)} src={post.imgUrl} />
            {isCommentModalOpen && window.innerWidth > 777 && <CommentModal savePost={savePost} setIsCommentModalOpen={setIsCommentModalOpen} getInitialIsLikedState={getInitialIsLikedState} handleKeyDown={handleKeyDown} post={post} loggedInUser={loggedInUser} />}
            {isCommentModalOpen && window.innerWidth <= 777 && <CommentModalResponsive savePost={savePost} setIsCommentModalOpen={setIsCommentModalOpen} getInitialIsLikedState={getInitialIsLikedState} handleKeyDown={handleKeyDown} post={post} loggedInUser={loggedInUser} />}
        </section>
    )
}