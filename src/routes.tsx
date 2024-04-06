import { Routemodel } from "./models/route.model.ts";
import { HomePage } from "./pages/HomePage.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { SearchUsers } from "./pages/SearchUsers.tsx";
import { ExploreUsers } from "./pages/ExploreUsers.tsx";

const routes: Routemodel[] = [

  {
    path: '/',
    element: <HomePage />,
    label: 'Home 🏠',
  },

  {
    path: '/auth',
    element: <AuthPage />,
    label: 'Auth 🏠',
  },
  {
    path: '/user/:id',
    element: <ProfilePage />,
    label: 'Profile',
  },
  {
    path: '/search',
    element: <SearchUsers />,
    label: 'Search',
  },
  {
    path: '/explore',
    element: <ExploreUsers />,
    label: 'Explore',
  },

];

export default routes;

