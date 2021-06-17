import { BrowserRouter } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';
import { authenticateUser } from './service/shared.service';
import { signOut } from '../containers/LoginPage/LoginPageSlice';
import { PrivateRoutes } from './router/PrivateRoutes';
import { PublicRoutes } from './router/PublicRoutes';
import { LIST_OF_ROLES } from './entity/constant';
import { useTranslation } from 'react-i18next';
import './App.css';
import { useState } from 'react';

export const App: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isUserValid, setIsUserValid] = useState(false);
  const { loggedInUser, token, isAuthenticating } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    if (token) localStorage.setItem('sessionToken', token);
    if (token && loggedInUser?.role_id && LIST_OF_ROLES.includes('' + loggedInUser?.role_id)) {
      setIsUserValid(true);
    }
  }, [loggedInUser, token]);

  useEffect(() => {
    if (token && loggedInUser) {
      dispatch(authenticateUser());
    } else {
      dispatch(signOut());
    }
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading.....</div>}>
        {isAuthenticating ? <h1>Let me authenticate you...</h1> : isUserValid ? <PrivateRoutes /> : <PublicRoutes />}
      </Suspense>
    </BrowserRouter>
  );
};
