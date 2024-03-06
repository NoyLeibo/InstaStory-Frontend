// // import { storageService } from './async-storage.service.js'
// import { httpService } from "./http.service.js";
// import { utilService } from "./util.service.js";
// import { userService } from "./user.service.js";

import { Comment, Post } from "../models/posts.model";
import { storageService } from "./async-storage.service";
import { postsData } from "./postsData";
import { userService } from "./user.service.ts";

const STORAGE_KEY = "posts";
// const BASE_URL = "post/";
_createPosts()

export const postsService = {
  getPosts,
  toggleLike,
  getEmptyComment,
  addComment,
  getEmptyFollower,
  getEmptyPost,
  // query,
  // getById,
  // save,
  // remove,
  // getEmptyStay,
  // addStay,
  // addStayMsg,
  // addStayReview,
  // getDefaultFilter,
};
// window.cs = stayService;

async function getPosts(): Promise<any> {
  const posts = (await storageService.query(STORAGE_KEY))
  return posts;
  // return httpService.get(`posts`) // מוכן לBACK-END
}


async function _createPosts(): Promise<any> {

  try {
    const posts = await getPosts()
    // Check if users is empty (length is 0)
    if (!posts.length) {
      const posts: Post[] = postsData;
      localStorage.setItem('posts', JSON.stringify(posts))
    }
    return posts

  } catch (err) {
    console.error('Error: cannot create users from demo data', err)
  }
}

async function toggleLike(post: Post) {
  try {
    if (!post.likedBy) post.likedBy = []
    const user = userService.getLoggedinUser()

    if (!user) {
      console.error('Cannot toggle like - user is not logged in')
      throw new Error('Cannot toggle like - user is not logged in')
    }
    const userIdx = post.likedBy.findIndex((u) => u._id === user._id)

    if (userIdx === -1 && user._id && user.imgUrl) {
      post.likedBy.push({ _id: user._id, username: user.username, imgUrl: user.imgUrl })
      console.log('Liked by user:', user)
    } else {
      post.likedBy.splice(userIdx, 1) // Remove like
      console.log('Unliked by user:', user)
    }

    console.log('Updated post likedBy:', post.likedBy)

    const postToUpdate = await storageService.put(STORAGE_KEY, post)
    console.log('Story updated in storage:', postToUpdate)

    return post
  } catch (err) {
    console.error('Cannot toggle like', err)
    throw err
  }
}

function getEmptyComment() {
  return {
    id: '',
    createdAt: '',
    by: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    txt: '',
  }
}



function getEmptyFollower() {
  return (
    {
      _id: '',
      fullname: '',
      username: '',
      imgUrl: ''
    }
  )
}

function getEmptyPost() {
  return ({
    _id: '',
    createdAt: '',
    txt: '',
    imgUrl: '',
    by: {
      _id: '',
      username: '',
      imgUrl: '',
    },
    loc: {
      lat: '',
      lng: '',
      name: '',
    },
    comments: [],
    likedBy: [],
    tags: []
  })
}

async function addComment(post: Post, txt: string) {
  // Later, this is all done by the backend
  try {
    // const post = getById(post._Id)
    if (!post.comments) post.comments = []
    let user = userService.getLoggedinUser()
    const id = storageService.makeId()

    if (user && user._id && user.username && user.imgUrl) { // Ensuring imgUrl is not undefined
      const comment: Comment = {
        id,
        createdAt: Number(Date.now()),
        by: { _id: user?._id, username: user?.username, imgUrl: user?.imgUrl }, //TODO - consider saving mini-user instead of the whole user
        txt,
      }
      post.comments.push(comment)
    }
    const postToUpdate = await storageService.put(STORAGE_KEY, post)
    console.log('Story to update from service', postToUpdate)
    return postToUpdate
  } catch (err) {
    console.log('Cannot get story in order to add comment', err)
    throw err
  }
}


// async function query(filterBy = {}) {
//   return httpService.get(BASE_URL, filterBy);
// }

// function getById(stayId) {
//   return httpService.get(`stay/${stayId}`);
// }

// async function remove(stayId) {
//   return httpService.delete(`stay/${stayId}`);
// }

// // async function addStay(stay) {
// //   await httpService.post(`stay/`, stay);
// // }

// async function save(stay) {
//   var savedStay;
//   if (stay._id) {
//     savedStay = await httpService.put(`stay/${stay._id}`, stay);
//   } else {
//     savedStay = await httpService.post("stay", stay);
//   }
//   return savedStay;
// }

// async function addStayReview(stayId, review) {
//   const savedReview = await httpService.post(`stay/${stayId}/review`, {
//     txt: review,
//   });
//   return savedReview;
// }

// function getEmptyStay() {
//   return {
//     name: "",
//     price: 0,
//     type: "",
//     imgUrls: [],
//     summary: "",
//     roomType: "",
//     capacity: 0,
//     beds: 0,
//     rooms: 0,
//     bathrooms: 0,
//     amenities: [],
//     labels: [],
//     host: {
//       _id: "",
//       fullname: "",
//       thumbnailUrl: "",
//       hostingYears: 0,
//       about: "",
//       isSuperhost:false,
//     },
//     loc: {
//       area: "",
//       country: "",
//       countryCode: "",
//       city: "",
//       address: "",
//       lat: 0,
//       lng: 0,
//     },
//     reviews: [],
//     likedByUsers: [],
//   };
// }

// function getDefaultFilter() {
//   return {
//     placeType: [],
//     priceRange: [0, 2000],
//     bedrooms: "",
//     beds: "",
//     bathrooms: "",
//     selectedGuests: {
//       Adults: 0,
//       Children: 0,
//       Infants: 0,
//       Pets: 0,
//     },
//     selectedDates: { checkIn: null, checkOut: null },
//     selectedDestination: "",
//   };
// }
