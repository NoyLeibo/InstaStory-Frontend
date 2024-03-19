import { User } from "../models/user.model.ts";
// import { storageService } from "./async-storage.service.ts";
import { httpService } from "./http.service.ts";
// import { userData } from "./userData.ts";


const STORAGE_KEY_LOGGEDIN_USER: string = "loggedinUser";
// const BASE_URL = "auth/";

// _createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    createEmptyUser,
    getUsers,
    getById,
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

async function getById(userId: string) {
    try {
        const user = await httpService.get(`user/${userId}`);
        // const user = await storageService.get('user', userId)
        console.log('User Service - getById - succesfuly got user obj by userId')
        return user;
    } catch (err) {
        console.error('User Service - getById - cannot get user obj by userId')
        throw err
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    return await httpService.post("auth/logout");
}

async function getUsers(): Promise<any> {
    // const users = (await storageService.query("user"))
    // return users;
    return await httpService.get(`user`) // מוכן לBACK-END
}

// async function _createUsers(): Promise<any> {

//     try {
//         const users = await getUsers()
//         if (!users.length) {
//             const users: User[] = userData;
//             localStorage.setItem('user', JSON.stringify(users))
//         }
//         return users

//     } catch (err) {
//         console.error('Error: cannot create users from demo data', err)
//     }
// }

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
    const users = await getUsers()
    const user = await httpService.post("auth/login", userCred);
    // const user = users.find((user) => user.username === userCred.username && user.password === userCred.password);
    // if (user) return saveLocalUser(user);

    if (user) {
        const userToStorage = users.find((user: User) => user.username === userCred.username);
        saveLocalUser(userToStorage)
        return user
    }
    return Promise.reject("Invalid user");
}


async function signup(userCred: User) {
    // await storageService.post("user", userCred);
    await httpService.post("auth/signup", userCred);
    saveLocalUser(userCred)
    // return await login(userCred);

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
        savedPostsIds: user.savedPostsIds,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userForSession))
    return userForSession
}

function createEmptyUser() {
    return {
        // _id: '',
        username: '',
        password: '',
        fullname: '',
        bio: '',
        imgUrl: '',
        following: [],
        followers: [],
        savedPostsIds: [],
    }
}


function getLoggedinUser(): User | null {
    const item = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
    if (item) {
        return JSON.parse(item) as User;
    }
    return null;
}