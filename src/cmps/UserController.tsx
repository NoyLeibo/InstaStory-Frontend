// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
// import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { ControlIcons } from './ControlIcons';

interface UserControllerProps {
    activeIcon: string
    setActiveIcon: React.Dispatch<React.SetStateAction<string>>;
}

export function UserController({ activeIcon, setActiveIcon }: UserControllerProps) {


    return (
        <section className="user-controller flex column">
            <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
            <ControlIcons activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
        </section>
    )
}