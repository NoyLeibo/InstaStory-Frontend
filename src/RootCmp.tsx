import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// This is the child component that will have access to the Redux store through context
function AppContent() {
  const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
  const { activeIcon, setActiveIcon } = useActiveIcon();

  return (
    <>
      <UserController />
      <UserControllerResponsive loggedInUser={loggedInUser} />
      <Routes>
        {routes.map((route: Routemodel) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

      </Routes>
      {activeIcon === 'Create' && <CreateImage loggedInUser={loggedInUser} setActiveIcon={setActiveIcon} activeIcon={activeIcon} />}
    </>
  );
}

// The top-level component that provides the Redux store
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
