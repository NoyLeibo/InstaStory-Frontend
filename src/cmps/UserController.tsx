// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
// import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { ControlIcons } from './ControlIcons';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useActiveIcon } from './ActiveIconContext';
import { logout } from '../store/actions/user.actions';


export function UserController() {

    const { activeIcon, setActiveIcon } = useActiveIcon();

    const handleIconClick = (name: string) => {
        setActiveIcon(name);
    };
    function onLogOut() {
        logout()
    }
    return (
        <nav className="user-controller flex column space-between">
            <section className="flex column">
                <img className='controller-logo pointer' src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                <InstagramIcon className='instagram-logo pointer' />
                <ControlIcons handleIconClick={handleIconClick} activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
            </section >
            <span onClick={() => onLogOut()} className='logout-btn pointer fs16'>Log out</span>
        </nav >
    )
}