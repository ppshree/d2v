import { BrowserRouter } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { authenticateUser } from './service/shared.service';
import { signOut } from '../containers/LoginPage/LoginPageSlice';
import { RouterConfig } from './router/RouterConfig';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser, token } = useSelector((state: RootState) => state.LoginPageReducer);
  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    if (token) localStorage.setItem('sessionToken', token);
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
        <RouterConfig />
      </Suspense>
    </BrowserRouter>
  );
};
