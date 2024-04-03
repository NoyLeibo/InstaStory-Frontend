import { useEffect, useState } from "react";
import { RootState, User } from "../models/user.model";
import { useSelector } from "react-redux";
import { loadUsers, logout } from "../store/actions/user.actions";
import { UsersToShow } from "../cmps/UsersToShow.tsx";
import { useNavigate } from "react-router";

export function SearchUsers() {
    const [input, setInput] = useState<string>('');
    const [users, setUsers] = useState<User[] | null>(null);
    const allUsers: any = useSelector((state: RootState) => state.userModule.users)
    let navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        console.log('users', users);
    }, [users])

    useEffect(() => {
        setUsers(searchUsersFromInput(input))
    }, [input])

    function searchUsersFromInput(input: string) {
        if (!input || !input.split('').every(char => isValidLetter(char.toLowerCase().charCodeAt(0)))) {
            return null;
        }

        const usersToReturn = allUsers.filter((user: User) => {
            return user.username.startsWith(input)
        });
        return usersToReturn;
    }

    function isValidLetter(number: number) {
        console.log(number);

        if ((number >= 65 && number <= 90) || (number >= 97 && number <= 122)) return true
        return false
    }
    function onLogOut() {
        logout()
    }

    return (
        <section>
            <header className="controller-logo-responsive flex space-between">
                <img onClick={() => navigate('/')} src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                <span onClick={() => onLogOut()} className='logout-btn pointer fs16'>Log out</span>
            </header>
            <div className="search-bar flex column ">
                <input type="text" className="margintop20 search-user flex align-center justify-center" onChange={(e) => setInput(e.target.value)} />
                {users && <UsersToShow users={users} />}
            </div>
        </section>
    )
}