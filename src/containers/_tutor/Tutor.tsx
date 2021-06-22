import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { StudentList } from './modules/StudentList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const Tutor: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.TUTOR_DASHBOARD} />
          <Route exact path={APPLICATION_URL.TUTOR_DASHBOARD} component={Dashboard}></Route>
          <Route exact path={APPLICATION_URL.TUTOR_STUDENT_LIST} component={StudentList}></Route>
          <Redirect to={APPLICATION_URL.TUTOR_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
