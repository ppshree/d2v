import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useLocation } from 'react-router-dom';
import { APPLICATION_URL } from './applicationRoutes';
import { useSelector } from 'react-redux';
import { USER_TYPE } from '../entity/constant';
import { RootState } from '../rootReducer';
import { LoginPage } from '../../containers/LoginPage/LoginPage';
import { PasswordSetupPage } from '../../containers/PasswordSetupPage/PasswordSetupPage';

// =========== School Routes ==================
import { School } from '../../containers/_school/School';
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
  const location = useLocation();
  const { loggedInUser, isAuthCompleted } = useSelector((state: RootState) => state.LoginPageReducer);
  const [redirectToPath, setRedirectToPath] = useState('');
  const [passwordResetToken, setPasswordResetToken] = useState<string>('');

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
      } else if (loggedInUser.role_id == USER_TYPE.CONTENTMANAGER) {
        setRedirectToPath(APPLICATION_URL.CONTENTMANAGER);
      } else if (loggedInUser.role_id == USER_TYPE.SCHOOLCONTENTMANAGER) {
        setRedirectToPath(APPLICATION_URL.SCHOOLCONTENTMANAGER);
      } else if (location.pathname.includes(APPLICATION_URL.CREATE_PASSWORD.split(':id')[0])) {
        setPasswordResetToken(location.pathname.split('/createPassword/')[1]);
        setRedirectToPath(APPLICATION_URL.CREATE_PASSWORD);
      } else {
        setRedirectToPath(APPLICATION_URL.LOGIN);
      }
    } else {
      setRedirectToPath(APPLICATION_URL.LOGIN);
    }
  }, [loggedInUser, location]);

  const handleRedirectToPath = (path: string): string => {
    if (path === APPLICATION_URL.CREATE_PASSWORD) {
      return '/';
    } else {
      return path;
    }
  };

  return (
    <Switch>
      {isAuthCompleted && (loggedInUser.role_id == USER_TYPE.SUPERADMIN || loggedInUser.role_id == USER_TYPE.ADMIN) && (
        <Route key={APPLICATION_URL.SCHOOL} path={APPLICATION_URL.SCHOOL} component={School} />
      )}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.SUPERADMIN && (
        <Route key={APPLICATION_URL.SUPERADMIN} path={APPLICATION_URL.SUPERADMIN} component={SuperAdmin} />
      )}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.ADMIN && (
        <Route key={APPLICATION_URL.ADMIN} path={APPLICATION_URL.ADMIN} component={Admin} />
      )}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.TUTOR && (
        <Route key={APPLICATION_URL.TUTOR} path={APPLICATION_URL.TUTOR} component={Tutor} />
      )}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.STUDENT && (
        <Route key={APPLICATION_URL.STUDENT} path={APPLICATION_URL.STUDENT} component={Student} />
      )}
      {/* ==== Local USER Routes ==== */}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN && (
        <Route
          key={APPLICATION_URL.SCHOOLSUPERADMIN}
          path={APPLICATION_URL.SCHOOLSUPERADMIN}
          component={SchoolSuperAdmin}
        />
      )}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.SCHOOLADMIN && (
        <Route key={APPLICATION_URL.SCHOOLADMIN} path={APPLICATION_URL.SCHOOLADMIN} component={SchoolAdmin} />
      )}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR && (
        <Route key={APPLICATION_URL.SCHOOLTUTOR} path={APPLICATION_URL.SCHOOLTUTOR} component={SchoolTutor} />
      )}
      {isAuthCompleted && loggedInUser.role_id == USER_TYPE.SCHOOLSTUDENT && (
        <Route key={APPLICATION_URL.SCHOOLSTUDENT} path={APPLICATION_URL.SCHOOLSTUDENT} component={SchoolStudent} />
      )}
      {/* ==== Login Route ==== */}
      {!isAuthCompleted && redirectToPath === APPLICATION_URL.LOGIN && (
        <Route key={APPLICATION_URL.LOGIN} exact path={APPLICATION_URL.LOGIN} component={LoginPage} />
      )}
      {/* ==== Create Password Route ==== */}
      {!isAuthCompleted && redirectToPath === APPLICATION_URL.CREATE_PASSWORD && (
        <Route
          exact
          key={APPLICATION_URL.CREATE_PASSWORD}
          path={APPLICATION_URL.CREATE_PASSWORD}
          component={PasswordSetupPage}
        />
      )}
      <Redirect
        key={'redirect'}
        to={
          !location.pathname.includes('/createPassword/')
            ? handleRedirectToPath(redirectToPath)
            : !isAuthCompleted
            ? `/createPassword/${passwordResetToken}`
            : redirectToPath
        }
      />
    </Switch>
  );
};
