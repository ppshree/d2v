import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { StudentList as StudentListForContentManager } from '../_superadmin/modules/StudentList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const ContentManager: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.CONTENTMANAGER_DASHBOARD} />
          <Route exact path={APPLICATION_URL.CONTENTMANAGER_DASHBOARD} component={Dashboard}></Route>
          <Route
            exact
            path={APPLICATION_URL.CONTENTMANAGER_STUDENT_LIST}
            component={StudentListForContentManager}
          ></Route>
          <Redirect to={APPLICATION_URL.CONTENTMANAGER_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
