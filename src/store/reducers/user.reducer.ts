import { User } from '../../models/user.model.ts'
import { userService } from '../../services/user.service.ts'

export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'


const initialState = {
    onlineUser: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state: UserState = initialState, action: UserAction): UserState {
    let newState = state;

    switch (action.type) {
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId),
            };
            break;
        case SET_USER:
            newState = { ...state, onlineUser: action.user }
            break
        case SET_USERS:
            newState = { ...state, users: action.users };
            break;
        default:
    }

    // Debugging log, consider removing or guarding with development check
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;
}


interface UserState {
    onlineUser: User | null;
    users: User[];
}

type UserAction =
    | { type: typeof REMOVE_USER; userId: string }
    | { type: typeof SET_USERS; users: User[] }
    | { type: typeof SET_USER; user: User }