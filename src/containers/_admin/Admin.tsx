import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { AdminList } from './modules/AdminList';
import { TutorList } from './modules/TutorList';
import { StudentList } from './modules/StudentList';
import { RootState } from '../../app/rootReducer';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const Admin: React.FC = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.ADMIN_DASHBOARD} />
          <Route exact path={APPLICATION_URL.ADMIN_DASHBOARD} component={Dashboard}></Route>
          <Route exact path={APPLICATION_URL.ADMIN_ADMIN_LIST} component={AdminList}></Route>
          <Route exact path={APPLICATION_URL.ADMIN_TUTOR_LIST} component={TutorList}></Route>
          <Route exact path={APPLICATION_URL.ADMIN_STUDENT_LIST} component={StudentList}></Route>
          <Redirect to={APPLICATION_URL.ADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
