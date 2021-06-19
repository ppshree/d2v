import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const SchoolStudent: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SCHOOLSTUDENT_DASHBOARD} />
          <Route exact path={APPLICATION_URL.SCHOOLSTUDENT_DASHBOARD} component={Dashboard}></Route>
          <Redirect to={APPLICATION_URL.SCHOOLSTUDENT_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
