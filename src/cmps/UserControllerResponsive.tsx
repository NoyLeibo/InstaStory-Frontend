import Home from '/svg/home.svg'
import Search from '/svg/search.svg'
import Explore from '/svg/explore.svg'
import Create from '/svg/create.svg'

import HomeActive from '/svg/active/home-active.svg'
import SearchActive from '/svg/active/search-active.svg'
import CreateActive from '/svg/active/create-active.svg'
import ExploreActive from '/svg/active/explore-active.svg'
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
        else if (location.pathname.startsWith('/explore')) {
            setActiveIcon('Explore');
        }
        else if (location.pathname.startsWith('/search')) {
            setActiveIcon('Search');
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
            name: 'Search',
            src: Search,
            srcActive: SearchActive,
            alt: 'Search',
        },
        {
            name: 'Create',
            src: Create,
            srcActive: CreateActive,
            alt: 'Create',
        },
        {
            name: 'Explore',
            src: Explore,
            srcActive: ExploreActive,
            alt: 'Explore',
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
        } else if (name === 'Search' && loggedInUser?._id) {
            navigate('/search');
        } else if (name === 'Explore' && loggedInUser?._id) {
            navigate('/explore');
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