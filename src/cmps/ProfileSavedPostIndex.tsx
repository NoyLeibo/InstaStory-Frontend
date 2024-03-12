import { useEffect, useState } from "react";
import { Post } from "../models/posts.model";
import { User } from "../models/user.model";
import { postsService } from "../services/posts.service";
import { ProfileSavedPostPreview } from "./ProfileSavedPostPreview";

interface ProfileSavedPostIndexProps {
    userDetails: User;
}

export function ProfileSavedPostIndex({ userDetails }: ProfileSavedPostIndexProps) {
    const [savedPosts, setSavedPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchPromises = userDetails.savedPostsIds.map(id => postsService.getPostById(id));
            const fetchedPosts = await Promise.all(fetchPromises);
            setSavedPosts(fetchedPosts.filter(post => post) as Post[]);
        };
        fetchPosts();
    }, [userDetails.savedPostsIds]);

    console.log('savedPosts', savedPosts);

    return (
        <section className="flex profile-post-index">
            {savedPosts.length > 0 ? (
                savedPosts.map((savedPost) => (
                    <div key={savedPost._id}>
                        <ProfileSavedPostPreview post={savedPost} />
                    </div>
                ))
            ) : (
                <span>No posts</span>
            )}
        </section>
    );
}
