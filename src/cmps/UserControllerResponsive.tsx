import Home from '../../public/svg/home.svg'
import Explore from '../../public/svg/explore.svg'
import Notification from '../../public/svg/notification.svg'
// import More from '../../public/svg/more.svg'
import Create from '../../public/svg/create.svg'

import HomeActive from '../../public/svg/active/home-active.svg'
import ExploreActive from '../../public/svg/active/explore-active.svg'
import CreateActive from '../../public/svg/active/create-active.svg'
import NotificationActive from '../../public/svg/active/notification-active.svg'
import { User } from '../models/user.model'
import { Avatar } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useActiveIcon } from './ActiveIconContext'
// import MoreActive from '../../public/svg/active/more-active.svg'

interface UserControllerResponsiveProps {
    loggedInUser: User | null;
}

export function UserControllerResponsive({ loggedInUser }: UserControllerResponsiveProps) {
    const navigate = useNavigate()
    const location = useLocation();
    const { activeIcon, setActiveIcon } = useActiveIcon();

    useEffect(() => {
        if (location.pathname.startsWith('/user')) {
            setActiveIcon('Profile');
            console.log('PROFILE');
        }
    }, [location]);

    const icons = [
        {
            name: 'Home',
            src: Home,
            srcActive: HomeActive,
            alt: 'Home',
        },
        {
            name: 'Explore',
            src: Explore,
            srcActive: ExploreActive,
            alt: 'Explore',
        },
        {
            name: 'Create',
            src: Create,
            srcActive: CreateActive,
            alt: 'Create',
        },
        {
            name: 'Notification',
            src: Notification,
            srcActive: NotificationActive,
            alt: 'Notification',
        },
        {
            name: 'Profile',
            src: loggedInUser?.imgUrl || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            srcActive: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            alt: 'Profile',
        },
    ]

    const onIconClick = (name: string) => {
        if (name === 'Profile' && loggedInUser?._id) {
            navigate('/user/' + loggedInUser._id);
        } else {
            setActiveIcon(name);
        }
    };

    return (
        <nav className="user-controller-responsive flex row align-center">
            {icons.map((icon, index) =>
                <div key={index} className="icon-container-responsive pointer fs14" onClick={() => onIconClick(icon.name)}>
                    <Avatar
                        // className='icon-img'
                        src={activeIcon === icon.name ? icon.srcActive : icon.src}
                        alt={icon.alt}
                    />
                    <span className='icon-name' style={activeIcon === icon.name ? { fontWeight: 'bold' } : {}}>{icon.name}</span>
                </div>
            )}
        </nav>
    )
}