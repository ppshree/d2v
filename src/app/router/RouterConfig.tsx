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
  const { loggedInUser, isAuthCompleted } = useSelector((state: RootState) => state.LoginPageReducer);
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
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.SUPERADMIN && [
          <Route key={APPLICATION_URL.SUPERADMIN} path={APPLICATION_URL.SUPERADMIN} component={SuperAdmin} />,
        ]}
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.ADMIN && [
          <Route key={APPLICATION_URL.ADMIN} path={APPLICATION_URL.ADMIN} component={Admin} />,
        ]}
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.TUTOR && [
          <Route key={APPLICATION_URL.TUTOR} path={APPLICATION_URL.TUTOR} component={Tutor} />,
        ]}
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.STUDENT && [
          <Route key={APPLICATION_URL.STUDENT} path={APPLICATION_URL.STUDENT} component={Student} />,
        ]}
      {/* ==== Local USER Routes ==== */}
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN && [
          <Route
            key={APPLICATION_URL.SCHOOLSUPERADMIN}
            path={APPLICATION_URL.SCHOOLSUPERADMIN}
            component={SchoolSuperAdmin}
          />,
        ]}
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.SCHOOLADMIN && [
          <Route key={APPLICATION_URL.SCHOOLADMIN} path={APPLICATION_URL.SCHOOLADMIN} component={SchoolAdmin} />,
        ]}
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR && [
          <Route key={APPLICATION_URL.SCHOOLTUTOR} path={APPLICATION_URL.SCHOOLTUTOR} component={SchoolTutor} />,
        ]}
      {isAuthCompleted &&
        loggedInUser.role_id == USER_TYPE.SCHOOLSTUDENT && [
          <Route key={APPLICATION_URL.SCHOOLSTUDENT} path={APPLICATION_URL.SCHOOLSTUDENT} component={SchoolStudent} />,
        ]}
      {/* ==== Login Route ==== */}
      {!isAuthCompleted && redirectToPath === APPLICATION_URL.LOGIN && (
        <Route key={APPLICATION_URL.LOGIN} exact path={APPLICATION_URL.LOGIN} component={LoginPage} />
      )}
      <Redirect key={'redirect'} to={redirectToPath} />
    </Switch>
  );
};
