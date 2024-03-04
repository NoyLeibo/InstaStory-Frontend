import { Post } from "../models/posts.model";
export const postsData: Post[] = [
    {
        _id: 's102',
        createdAt: 1709559776123,
        txt: 'Loving the beach life!',
        imgUrl: 'https://a.cdn-hotels.com/gdcs/production14/d1087/59523f11-21cb-4a60-8d14-c61ccac2da6e.jpg',
        by: {
            _id: 'u102',
            username: 'NoyLeibo',
            imgUrl: 'https://res.cloudinary.com/dysh9q6ir/image/upload/v1706788350/%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_ngeib7.png',
        },
        loc: {
            lat: 33.91,
            lng: -118.41,
            name: 'Santa Monica',
        },
        comments: [
            {
                id: 'u102',
                createdAt: 1696075287423,
                by: {
                    _id: 'u102',
                    username: 'NoyLeibo',
                    imgUrl: '',
                },
                txt: 'Wow, looks amazing!',
            },
            {
                id: 'c2002',
                createdAt: 1682337687423,
                by: {
                    _id: 'u108',
                    username: 'MichaelB',
                    imgUrl: '',
                },
                txt: 'I miss this place!',
            },
        ],
        likedBy: [
        ],
        tags: ['beach', 'sunset'],
    },
    {
        _id: 's103',
        createdAt: 1689076887423,
        txt: 'Exploring the mountains!',
        imgUrl: 'https://pics.craiyon.com/2023-09-26/aa2fbe35ce18489980f73a4acb336537.webp',
        by: {
            _id: 'u103',
            username: 'Almogk30',
            imgUrl: 'https://media-fra3-2.cdn.whatsapp.net/v/t61.24694-24/349164433_708480904412403_1842111394855506367_n.jpg?ccb=11-4&oh=01_AdTbO2dvR_fDCCfXQgkCDjmiZUHxOukEccMW1UAzE1ILyw&oe=65EF1C70&_nc_sid=e6ed6c&_nc_cat=107',
        },
        loc: {
            lat: 45.66,
            lng: -110.56,
            name: 'Rocky Mountains',
        },
        comments: [],
        likedBy: [],
        tags: ['hiking', 'adventure'],
    },
    {
        _id: 's104',
        createdAt: 1698580887423,
        txt: 'Had an amazing time trying out street photography in New York. The energy of the city is just mesmerizing. Every corner tells a different story.',
        imgUrl: 'https://res.cloudinary.com/jerrick/image/upload/v1551826906/zwkt0dtrpivfbflcf366.jpg',
        by: {
            _id: 'u104',
            username: 'nivamira',
            imgUrl: 'https://media-fra3-2.cdn.whatsapp.net/v/t61.24694-24/163534437_394257745873100_2694836356181667975_n.jpg?ccb=11-4&oh=01_AdQX55B6arbtFTPrpF9zzFjiYHRtEuVEqdUHtb6AIxvH2w&oe=65EEEAAB&_nc_sid=e6ed6c&_nc_cat=111',
        },
        loc: {
            lat: 40.71,
            lng: -74.01,
            name: 'New York City',
        },
        comments: [],
        likedBy: [],
        tags: ['photography', 'urban'],
    },
    {
        _id: 's105',
        createdAt: 1680609687423,
        txt: "There's something profoundly serene about sunrises. Woke up early for this view and it was totally worth it. Nature's way of reminding us to enjoy every moment.",
        imgUrl: 'https://www.surfertoday.com/images/stories/sunrise-sunset-facts.jpg',
        by: {
            _id: 'u105',
            username: 'niry',
            imgUrl: 'https://media-fra3-2.cdn.whatsapp.net/v/t61.24694-24/183330449_988500858400275_5412143777288048223_n.jpg?ccb=11-4&oh=01_AdQ6NQrMB2YME5OdqwpV_vW-RFhIMAkrHm6qLC2AB59HPg&oe=65EF1903&_nc_sid=e6ed6c&_nc_cat=101',
        },
        loc: {
            lat: 34.05,
            lng: -118.24,
            name: 'Los Angeles',
        },
        comments: [],
        likedBy: [],
        tags: ['sunrise', 'nature'],
    },
]
