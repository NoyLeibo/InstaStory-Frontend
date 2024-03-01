import { Post } from "../models/posts.model";
export const postsData: Post[] = [
    {
        _id: 's102',
        createdAt: 1695902487423,
        txt: 'Loving the beach life!',
        imgUrl: '../img/story/beach.jpg',
        by: {
            _id: 'u102',
            fullname: 'Noy Leibo',
            imgUrl: 'https://res.cloudinary.com/dysh9q6ir/image/upload/v1706788350/%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_ngeib7.png',
        },
        loc: {
            lat: 33.91,
            lng: -118.41,
            name: 'Santa Monica',
        },
        comments: [
            {
                id: 'c2001',
                createdAt: 1696075287423,
                by: {
                    _id: 'u107',
                    fullname: 'Emily',
                    imgUrl: '../../public/img/faces/emily.png',
                },
                txt: 'Wow, looks amazing!',
            },
            {
                id: 'c2002',
                createdAt: 1682337687423,
                by: {
                    _id: 'u108',
                    fullname: 'John',
                    imgUrl: '../../public/img/faces/john.png',
                },
                txt: 'I miss this place!',
            },
        ],
        likedBy: [
            {
                _id: 'u107',
                fullname: 'Emily',
                imgUrl: '../../public/img/faces/emily.png',
            },
            {
                _id: 'u108',
                fullname: 'John',
                imgUrl: '../../public/img/faces/john.png',
            },
        ],
        tags: ['beach', 'sunset'],
    },
    {
        _id: 's103',
        createdAt: 1689076887423,
        txt: 'Exploring the mountains!',
        imgUrl: '../img/story/mountains.jpg',
        by: {
            _id: 'u103',
            fullname: 'Michael Brown',
            imgUrl: '../../public/img/faces/michael.png',
        },
        loc: {
            lat: 45.66,
            lng: -110.56,
            name: 'Rocky Mountains',
        },
        comments: [
            {
                id: 'c3001',
                createdAt: 1694865687423,
                by: {
                    _id: 'u109',
                    fullname: 'Alice',
                    imgUrl: '../../public/img/faces/alice.png',
                },
                txt: 'Breathtaking view!',
            },
        ],
        likedBy: [
            {
                _id: 'u109',
                fullname: 'Alice',
                imgUrl: '../../public/img/faces/alice.png',
            },
        ],
        tags: ['hiking', 'adventure'],
    },
    {
        _id: 's104',
        createdAt: 1698580887423,
        txt: 'Had an amazing time trying out street photography in New York. The energy of the city is just mesmerizing. Every corner tells a different story.',
        imgUrl: '../img/story/newyork.jpg',
        by: {
            _id: 'u104',
            fullname: 'Chris Johnson',
            imgUrl: '../../public/img/faces/chris.png',
        },
        loc: {
            lat: 40.71,
            lng: -74.01,
            name: 'New York City',
        },
        comments: [
            {
                id: 'c4001',
                createdAt: 1695729687423,
                by: {
                    _id: 'u110',
                    fullname: 'Sarah',
                    imgUrl: '../../public/img/faces/sarah.png',
                },
                txt: 'NYC is always full of surprises!',
            },
            {
                id: 'c4002',
                createdAt: 1699790487423,
                by: {
                    _id: 'u111',
                    fullname: 'Mike',
                    imgUrl: '../../public/img/faces/mike.png',
                },
                txt: 'These shots are incredible! I wish I could visit there as soon as possible!',
            },
        ],
        likedBy: [
            {
                _id: 'u110',
                fullname: 'Sarah',
                imgUrl: '../../public/img/faces/sarah.png',
            },
        ],
        tags: ['photography', 'urban'],
    },
    {
        _id: 's105',
        createdAt: 1680609687423,
        txt: "There's something profoundly serene about sunrises. Woke up early for this view and it was totally worth it. Nature's way of reminding us to enjoy every moment.",
        imgUrl: '../img/story/sunrise.jpg',
        by: {
            _id: 'u105',
            fullname: 'Linda Gates',
            imgUrl: '../../public/img/faces/linda.png',
        },
        loc: {
            lat: 34.05,
            lng: -118.24,
            name: 'Los Angeles',
        },
        comments: [
            {
                id: 'c5001',
                createdAt: 1695556887423,
                by: {
                    _id: 'u112',
                    fullname: 'Kevin',
                    imgUrl: '../../public/img/faces/kevin.png',
                },
                txt: 'This is stunning, Linda!',
            },
        ],
        likedBy: [
            {
                _id: 'u112',
                fullname: 'Kevin',
                imgUrl: '../../public/img/faces/kevin.png',
            },
            {
                _id: 'u113',
                fullname: 'Grace',
                imgUrl: '../../public/img/faces/grace.png',
            },
        ],
        tags: ['sunrise', 'nature'],
    },
]
