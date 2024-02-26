
export interface User {
    _id: string;
    username: string;
    password: string;
    fullname: string;
    imgUrl: string;
    following: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>;
    followers: Array<{ _id: string; fullname: string; username: string; imgUrl: string }>;
    savedStoryIds: string[];
}