import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { SuperAdminSchoolList } from './modules/SuperAdminSchoolList';
import { AdminSchoolList } from './modules/AdminSchoolList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const School: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SCHOOL} />
          <Route exact path={APPLICATION_URL.SCHOOL_SUPERADMIN} component={SuperAdminSchoolList}></Route>
          <Route exact path={APPLICATION_URL.SCHOOL_ADMIN} component={AdminSchoolList}></Route>
          <Redirect to={APPLICATION_URL.SCHOOL} />
        </Switch>
      </MainLayout>
    </div>
  );
};
