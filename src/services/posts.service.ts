// // import { storageService } from './async-storage.service.js'
// import { httpService } from "./http.service.js";
// import { utilService } from "./util.service.js";
// import { userService } from "./user.service.js";

import { Comment, EmptyPost, Post } from "../models/posts.model";
import { storageService } from "./async-storage.service";
import { httpService } from "./http.service.ts";
// import { postsData } from "./postsData";
import { userService } from "./user.service.ts";

// const STORAGE_KEY = "posts";
const BASE_URL = "post/";
// _createPosts()

export const postsService = {
  getPosts,
  toggleLike,
  getEmptyComment,
  addComment,
  getEmptyFollower,
  getEmptyPost,
  addPost,
  getPostById,
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

async function getPosts(filterBy = {}): Promise<any> {
  // const posts = await storageService.query(STORAGE_KEY, 0, true);
  // return posts;
  return await httpService.get(BASE_URL, filterBy) // מוכן לBACK-END
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

    const postToUpdate = await httpService.put(BASE_URL, post)
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

async function getPostById(postId: string) {
  try {
    const post = await httpService.get(`post/${postId}`);
    // const post = await httpService.get(BASE_URL, postId)
    console.log('Post Service - getById - succesfuly got post obj by PostId')
    return post;
  } catch (err) {
    console.error('Post Service - getById - cannot get post obj by PostId')
    throw err
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

function getEmptyPost(): EmptyPost {
  return {
    createdAt: '',
    txt: '',
    imgUrl: '',
    by: {
      _id: '',
      username: '',
      imgUrl: '',
    },
    loc: {
      lat: 0,
      lng: 0,
      city: '',
    },
    comments: [],
    likedBy: [],
    tags: []
  }
}

async function addPost(post: EmptyPost) {
  try {
    const postToUpdate = await httpService.post(BASE_URL, post)
    console.log('Post to update from service', postToUpdate)
    return postToUpdate
  } catch (err) {
    console.log('Cannot get post in order to add post', err)
    throw err
  }
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
    const postToUpdate = await httpService.put(BASE_URL, post)
    console.log('Post to update from service', postToUpdate)
    return postToUpdate
  } catch (err) {
    console.log('Cannot get post in order to add comment', err)
    throw err
  }
}

// async function _createPosts(): Promise<any> {
//   try {
//     const posts = await getPosts()
//     // Check if users is empty (length is 0)
//     if (!posts.length) {
//       const posts: Post[] = postsData;
//       localStorage.setItem('posts', JSON.stringify(posts))
//     }
//     return posts

//   } catch (err) {
//     console.error('Error: cannot create posts from demo data', err)
//   }
// }

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
