import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service.ts';
import { ProfileIndex } from '../cmps/ProfileIndex';
import { User } from '../models/user.model';

export function ProfilePage() {
    const { id } = useParams<string>()
    const [userDetails, setUserDetails] = useState<User | null>(null);

    useEffect(() => {
        if (!id) return
        const fetchUserDetails = async () => {
            const details = await userService.getById(id);
            setUserDetails(details as User)
        };

        fetchUserDetails();
    }, [id]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <main className="main-container-profile">
            <header className="controller-logo-responsive">
                <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
            </header>
            <ProfileIndex userDetails={userDetails} />
        </main>
    );
}
