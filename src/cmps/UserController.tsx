// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
// import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { ControlIcons } from './ControlIcons';
import InstagramIcon from '@mui/icons-material/Instagram';
import LogoutIcon from '@mui/icons-material/Logout';
interface UserControllerProps {
    activeIcon: string
    setActiveIcon: React.Dispatch<React.SetStateAction<string>>;

}

export function UserController({ activeIcon, setActiveIcon }: UserControllerProps) {
    const handleIconClick = (name: string) => {
        setActiveIcon(name);
    };

    return (
        <nav className="user-controller flex column space-between">
            <section className="flex column">
                <img className='controller-logo pointer' src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                <InstagramIcon className='instagram-logo pointer' />
                <ControlIcons handleIconClick={handleIconClick} activeIcon={activeIcon} />
            </section >
            <span className='logout-btn pointer fs16'>Log out</span>
            <LogoutIcon className='logout-icon pointer' />
        </nav >
    )
}