import { User } from "../models/user.model.ts";
import { storageService } from "./async-storage.service.ts";
import { userData } from "./userData.ts";


const STORAGE_KEY_LOGGEDIN_USER: string = "loggedinUser";
// const BASE_URL = "auth/";

_createUsers()

export const userService = {
    login,
    // logout,
    // signup,
    getLoggedinUser,
    // saveLocalUser,
    getUsers,
    // getById,
    // remove,
    // update,
    // updateTripList,
    // removeTrip,
    // updateWishlist,
    // updateReservationGuest,
    // updateHostReservation,
    // removeTripHost,
    // addDemoUser,
};


async function getUsers(): Promise<any> {
    const users = (await storageService.query("user"))
    return users;
    // return httpService.get(`user`) // מוכן לBACK-END
}

async function _createUsers(): Promise<any> {

    try {
        const users = await getUsers()
        // Check if users is empty (length is 0)
        if (!users.length) {
            const users: User[] = userData;
            localStorage.setItem('user', JSON.stringify(users))
        }
        return users

    } catch (err) {
        console.error('Error: cannot create users from demo data', err)
    }
}

// async function login(userCred) { // מוכן לBACK-END
//     const user = await httpService.post("auth/login", userCred);
//     if (user) return saveLocalUser(user);
//     return Promise.reject("Invalid user");
//   }

interface UserCredentials {
    username: string;
    password: string
}

async function login(userCred: UserCredentials) {
    const users: User[] = await storageService.query('user');
    const user = users.find((user) => user.username === userCred.username && user.password === userCred.password);
    if (user) return saveLocalUser(user);
}

function saveLocalUser(user: User) {
    const userForSession = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        bio: user.bio,
        imgUrl: user.imgUrl,
        following: user.following,
        followers: user.followers,
        savedStoryIds: user.savedStoryIds,
    }
    sessionStorage.setItem(
        STORAGE_KEY_LOGGEDIN_USER,
        JSON.stringify(userForSession)
    )
    return userForSession
}

function createEmptyUser() {
    return {
        _id: '',
        username: '',
        password: '',
        fullname: '',
        bio: '',
        imgUrl: '',
        following: [],
        followers: [],
        savedStoryIds: [],
    }
}


function getLoggedinUser(): User | null {
    const item = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
    if (item) {
        return JSON.parse(item) as User;
    }
    return null;
}