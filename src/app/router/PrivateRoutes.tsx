import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { APPLICATION_URL } from './applicationRoutes';
import { useSelector } from 'react-redux';
import { USER_TYPE } from '../entity/constant';
import { RootState } from '../rootReducer';
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
// import { ComingSoon } from '../../components/ComingSoon/ComingSoon';

// =========== School Component ============
import { School } from '../../containers/_school/School';

// =========== Course Component ============
import { Courses } from '../../containers/_courses/Courses';

export const PrivateRoutes: React.FC = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const [redirectToPath, setRedirectToPath] = useState('');

  useEffect(() => {
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
    } else {
      setRedirectToPath(APPLICATION_URL.LOGIN);
    }
  }, [loggedInUser]);

  return (
    <Switch>
      {/* ==== GLOBAL USER ROUTES ==== */}
      <Route path={APPLICATION_URL.SUPERADMIN} component={SuperAdmin} />
      <Route path={APPLICATION_URL.ADMIN} component={Admin} />
      <Route path={APPLICATION_URL.TUTOR} component={Tutor} />
      <Route path={APPLICATION_URL.STUDENT} component={Student} />
      {/* ==== LOCAL USER ROUTES ==== */}
      <Route path={APPLICATION_URL.SCHOOLSUPERADMIN} component={SchoolSuperAdmin} />
      <Route path={APPLICATION_URL.SCHOOLADMIN} component={SchoolAdmin} />
      <Route path={APPLICATION_URL.SCHOOLTUTOR} component={SchoolTutor} />
      <Route path={APPLICATION_URL.SCHOOLSTUDENT} component={SchoolStudent} />

      {/* <Route component={ComingSoon} /> */}

      {/* ==== SCHOOL ROUTES ==== */}
      <Route path={APPLICATION_URL.SCHOOL} component={School} />
      {/* ==== COURSE ROUTES ==== */}
      <Route path={APPLICATION_URL.COURSE} component={Courses} />

      <Redirect to={redirectToPath} />
    </Switch>
  );
};
