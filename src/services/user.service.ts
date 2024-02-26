import { User } from "../models/user.model.ts";
import { storageService } from "./async-storage.service.ts";
import { userData } from "./userData.ts";


// const STORAGE_KEY_LOGGEDIN_USER: string = "loggedinUser";
// const BASE_URL = "auth/";

_createUsers()

export const userService = {
    getUsers,
}


async function getUsers(): Promise<any> {
    const users = (await storageService.query("user"))
    return users;
    // return httpService.get(`user`)
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
