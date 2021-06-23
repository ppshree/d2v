import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { TutorList as TutorListForSchoolAdmin } from '../_superadmin/modules/TutorList';
import { ContentManagerList as ContentManagerListForSchoolAdmin } from '../_superadmin/modules/ContentManagerList';
import { StudentList as StudentListForSchoolAdmin } from '../_superadmin/modules/StudentList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const SchoolAdmin: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SCHOOLADMIN_DASHBOARD} />
          <Route exact path={APPLICATION_URL.SCHOOLADMIN_DASHBOARD} component={Dashboard}></Route>
          <Route exact path={APPLICATION_URL.SCHOOLADMIN_TUTOR_LIST} component={TutorListForSchoolAdmin}></Route>
          <Route
            exact
            path={APPLICATION_URL.SCHOOLADMIN_CONTENTMANAGER_LIST}
            component={ContentManagerListForSchoolAdmin}
          ></Route>
          <Route exact path={APPLICATION_URL.SCHOOLADMIN_STUDENT_LIST} component={StudentListForSchoolAdmin}></Route>
          <Redirect to={APPLICATION_URL.SCHOOLADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
