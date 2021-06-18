import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { SchoolList } from './modules/SchoolList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const School: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SCHOOL} />
          <Route exact path={APPLICATION_URL.SCHOOL_LIST} component={SchoolList}></Route>
          <Redirect to={APPLICATION_URL.SCHOOL} />
        </Switch>
      </MainLayout>
    </div>
  );
};
