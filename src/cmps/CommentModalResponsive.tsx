import { useEffect, useState } from "react";
import { Post } from "../models/posts.model";
import { User } from "../models/user.model";
import useOutsideClick from "../services/onclickoutside.service";
import { postsService } from "../services/posts.service";
import { eventBus } from "../services/event-bus.service";
import { Avatar } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import EmojiPicker from "emoji-picker-react";

interface CommentModalResponsiveProps {
    post: Post;
    loggedInUser: User | null;
    handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    getInitialIsLikedState: () => boolean
    setIsCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    savePost: () => void
}

export function CommentModalResponsive({ savePost, setIsCommentModalOpen, getInitialIsLikedState, post, loggedInUser, handleKeyDown }: CommentModalResponsiveProps) {
    const [isLiked, setIsLiked] = useState(() => getInitialIsLikedState())
    const [commentText, setCommentText] = useState('')
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)
    const savedPosts = loggedInUser?.savedPostsIds
    const modalContentRef = useOutsideClick(() => setIsCommentModalOpen(false)) // on click outside func, call to her service
    const emojiContentRef = useOutsideClick(() => setIsEmojiModalOpen(false))

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        console.log('responsive!');

    }, [])

    async function handleToggleLike() {
        try {
            const updatedPost = await postsService.toggleLike(post)
            if (loggedInUser) setIsLiked(updatedPost.likedBy.some((like) => like._id === loggedInUser._id))
            eventBus.emit('toggleLike', updatedPost)
        } catch (err) {
            console.error('Cannot toggle like', err)
        }
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
            console.log(commentToAdd.txt);

            await postsService.addComment(post, commentToAdd.txt)
            console.log('Successfully added comment')
            setCommentText('')
        } catch (err) {
            console.log('Cannot add comment', err)
        }
    }

    return (
        <section className="comment-modal-background-responsive">
            <div className="comment-modal-responsive flex column" ref={modalContentRef}>
                <img src={post.imgUrl} />
                <div className="comments-on-modal flex column">
                    <div className="comments-modal-header fs14 flex align-center">
                        <Avatar src={post.by.imgUrl} />
                        <div className="flex column pointer marginleft8">
                            <span className="bold">{post.by.username}</span>
                            {post.loc.city && <span>{post.loc.city}</span>}
                        </div>
                    </div>
                    <div className="comments-modal-middle">
                        {post.txt &&
                            <div>
                                <div className="flex align-center fs14 comment">
                                    <Avatar src={post.by.imgUrl} />
                                    <div className="marginleft8 max-width-textmodal flex column space-between">
                                        <span className="bold">{post.by.username}</span><span>{" "}</span><span className="comment-text">{post.txt}</span>
                                        <div className="fs14">
                                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="flex align-center fs14 comment ">
                                <Avatar src={comment.by.imgUrl} alt={comment.by.username} />
                                <div className="marginleft8 max-width-textmodal flex column space-between">
                                    <div className="bold">{comment.by.username}</div><div>{" "}</div><div className="comment-text">{comment.txt}</div>
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
                            {savedPosts?.includes(post._id) ?
                                <span onClick={savePost} className="emoji-container pointer justify-end"><i className="fas fa-bookmark"></i></span>
                                :
                                <span onClick={savePost} className="emoji-container pointer justify-end"><i className="far fa-bookmark"></i></span>
                            }                        </div>
                        {isLiked ?
                            <div className="fs14 bold">
                                Liked by you{post.likedBy.length > 1 ? ` and ${post.likedBy.length - 1} others` : ''}
                            </div> :
                            <div className="fs14 bold">{post.likedBy.length ? `${post.likedBy.length} likes` : 'No likes'}</div>
                        }
                        <form onSubmit={(ev) => handleSubmitComment(ev)} className="flex">
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
                        </form>
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