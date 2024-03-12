// import { stayService } from "../../services/stay.service";

import { Post } from "../../models/posts.model";
import { postsService } from "../../services/posts.service";

export const SET_POSTS = "SET_POSTS";
// export const REMOVE_STAY = "REMOVE_STAY";
// export const ADD_STAY = "ADD_STAY";
// export const UPDATE_STAY = "UPDATE_STAY";
// export const ADD_TO_CART = "ADD_TO_CART";
// export const CLEAR_CART = "CLEAR_CART";
// export const UNDO_REMOVE_STAY = "UNDO_REMOVE_STAY";
// export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// export const SET_IS_LOADING = "SET_IS_LOADING";
// export const SET_SELECTED_DATES = "SET_SELECTED_DATES";
// export const SET_GUESTS_NUMBER = "SET_GUESTS_NUMBER";
// export const SET_FILTER_BY = "SET_FILTER_BY";

const initialState = {
  posts: await postsService.getPosts()
}


export function postsReducer(state: PostsState = initialState, action: PostsAction): PostsState {
  var newState = state;
  // var stays;
  // var cart;

  switch (action.type) {
    case SET_POSTS:
      newState = { ...state, posts: action.posts };
      break;
    // case REMOVE_STAY:
    //   const lastRemovedstay = state.stays.find(
    //     (stay) => stay._id === action.stayId
    //   );
    //   stays = state.stays.filter((stay) => stay._id !== action.stayId);
    //   newState = { ...state, stays, lastRemovedstay };
    //   break;
    // case ADD_STAY:
    //   newState = { ...state, stays: [...state.stays, action.stay] };
    //   break;
    // case UPDATE_STAY:
    //   stays = state.stays.map((stay) =>
    //     stay._id === action.stay._id ? action.stay : stay
    //   );
    // newState = { ...state, stays };
    // break;
    default:
      break;
  }
  return newState;
}

interface PostsState {
  posts: Post[]
  // users: User[];
  // isLoadingPage: boolean
}
type PostsAction =
  { type: typeof SET_POSTS; posts: Post[] }