import Home from '../../public/svg/home.svg'
import Explore from '../../public/svg/explore.svg'
import Reels from '../../public/svg/reels.svg'
import Notification from '../../public/svg/notification.svg'
// import More from '../../public/svg/more.svg'

import HomeActive from '../../public/svg/active/home-active.svg'
import ExploreActive from '../../public/svg/active/explore-active.svg'
import ReelsActive from '../../public/svg/active/reels-active.svg'
import NotificationActive from '../../public/svg/active/notification-active.svg'
import { User } from '../models/user.model'
import { Avatar } from '@mui/material'
// import MoreActive from '../../public/svg/active/more-active.svg'

interface UserControllerResponsiveProps {
    activeIcon: string
    setActiveIcon: React.Dispatch<React.SetStateAction<string>>;
    loggedInUser: User | null;
}

export function UserControllerResponsive({ loggedInUser, activeIcon, setActiveIcon }: UserControllerResponsiveProps) {

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
            name: 'Reels',
            src: Reels,
            srcActive: ReelsActive,
            alt: 'Reels',
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
    const handleIconClick = (name: string) => {
        setActiveIcon(name);
    };

    return (
        <nav className="user-controller-responsive flex row align-center">
            {icons.map((icon, index) =>
                <div key={index} className="icon-container-responsive pointer fs14" onClick={() => handleIconClick(icon.name)}>
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