import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import routes from "./routes";
import { Routemodel } from "./models/route.model";
import './assets/styles/main.scss';
import { UserController } from './cmps/UserController';
import { UserControllerResponsive } from './cmps/UserControllerResponsive';
import { RootState } from './models/user.model';
import { ActiveIconProvider, useActiveIcon } from './cmps/ActiveIconContext';
import { CreateImage } from './cmps/CreateImage';

function AppContent() {
  const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
  const { activeIcon, setActiveIcon } = useActiveIcon();
  const location = useLocation()

  const currentPath = location.pathname

  return (
    <>
      {!currentPath.startsWith('/auth') && <UserController />}
      {!currentPath.startsWith('/auth') && <UserControllerResponsive loggedInUser={loggedInUser} />}
      <Routes>
        {routes.map((route: Routemodel) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

      </Routes>
      {!currentPath.startsWith('/auth') && activeIcon === 'Create' && <CreateImage loggedInUser={loggedInUser} setActiveIcon={setActiveIcon} />}
    </>
  );
}

const RootCmp: React.FC = () => {
  return (
    <Provider store={store}>
      <ActiveIconProvider>
        <Router>
          <AppContent />
        </Router>
      </ActiveIconProvider>
    </Provider>
  );
}

export default RootCmp;
