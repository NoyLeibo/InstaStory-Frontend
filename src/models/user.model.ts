import { Post } from "./posts.model"

export interface User {
    _id: any
    username: string
    password?: string
    fullname: string
    bio: string
    imgUrl: string | null;
    following: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    followers: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>
    savedPostsIds: string[]
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
    savedPostsIds?: string[];
    email?: string;
}
interface UserModuleState {
    onlineUser: User | null;
    isLoadingPage: boolean;
    users: User
}
interface PostsModuleState {
    posts: Post
}

export interface RootState {
    userModule: UserModuleState;
    postsModule: PostsModuleState;
    usersModule: UserModuleState
}