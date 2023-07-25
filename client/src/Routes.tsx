import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactNode } from 'react';

import MainPage from './pages/MainPage';
import SignUp from './pages/User/SignUp';
import SignIn from './pages/User/SignIn';
import MyPage from './pages/User/MyPage';
import UserPage from './pages/User/UserPage';
import CurationWritePage from './pages/Curation/CurationWritePage';
import CurationEditPage from './pages/Curation/CurationEditPage';
import CurationDetailPage from './pages/Curation/CurationDetailPage';
import BestCurationPage from './pages/Curation/BestCurationPage';
import NewCurationPage from './pages/Curation/NewCurationPage';
import FrontError from './pages/error/FrontError';
import ServerError from './pages/error/ServerError';

export enum RoutePath {
  Root = '/',
  SignUp = '/register',
  SignIn = '/login',
  MyPage = '/mypage/*',
  MyInfoUpdate = '',
  MyWrittenPage = 'written/:page',
  MyLikePage = 'like/:page',
  MySubcriberPage = 'subscribe/:page',
  MyPageOut = 'out',
  UserPage = '/userpage/:memberId/*',
  UserWrittenPage = 'written/:page',
  UserLikePage = 'like/:page',
  Write = '/write',
  Edit = '/edit/:curationId',
  Detail = '/curations/:curationId',
  BestCuration = '/curation/best/:page',
  BestCategoryCuration = '/curation/best/:categoryId/:page',
  NewCuration = '/curation/new/:page',
  NewCategoryCuration = '/curation/new/:categoryId/:page',
  NotFoundError = '/error/404',
  ServerError = '/error/500',
}

const RouteProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path={RoutePath.Root} element={<MainPage />} />
        <Route path={RoutePath.SignUp} element={<SignUp />} />
        <Route path={RoutePath.SignIn} element={<SignIn />} />
        <Route path={RoutePath.MyPage} element={<MyPage />} />
        <Route path={RoutePath.UserPage} element={<UserPage />} />
        <Route path={RoutePath.Write} element={<CurationWritePage />} />
        <Route path={RoutePath.Edit} element={<CurationEditPage />} />
        <Route path={RoutePath.Detail} element={<CurationDetailPage />} />
        <Route path={RoutePath.BestCuration} element={<BestCurationPage />} />
        <Route path={RoutePath.BestCategoryCuration} element={<BestCurationPage />} />
        <Route path={RoutePath.NewCuration} element={<NewCurationPage />} />
        <Route path={RoutePath.NewCategoryCuration} element={<NewCurationPage />} />
        <Route path={RoutePath.NotFoundError} element={<FrontError />} />
        <Route path={RoutePath.ServerError} element={<ServerError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
