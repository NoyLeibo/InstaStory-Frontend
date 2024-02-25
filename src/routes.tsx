import { Routemodel } from "./models/route.model.ts";
import { HomePage } from "./pages/HomePage.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";

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
];

export default routes;

