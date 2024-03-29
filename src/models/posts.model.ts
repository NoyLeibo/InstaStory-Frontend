export interface UserMinimal {
    _id: string
    username: string;
    imgUrl: string;
}

export interface Comment {
    id: string;
    createdAt: number;
    by: UserMinimal;
    txt: string;
}

export interface Location {
    lat: number;
    lng: number;
    city: string;
}


export interface Post {
    _id: string;
    createdAt: any;
    txt: string;
    imgUrl: string;
    by: UserMinimal;
    loc: Location;
    comments: Comment[];
    likedBy: UserMinimal[]
    tags: string[];
}
export interface EmptyPost {
    createdAt: any;
    txt: string;
    imgUrl: string;
    by: UserMinimal;
    loc: Location;
    comments: Comment[];
    likedBy: UserMinimal[]
    tags: string[];
}
