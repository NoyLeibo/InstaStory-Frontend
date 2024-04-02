import { useEffect, useState } from "react";
import { RootState, User } from "../models/user.model";
import { useSelector } from "react-redux";
import { loadUsers } from "../store/actions/user.actions";
import { UsersToShow } from "../cmps/UsersToShow.tsx";

export function SearchUsers() {
    const [input, setInput] = useState<string>('');
    const [users, setUsers] = useState<User[] | null>(null);
    const allUsers: any = useSelector((state: RootState) => state.userModule.users)

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

    return (
        <section className="search-bar flex column align-center">
            <input type="text" className="margintop20" onChange={(e) => setInput(e.target.value)} />
            {users && <UsersToShow users={users} />}
        </section>
    )
}