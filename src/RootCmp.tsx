
import { Routes, Route } from 'react-router-dom';

import routes from "./routes";
import { Routemodel } from "./models/route.model";
import './assets/styles/main.scss'

function RootCmp() {
  return (
    <main className="main-container">
      <Routes>
        {routes.map((route: Routemodel) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </main>
  );
}

export default RootCmp;