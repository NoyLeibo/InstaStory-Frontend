import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/user.service.ts';
import { ProfileIndex } from '../cmps/ProfileIndex';
import { RootState, User } from '../models/user.model';
import { Post } from '../models/posts.model.ts';
import { useSelector } from 'react-redux';

export function ProfilePage() {
    const { id } = useParams<string>()
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [userPosts, setUserPosts] = useState<any>(null);
    const posts: Post[] | any = useSelector((state: RootState) => state.postsModule.posts)
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser === null) navigate('/auth')
    }, [])

    useEffect(() => {
        if (!id) return
        const fetchUserDetails = async () => {
            const details = await userService.getById(id);
            setUserDetails(details as User)
        };

        fetchUserDetails();
    }, [id]);


    useEffect(() => {

        if (Array.isArray(posts)) { // Check if posts is indeed an array
            const filteredPosts = posts.filter((post: Post) => post.by._id === id);
            setUserPosts(filteredPosts);
        }

    }, []);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <main className="main-container-profile">
            <header className="controller-logo-responsive">
                <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
            </header>
            <ProfileIndex userPosts={userPosts} userDetails={userDetails} />
        </main>
    );
}