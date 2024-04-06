import { useNavigate } from "react-router"
import { logout } from "../store/actions/user.actions"

export function ExploreUsers() {
    const navigate = useNavigate()

    function onLogOut() {
        logout()
    }

    return (
        <section>
            <header className="controller-logo-responsive flex space-between">
                <img onClick={() => navigate('/')} src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                <span onClick={() => onLogOut()} className='logout-btn pointer fs16'>Log out</span>
            </header>
            <h1>test</h1>
            {/* <div className="search-bar flex column ">
                <input type="text" className="margintop20 search-user flex align-center justify-center" onChange={(e) => setInput(e.target.value)} />
                {users && <UsersToShow users={users} />}
            </div> */}
        </section>
    )
}