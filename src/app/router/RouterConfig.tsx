import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { APPLICATION_URL } from './applicationRoutes';
import { useSelector } from 'react-redux';
import { USER_TYPE } from '../entity/constant';
import { RootState } from '../rootReducer';
import { LoginPage } from '../../containers/LoginPage/LoginPage';
import { Admin } from '../../containers/_admin/Admin';
import { Medic } from '../../containers/_medic/Medic';
import { Patient } from '../../containers/_patient/Patient';

export const RouterConfig: React.FC = () => {
  const { loggedInUser, isAuth } = useSelector((state: RootState) => state.LoginPageReducer);
  const [redirectToPath, setRedirectToPath] = useState('');

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.user_type == USER_TYPE.ADMIN) {
        setRedirectToPath(APPLICATION_URL.ADMIN);
      } else if (loggedInUser.user_type == USER_TYPE.MEDIC) {
        setRedirectToPath(APPLICATION_URL.MEDIC);
      } else if (loggedInUser.user_type == USER_TYPE.PATIENT) {
        setRedirectToPath(APPLICATION_URL.PATIENT);
      } else {
        setRedirectToPath(APPLICATION_URL.LOGIN);
      }
    } else {
      setRedirectToPath(APPLICATION_URL.LOGIN);
    }
  }, [loggedInUser]);

  return (
    <Switch>
      {/* <Route
        key={APPLICATION_URL.RESET_PASSWORD}
        path={APPLICATION_URL.RESET_PASSWORD}
        render={() => <ResetPasswordPage />}
      />
      <Route
        key={APPLICATION_URL.CREATE_PASSWORD}
        path={APPLICATION_URL.CREATE_PASSWORD}
        render={() => <ResetPasswordPage isCreatePasswordPage />}
      /> */}
      {isAuth &&
        loggedInUser.user_type == USER_TYPE.ADMIN && [
          <Route key={APPLICATION_URL.ADMIN} path={APPLICATION_URL.ADMIN} component={Admin} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.user_type == USER_TYPE.MEDIC && [
          <Route key={APPLICATION_URL.MEDIC} path={APPLICATION_URL.MEDIC} component={Medic}></Route>,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.user_type == USER_TYPE.PATIENT && [
          <Route key={APPLICATION_URL.PATIENT} path={APPLICATION_URL.PATIENT} component={Patient} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {!isAuth && [
        <Route key={APPLICATION_URL.LOGIN} exact path={APPLICATION_URL.LOGIN} component={LoginPage} />,
        <Redirect key={'redirect'} exact to={APPLICATION_URL.LOGIN} />,
      ]}
    </Switch>
  );
};
