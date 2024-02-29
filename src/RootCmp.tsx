
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import routes from "./routes";
import { Routemodel } from "./models/route.model";
import './assets/styles/main.scss'

function RootCmp() {
  return (
    <main className="main-container">
      <Provider store={store}>
        <Router>
          <Routes>
            {routes.map((route: Routemodel) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </Provider>

    </main>
  );
}

export default RootCmp;