import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { useEffect } from 'react';

function AppContent() {
  const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
  const { activeIcon, setActiveIcon } = useActiveIcon();
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  useEffect(() => {
    if (loggedInUser === null) navigate('/auth')

  }, [loggedInUser])
  useEffect(() => {
    if (activeIcon === 'Create') navigate('/')
  }, [activeIcon])

  return (
    <>
      {!currentPath.startsWith('/auth') && <UserController />}
      {!currentPath.startsWith('/auth') && <UserControllerResponsive loggedInUser={loggedInUser} />}
      {/*צריך שלא יתרנדר כשהמודל ברספונסיבי פתוח חשוב לבטל!!!!isCommentModalOpen && window.innerWidth <= 777  צריך להיות FALSE */}
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
