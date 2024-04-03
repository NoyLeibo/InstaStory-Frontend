import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/user.service.ts';
import { ProfileIndex } from '../cmps/ProfileIndex';
import { RootState, User } from '../models/user.model';
import { Post } from '../models/posts.model.ts';
import { useSelector } from 'react-redux';
import { loadPosts } from '../store/actions/posts.actions.ts';
import { logout } from '../store/actions/user.actions.ts';

export function ProfilePage() {
    const { id } = useParams<string>()
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [userPosts, setUserPosts] = useState<any>(null);
    const posts: Post[] | any = useSelector((state: RootState) => state.postsModule.posts)
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser === null) navigate('/auth')
        loadPosts(loggedInUser?.following)
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
        console.log(userDetails);
    }, [userDetails])

    useEffect(() => {
        if (Array.isArray(posts)) {
            const filteredPosts = posts.filter((post) => post.by._id === id)
            setUserPosts(filteredPosts)
        }
    }, [posts])

    if (!userDetails) {
        return <div>Loading...</div>;
    }
    function onLogOut() {
        logout()
    }

    return (
        <main className="main-container-profile">
            <header className="controller-logo-responsive flex space-between">
                <img onClick={() => navigate('/')} src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                <span onClick={() => onLogOut()} className='logout-btn pointer fs16'>Log out</span>
            </header>
            <ProfileIndex userPosts={userPosts} setUserDetails={setUserDetails} userDetails={userDetails} />
        </main>
    );
}
