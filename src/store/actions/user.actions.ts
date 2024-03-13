// import { userService } from "../../services/user.service.js";
// import { socketService } from "../../services/socket.service.js";
// import { showErrorMsg } from "../../services/event-bus.service.js";
// import { LOADING_DONE, LOADING_START } from "./system.reducer.js";

import { store } from "../store.ts";
import { LOADING_DONE, LOADING_START, SET_USER, SET_USERS } from "../reducers/user.reducer.ts";
import { userService } from "../../services/user.service.ts";
import { User, emptyUser } from "../../models/user.model.ts";
import { Post } from "../../models/posts.model.ts";
import { storageService } from "../../services/async-storage.service.ts";
import { useNavigate } from "react-router";


export async function signup(credentials: emptyUser) {
  try {
    store.dispatch({ type: LOADING_START });
    await userService.signup(credentials)
    await loadUsers()
    login(credentials)
    store.dispatch({ type: SET_USERS, users: [] }); // Wrap user in an array
  } catch (err) {
    console.log('Cannot signup', err);
    throw err;
  }
  finally {
    store.dispatch({ type: LOADING_DONE });
  }
}

function isCompleteUser(user: any): user is User {
  return user && typeof user._id === 'string'; // Implement additional checks as needed
}

export async function login(credentials: { username: string, password: string }) {
  try {
    store.dispatch({ type: LOADING_START });

    const user = await userService.login(credentials);
    if (isCompleteUser(user)) {
      store.dispatch({ type: SET_USER, user: user });
      console.log('Logging in with:', user);
      return true;
    } else {
      // Handle incomplete user object
      console.log('Incomplete user object');
    }
  } catch (err) {
    console.log("Cannot login", err);
    throw err;
  }
  finally {
    store.dispatch({ type: LOADING_DONE });
  }
}

export async function logout() {
  try {
    await userService.logout();
    store.dispatch({
      type: SET_USER, user: null
    })

    // socketService.logout();
    // refreshPage();
  } catch (err) {
    console.log("Cannot logout", err);
    throw err;
  }
}


export async function savePostAction(loggedInUser: User, post: Post) {
  const users = await userService.getUsers();
  users.forEach(async (user: User) => {
    if (user._id === loggedInUser._id && Array.isArray(user.savedPostsIds)) {
      const index = user.savedPostsIds.indexOf(post._id);
      if (index === -1) { // לא קיים במערך
        user.savedPostsIds.push(post._id);
      } else { // אחרת הוא קיים במערך ואז צריך למחוק אותו
        user.savedPostsIds = user.savedPostsIds.filter(id => id !== post._id);
      }
      await storageService.put("user", user) // שומר ב LocalStorage
      store.dispatch({ type: SET_USER, user: user }); // מעדכן את הOnlineUser בReducer (חנות)
      userService.saveLocalUser(user) // שומר ב Session-Storage
    }
  })
}


export async function onLoggedInUserActions(userToSave: User) {
  await storageService.put("user", userToSave) // שומר ב LocalStorage
  userService.saveLocalUser(userToSave) // שומר ב Session-Storage
  store.dispatch({ type: SET_USER, user: userToSave }); // מעדכן את הOnlineUser בReducer (חנות)

  loadUsers()
}

export async function loadUsers() {
  try {
    const users = await userService.getUsers()
    // console.log('users', users);

    store.dispatch({ type: SET_USERS, users });
  } catch (err) {
    console.log("UserActions: err in loadUsers", err);
  }
}


// try {
//     const stays = await userService.getUsers();
//     store.dispatch({
//       type: SET_USERS,
//       stays,
//     });

// export async function removeUser(userId) {
//   try {
//     await userService.remove(userId);
//     store.dispatch({ type: REMOVE_USER, userId });
//   } catch (err) {
//     console.log("UserActions: err in removeUser", err);
//   }
// }


// export async function signup(credentials) {
//   try {
//     const user = await userService.signup(credentials);
//     store.dispatch({
//       type: SET_USER,
//       user,
//     });
//     socketService.login(user);
//     return user;
//   } catch (err) {
//     console.log("Cannot signup", err);
//     throw err;
//   }
// }
// function refreshPage() {
//   window.location.reload(false);
// }



// export async function updateUser(user) {
//   try {
//     store.dispatch({
//       type: SET_USER,
//       user,
//     });
//   } catch (err) {
//     console.log("Cannot logout", err);
//     throw err;
//   }
// }

// export async function loadUser(userId) {
//   try {
//     const user = await userService.getById(userId);
//     store.dispatch({ type: SET_WATCHED_USER, user });
//   } catch (err) {
//     showErrorMsg("Cannot load user");
//     console.log("Cannot load user", err);
//   }
// }
