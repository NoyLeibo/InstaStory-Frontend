import { Post } from "../models/posts.model";
import { Avatar } from "@mui/material";
import Stack from '@mui/material/Stack';
import { User } from "../models/user.model";
// import { useNavigate } from "react-router";
import { postsService } from "../services/posts.service";
import { eventBus } from "../services/event-bus.service";
import { useEffect, useState } from "react";
import { CommentModal } from "./CommentModal.tsx";
// import { userService } from "../services/user.service";

interface PostPreviewProps {
    post: Post
    loggedInUser: User | null
}

export function PostPreview({ post, loggedInUser }: PostPreviewProps) {
    const [isLiked, setIsLiked] = useState(() => getInitialIsLikedState())
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    useEffect(() => {
        console.log(isCommentModalOpen);

    }, [isCommentModalOpen])

    function getInitialIsLikedState() {
        if (loggedInUser?._id) {
            return (post.likedBy.some((like) => like._id === loggedInUser._id))
        }
        return false
    }

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }
    const words = post.txt.split(' ');
    const showMoreNeeded = words.length > 7;
    const displayedText = showMoreNeeded && !isExpanded ? words.slice(0, 7).join(' ') + '... ' : post.txt;

    // const navigate = useNavigate()

    async function handleToggleLike() {
        try {
            const updatedPost = await postsService.toggleLike(post)
            if (loggedInUser) setIsLiked(updatedPost.likedBy.some((like) => like._id === loggedInUser._id))

            // setIsAnimating(true)
            // setTimeout(() => setIsAnimating(false), 1000) // Reset animation state after 1 second
            //  setIsAnimating(false)// Reset animation state after 1 second

            eventBus.emit('toggleLike', updatedPost)
        } catch (err) {
            console.error('Cannot toggle like', err)
        }
    }


    return (
        <section className="post-preview flex column">
            <div className="post-header flex align-center">
                <Stack direction="row" spacing={2}>
                    <Avatar className="profile-img-avatar" src={post.by.imgUrl} />
                </Stack>
                <div className="flex column fs14 ">
                    <span className="bold pointer">{post.by.username}</span>
                    {post.loc.name && <span className="pointer">{post.loc.name}</span>}
                </div>
            </div>
            <img className="post-image" src={post.imgUrl} />
            <div className="full-like-row flex">
                <div className="like-row flex row align-center">
                    {isLiked ?
                        <span onClick={() => handleToggleLike()} className="emoji-container pointer"><i className="fa-solid fa-heart fa-lg" style={{ color: '#ff0000' }}></i></span>
                        :
                        <span onClick={() => handleToggleLike()} className="emoji-container pointer"><i className="fa-regular fa-heart fa-lg"></i></span>
                    }
                    <span className="emoji-container pointer"><i className="fa-regular fa-comment fa-lg"></i></span>
                    <span className="emoji-container pointer"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                </div>
                <span className="emoji-container pointer justify-end"><i className="fa-regular fa-bookmark"></i></span>
            </div>
            {isLiked ?
                <div className="fs14 bold">
                    Liked by you{post.likedBy.length > 1 ? ` and ${post.likedBy.length - 1} others` : ''}
                </div> :
                <div className="fs14 bold">{post.likedBy.length ? `${post.likedBy.length} likes` : ''}</div>
            }
            <p className="fs14">
                <span className="bold pointer">{post.by.username}</span> {displayedText}
                {showMoreNeeded && !isExpanded && (
                    <button onClick={toggleExpand} className="show-more-btn pointer">
                        more
                    </button>
                )}
            </p>
            <span>
                <button onClick={() => setIsCommentModalOpen(!isCommentModalOpen)} className="comments-button">
                    View {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                </button>
            </span>
            <textarea
                className="add-comment"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(ev) => setCommentText(ev.target.value)}
                rows={1}
            />
            {isCommentModalOpen ?
                <CommentModal />
                :
                <></>}
        </section>
    )
}