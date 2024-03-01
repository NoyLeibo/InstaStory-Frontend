import Home from '../../public/svg/home.svg'
import Search from '../../public/svg/search.svg'
import Explore from '../../public/svg/explore.svg'
import Reels from '../../public/svg/reels.svg'
import Message from '../../public/svg/message.svg'
import Notification from '../../public/svg/notification.svg'
import Create from '../../public/svg/create.svg'
// import More from '../../public/svg/more.svg'

import HomeActive from '../../public/svg/active/home-active.svg'
import SearchActive from '../../public/svg/active/search-active.svg'
import ExploreActive from '../../public/svg/active/explore-active.svg'
import ReelsActive from '../../public/svg/active/reels-active.svg'
import MessageActive from '../../public/svg/active/message-active.svg'
import NotificationActive from '../../public/svg/active/notification-active.svg'
import CreateActive from '../../public/svg/active/create-active.svg'
// import MoreActive from '../../public/svg/active/more-active.svg'

interface UserControllerProps {
    activeIcon: string
    handleIconClick: (name: string) => void; // Define the function type
}

export function ControlIcons({ handleIconClick, activeIcon }: UserControllerProps) {

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
            name: 'Message',
            src: Message,
            srcActive: MessageActive,
            alt: 'Message',
        },
        {
            name: 'Notification',
            src: Notification,
            srcActive: NotificationActive,
            alt: 'Notification',
        },
        {
            name: 'Create',
            src: Create,
            srcActive: CreateActive,
            alt: 'Create',
        },
        // {
        //     name: 'More',
        //     src: More,
        //     srcActive: MoreActive,
        //     alt: 'More',
        // },
    ]



    return (
        <section className="flex column">
            {icons.map((icon, index) =>
                <div key={index} className="icon-container pointer flex align-center fs14" onClick={() => handleIconClick(icon.name)}>
                    <img
                        className='icon-img'
                        src={activeIcon === icon.name ? icon.srcActive : icon.src}
                        alt={icon.alt}
                    />
                    <span className='icon-name' style={activeIcon === icon.name ? { fontWeight: 'bold' } : {}}>{icon.name}</span>
                </div>
            )}
        </section>
    )
}