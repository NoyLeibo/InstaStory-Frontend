import { Post } from "../models/posts.model";
import { Avatar } from "@mui/material";
import Stack from '@mui/material/Stack';
import { User } from "../models/user.model";
import EmojiPicker from 'emoji-picker-react';
import { postsService } from "../services/posts.service";
import { eventBus } from "../services/event-bus.service";
import { useEffect, useState } from "react";
import { CommentModal } from "./CommentModal.tsx";
import { CommentModalResponsive } from "./CommentModalResponsive.tsx";
import useOutsideClick from "../services/onclickoutside.service.ts";
// import { userService } from "../services/user.service.ts";
// import { storageService } from "../services/async-storage.service.ts";
import { savePostAction } from "../store/actions/user.actions.ts";
import moment from 'moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router";
interface PostPreviewProps {
    index: Number;
    post: Post
    loggedInUser: User | null
}

export function PostPreview({ index, post, loggedInUser }: PostPreviewProps) {
    const [isLiked, setIsLiked] = useState(() => getInitialIsLikedState())
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
    const navigate = useNavigate()

    const words = post.txt.split(' ');
    const showMoreNeeded = words.length > 7;
    const showMoreNeededResponsive = words.length > 5;
    const displayedText = showMoreNeeded && !isExpanded ? words.slice(0, 7).join(' ') + '... ' : post.txt;
    const displayedTextResponsive = showMoreNeededResponsive && !isExpanded ? words.slice(0, 5).join(' ') + '... ' : post.txt;
    const savedPosts = loggedInUser?.savedPostsIds

    useEffect(() => {
    }, [savedPosts, isLiked])

    useEffect(() => {
        if (!isCommentModalOpen) document.body.style.overflow = 'unset'
    }, [isCommentModalOpen])

    useEffect(() => {
        if (isEmojiModalOpen) document.body.style.overflow = 'hidden'
        else if (!isEmojiModalOpen) document.body.style.overflow = 'unset'
    }, [isEmojiModalOpen])

    const handleCloseModal = () => {
        setIsEmojiModalOpen(false);
    };
    const modalContentRef = useOutsideClick(handleCloseModal); // on click outside func, call to her service

    function getInitialIsLikedState() {
        if (loggedInUser?._id) {
            return (post.likedBy.some((like) => like._id === loggedInUser._id))
        }
        return false
    }

    async function handleToggleLike() {
        try {
            const updatedPost = await postsService.toggleLike(post)
            if (loggedInUser) setIsLiked(updatedPost.likedBy.some((like) => like._id === loggedInUser._id))
            eventBus.emit('toggleLike', updatedPost)
        } catch (err) {
            console.error('Cannot toggle like', err)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            console.log("Enter was pressed without Shift. Handling custom action.");
        }
    }

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    const handleEmojiClick = (emojiObject: { emoji: string }) => {
        if (emojiObject && emojiObject.emoji) {
            setCommentText((prevText) => prevText + emojiObject.emoji)
            setIsEmojiModalOpen(false)
        } else {
            console.error('Emoji data not found')
        }
    }

    async function handleSubmitComment(ev: React.FormEvent<HTMLFormElement>) {
        try {
            ev.preventDefault()
            if (!commentText) return
            let commentToAdd = postsService.getEmptyComment()
            commentToAdd.txt = commentText
            await postsService.addComment(post, commentToAdd.txt)
            console.log('Successfully added comment')
            setCommentText('')
        } catch (err) {
            console.log('Cannot add comment', err)
        }
    }

    function savePost() {
        if (loggedInUser) savePostAction(loggedInUser, post)
    }

    function formatTimestamp(timestamp: Date) {
        return moment(timestamp).fromNow()
    }

    function onClickUser(userID: string) {
        navigate('/user/' + userID)
        // console.log(userID);

    }

    return (
        <section className={index === 0 ? "post-preview post-preview-first flex column" : "post-preview flex column"}>
            <div className="flex space-between align-center">
                <div className="post-header flex align-center">
                    <Stack direction="row" spacing={2}>
                        <Avatar className="profile-img-avatar" onClick={() => onClickUser(post.by._id)} src={post.by.imgUrl} />
                    </Stack>
                    <div className="flex column fs14 ">
                        <span onClick={() => onClickUser(post.by._id)} className="bold pointer">{post.by.username} • <span className="graytxt fs12">{formatTimestamp(post.createdAt)}</span> </span>
                        {post.loc.city && <span className="pointer">{post.loc.city}</span>}
                    </div>
                </div>
                <MoreHorizIcon className="pointer" /> {/*On click should open modal with btns: go to post / cancel */}
            </div>
            <img className="post-image" src={post.imgUrl} />
            <div className="full-like-row flex">
                <div className="like-row flex row align-center">
                    {isLiked ?
                        <span onClick={() => handleToggleLike()} className="emoji-container pointer"><i className="fa-solid fa-heart fa-lg" style={{ color: '#ff0000' }}></i></span>
                        :
                        <span onClick={() => handleToggleLike()} className="emoji-container pointer"><i className="fa-regular fa-heart fa-lg"></i></span>
                    }
                    <span onClick={() => setIsCommentModalOpen(true)} className="emoji-container pointer"><i className="fa-regular fa-comment fa-lg"></i></span>
                    <span className="emoji-container pointer"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                </div>
                {savedPosts?.includes(post._id) ?
                    <span onClick={savePost} className="emoji-container pointer justify-end"><i className="fas fa-bookmark"></i></span>
                    :
                    <span onClick={savePost} className="emoji-container pointer justify-end"><i className="far fa-bookmark"></i></span>
                }
            </div>
            {isLiked ?
                <div className="fs14 bold">
                    Liked by you{post.likedBy.length > 1 ? ` and ${post.likedBy.length - 1} others` : ''}
                </div> :
                <div className="fs14 bold">{post.likedBy.length ? `${post.likedBy.length} likes` : ''}</div>
            }
            <p className="fs14 comment-not-responsive">
                <span className="bold pointer" onClick={() => onClickUser(post.by._id)}>{post.by.username}</span> {displayedText}
                {showMoreNeeded && !isExpanded && (
                    <button onClick={toggleExpand} className="show-more-btn pointer">
                        more
                    </button>
                )}
            </p>
            <p className="fs14 comment-responsive">
                <span className="bold pointer" onClick={() => onClickUser(post.by._id)}>{post.by.username}</span> <span className="comment-text">{displayedTextResponsive}</span>
                {showMoreNeededResponsive && !isExpanded && (
                    <button onClick={toggleExpand} className="show-more-btn pointer">
                        more
                    </button>
                )}
            </p>

            {post.comments.length > 0 && <span>
                <button onClick={() => setIsCommentModalOpen(!isCommentModalOpen)} className="comments-button">
                    View {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                </button>
            </span>}

            <form onSubmit={(ev) => handleSubmitComment(ev)} className="flex">
                <textarea
                    className="add-comment"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(ev) => setCommentText(ev.target.value)}
                    rows={1}
                    maxLength={100}
                    onKeyDown={handleKeyDown}
                />
                {commentText && <button type="submit" className="postbtn">Post</button>}
                <button className="emojibtn" onClick={() => setIsEmojiModalOpen(true)}>🙂</button>
            </form>

            {isEmojiModalOpen && (
                <div className="emoji-modal">
                    <div ref={modalContentRef}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                </div>
            )}

            {isCommentModalOpen && window.innerWidth > 777 && <CommentModal savePost={savePost} setIsCommentModalOpen={setIsCommentModalOpen} getInitialIsLikedState={getInitialIsLikedState} handleKeyDown={handleKeyDown} post={post} loggedInUser={loggedInUser} />}
            {isCommentModalOpen && window.innerWidth <= 777 && <CommentModalResponsive savePost={savePost} setIsCommentModalOpen={setIsCommentModalOpen} getInitialIsLikedState={getInitialIsLikedState} handleKeyDown={handleKeyDown} post={post} loggedInUser={loggedInUser} />}
        </section>
    )
}

