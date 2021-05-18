import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { APPLICATION_URL } from './applicationRoutes';
import { useSelector } from 'react-redux';
import { USER_TYPE } from '../entity/constant';
import { RootState } from '../rootReducer';
import { LoginPage } from '../../containers/LoginPage/LoginPage';

// =========== Global USER Components ===========
import { SuperAdmin } from '../../containers/_superadmin/SuperAdmin';
import { Admin } from '../../containers/_admin/Admin';
import { Tutor } from '../../containers/_tutor/Tutor';
import { Student } from '../../containers/_student/Student';

// =========== Local USER Components ==============
import { SchoolSuperAdmin } from '../../containers/_schoolsuperadmin/SchoolSuperAdmin';
import { SchoolAdmin } from '../../containers/_schooladmin/SchoolAdmin';
import { SchoolTutor } from '../../containers/_schooltutor/SchoolTutor';
import { SchoolStudent } from '../../containers/_schoolstudent/SchoolStudent';

export const RouterConfig: React.FC = () => {
  const { loggedInUser, isAuth } = useSelector((state: RootState) => state.LoginPageReducer);
  const [redirectToPath, setRedirectToPath] = useState('');

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.role_id == USER_TYPE.SUPERADMIN) {
        setRedirectToPath(APPLICATION_URL.SUPERADMIN);
      } else if (loggedInUser.role_id == USER_TYPE.ADMIN) {
        setRedirectToPath(APPLICATION_URL.ADMIN);
      } else if (loggedInUser.role_id == USER_TYPE.TUTOR) {
        setRedirectToPath(APPLICATION_URL.TUTOR);
      } else if (loggedInUser.role_id == USER_TYPE.STUDENT) {
        setRedirectToPath(APPLICATION_URL.STUDENT);
      } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
        setRedirectToPath(APPLICATION_URL.SCHOOLSUPERADMIN);
      } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
        setRedirectToPath(APPLICATION_URL.SCHOOLADMIN);
      } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
        setRedirectToPath(APPLICATION_URL.SCHOOLTUTOR);
      } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSTUDENT) {
        setRedirectToPath(APPLICATION_URL.SCHOOLSTUDENT);
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
      {/* ==== Global USER Routes ==== */}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.SUPERADMIN && [
          <Route key={APPLICATION_URL.SUPERADMIN} path={APPLICATION_URL.SUPERADMIN} component={SuperAdmin} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.ADMIN && [
          <Route key={APPLICATION_URL.ADMIN} path={APPLICATION_URL.ADMIN} component={Admin} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.TUTOR && [
          <Route key={APPLICATION_URL.TUTOR} path={APPLICATION_URL.TUTOR} component={Tutor} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.STUDENT && [
          <Route key={APPLICATION_URL.STUDENT} path={APPLICATION_URL.STUDENT} component={Student} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {/* ==== Local USER Routes ==== */}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN && [
          <Route
            key={APPLICATION_URL.SCHOOLSUPERADMIN}
            path={APPLICATION_URL.SCHOOLSUPERADMIN}
            component={SchoolSuperAdmin}
          />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.SCHOOLADMIN && [
          <Route key={APPLICATION_URL.SCHOOLADMIN} path={APPLICATION_URL.SCHOOLADMIN} component={SchoolAdmin} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR && [
          <Route key={APPLICATION_URL.SCHOOLTUTOR} path={APPLICATION_URL.SCHOOLTUTOR} component={SchoolTutor} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {isAuth &&
        loggedInUser.role_id == USER_TYPE.SCHOOLSTUDENT && [
          <Route key={APPLICATION_URL.SCHOOLSTUDENT} path={APPLICATION_URL.SCHOOLSTUDENT} component={SchoolStudent} />,
          <Redirect key={'redirect'} to={redirectToPath} />,
        ]}
      {/* ==== Login Route ==== */}
      {!isAuth && [
        <Route key={APPLICATION_URL.LOGIN} exact path={APPLICATION_URL.LOGIN} component={LoginPage} />,
        <Redirect key={'redirect'} exact to={APPLICATION_URL.LOGIN} />,
      ]}
    </Switch>
  );
};
