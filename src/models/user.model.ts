
export interface User {
    _id: string
    username: string
    password: string
    fullname: string
    bio: string
    imgUrl: string
    following: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    followers: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    savedStoryIds: string[]
}

interface UserState {
    onlineUser: User; // Assuming 'User' is an interface representing your user model
    // other user-related properties
}

export interface RootState {
    userModule: UserState;
}
