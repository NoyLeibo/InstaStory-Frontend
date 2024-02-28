
export interface User {
    _id: string | undefined
    username: string
    password?: string
    fullname: string
    bio: string
    imgUrl: string | null;
    following: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    followers: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    savedStoryIds: string[]
    email?: string;

}

export interface emptyUser {
    _id?: string;
    username: string;
    password: string;
    fullname: string;
    bio: string;
    imgUrl: string | null;
    following?: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    followers?: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    savedStoryIds?: string[];
    email?: string;
}

interface UserModuleState {
    onlineUser: User | null;
    // Include other state properties of userModule here if there are any
}
export interface RootState {
    userModule: UserModuleState;
    // Define other modules in the root state here
}