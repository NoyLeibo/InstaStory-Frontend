import { useEffect, useState } from "react";
import { Post } from "../models/posts.model"
import { User } from "../models/user.model"
import { Avatar } from "@mui/material";
import { formatDistanceToNow } from 'date-fns';
import useOutsideClick from "../services/onclickoutside.service";
import EmojiPicker from "emoji-picker-react";
import { postsService } from "../services/posts.service";
import { eventBus } from "../services/event-bus.service";


interface CommentModalProps {
    post: Post;
    loggedInUser: User | null;
    handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void; // Correct type here
    getInitialIsLikedState: () => boolean
    isCommentModalOpen: boolean
    setIsCommentModalOpen: (value: React.SetStateAction<boolean>) => void;
}

export function CommentModal({ setIsCommentModalOpen, isCommentModalOpen, getInitialIsLikedState, post, loggedInUser, handleKeyDown }: CommentModalProps) {
    const [isLiked, setIsLiked] = useState(() => getInitialIsLikedState())
    const [commentText, setCommentText] = useState('');
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);

    useEffect(() => {
        console.log(modalContentRef.current); // This should log the DOM node
    }, []);

    async function handleToggleLike() {
        try {
            const updatedPost = await postsService.toggleLike(post)
            if (loggedInUser) setIsLiked(updatedPost.likedBy.some((like) => like._id === loggedInUser._id))
            eventBus.emit('toggleLike', updatedPost)
        } catch (err) {
            console.error('Cannot toggle like', err)
        }
    }
    const handleCloseModal = () => setIsCommentModalOpen(false)
    const handleCloseEmoji = () => setIsEmojiModalOpen(false)

    const modalContentRef = useOutsideClick(handleCloseModal); // on click outside func, call to her service
    const emojiContentRef = useOutsideClick(handleCloseEmoji); // on click outside func, call to her service

    const handleEmojiClick = (emojiObject: { emoji: string }) => {
        if (emojiObject && emojiObject.emoji) {
            setCommentText((prevText) => prevText + emojiObject.emoji)
            setIsEmojiModalOpen(false)
        } else {
            console.error('Emoji data not found')
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
    }, [])

    return (
        <section className="comment-modal-background">
            <div className="comment-modal flex" ref={modalContentRef}>
                <img src={post.imgUrl} />
                <div className="comments-on-modal flex column">
                    <div className="comments-modal-header fs14 flex align-center">
                        <Avatar src={post.by.imgUrl} />
                        <div className="flex column pointer marginleft8">
                            <span className="bold">{post.by.username}</span>
                            {post.loc.name && <span>{post.loc.name}</span>}
                        </div>
                    </div>
                    <div className="comments-modal-middle">
                        {post.txt &&
                            <div>
                                <div className="flex align-center fs14 comment">
                                    <Avatar src={post.by.imgUrl} />
                                    <div className="marginleft8">
                                        <span className="bold">{post.by.username}</span><span>{" "}</span>{post.txt}
                                        <div className="fs14">
                                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="flex align-center fs14 comment">
                                <Avatar src={comment.by.imgUrl} alt={comment.by.username} />
                                <div className="marginleft8">
                                    <span className="bold">{comment.by.username}</span><span>{" "}</span>{comment.txt}
                                    <div className="fs14">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="comments-modal-bottom space-between flex column margin8">
                        <div className="full-like-row-modal flex">
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
                            <div className="fs14 bold">{post.likedBy.length ? `${post.likedBy.length} likes` : 'No likes'}</div>
                        }
                        <div className="flex">
                            <textarea
                                className="add-comment"
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(ev) => setCommentText(ev.target.value)}
                                rows={1}
                                maxLength={100}
                                onKeyDown={handleKeyDown} />
                            {commentText && <button className="postbtn">post</button>}
                            <button className="emojibtn" onClick={() => setIsEmojiModalOpen(true)}>🙂</button>
                        </div>
                    </div>
                    {isEmojiModalOpen && (
                        <div className="emoji-modal">
                            <div ref={emojiContentRef}>
                                <EmojiPicker onEmojiClick={handleEmojiClick as any} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}