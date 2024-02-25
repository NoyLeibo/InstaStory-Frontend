import { Routemodel } from "./models/route.model.ts";
import { HomePage } from "./pages/HomePage.tsx";
// import { AboutUs } from "./pages/AboutUs.jsx";
// import { StayIndex } from "./pages/StayIndex.jsx";
// import { StayFilterBy } from "./pages/StayFilterBy.jsx";
// import { StayDetails } from "./pages/StayDetails.jsx";
// import { ReviewIndex } from "./pages/ReviewIndex.jsx";
// import { ChatApp } from "./pages/Chat.jsx";
// import { BackOffice } from "./pages/BackOffice.jsx";
// import { PaymentPage } from "./pages/PaymentPage.jsx";
// import { StayEdit } from "./pages/StayEdit.jsx";
// import { UserTrips } from "./pages/UserTrips.jsx";
// import { Wishlist } from "./pages/Wishlist.jsx";
// import { Messages } from "./pages/Messages.jsx";

// import React from "react";

// Define the Route interface
// interface Route {
//   path: string;
//   component: React.ReactNode;
//   label: string;
// }

const routes: Routemodel[] = [
  {
    path: '/',
    element: <HomePage />,
    label: 'Home 🏠',
  },
  // You can add more route objects following the same structure
];

export default routes;

