import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { AdminList as AdminListForSchoolSuperAdmin } from '../_superadmin/modules/AdminList';
import { TutorList as TutorListForSchoolSuperAdmin } from '../_superadmin/modules/TutorList';
import { ContentManagerList as ContentManagerListForSchoolSuperAdmin } from '../_superadmin/modules/ContentManagerList';
import { StudentList as StudentListForSchoolSuperAdmin } from '../_superadmin/modules/StudentList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const SchoolSuperAdmin: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD} />
          <Route exact path={APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD} component={Dashboard}></Route>
          <Route
            exact
            path={APPLICATION_URL.SCHOOLSUPERADMIN_ADMIN_LIST}
            component={AdminListForSchoolSuperAdmin}
          ></Route>
          <Route
            exact
            path={APPLICATION_URL.SCHOOLSUPERADMIN_TUTOR_LIST}
            component={TutorListForSchoolSuperAdmin}
          ></Route>
          <Route
            exact
            path={APPLICATION_URL.SCHOOLSUPERADMIN_CONTENTMANAGER_LIST}
            component={ContentManagerListForSchoolSuperAdmin}
          ></Route>
          <Route
            exact
            path={APPLICATION_URL.SCHOOLSUPERADMIN_STUDENT_LIST}
            component={StudentListForSchoolSuperAdmin}
          ></Route>
          <Redirect to={APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
