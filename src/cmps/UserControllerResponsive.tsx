import Home from '/svg/home.svg'
import Explore from '/svg/explore.svg'
import Notification from '/svg/notification.svg'
import Create from '/svg/create.svg'

import HomeActive from '/svg/active/home-active.svg'
import ExploreActive from '/svg/active/explore-active.svg'
import CreateActive from '/svg/active/create-active.svg'
import NotificationActive from '/svg/active/notification-active.svg'
import { User } from '../models/user.model'
import { Avatar } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useActiveIcon } from './ActiveIconContext'

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
        }
    }, [location]);
    useEffect(() => {
        console.log(loggedInUser);

    }, [])

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
            srcActive: loggedInUser?.imgUrl || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            alt: 'Profile',
        },
    ]

    const onIconClick = (name: string) => {
        if (name === 'Profile' && loggedInUser?._id) {
            navigate('/user/' + loggedInUser._id);
        } else if (name === 'Home') {
            navigate('/')
        }
        handleIconClick(name);
    };

    const handleIconClick = (name: string) => {
        setActiveIcon(name);
    };

    return (
        <nav className="user-controller-responsive flex row align-center">
            {icons.map((icon, index) =>
                <div key={index} className="icon-container-responsive pointer fs14" onClick={() => onIconClick(icon.name)}>
                    <Avatar
                        // className='icon-img'
                        src={activeIcon === icon.name ? icon.srcActive : icon.src}
                        alt={icon.alt}
                        className={icon.name === 'Profile' && activeIcon === 'Profile' ? 'circle-border ' : ''}
                    />
                    <span className='icon-name' style={activeIcon === icon.name ? { fontWeight: 'bold' } : {}}>{icon.name}</span>
                </div>
            )}
        </nav>
    )
}