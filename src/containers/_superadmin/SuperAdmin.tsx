import React, { useEffect } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { Master } from './modules/Master';
import { AdminList } from './modules/AdminList';
import { TutorList } from './modules/TutorList';
import { ContentManagerList } from './modules/ContentManagerList';
import { StudentList } from './modules/StudentList';
import { TagList } from './modules/TagList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const SuperAdmin: React.FC = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // make api calls
  }, []);

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SUPERADMIN_DASHBOARD} />
          <Route exact path={APPLICATION_URL.SUPERADMIN_DASHBOARD} component={Dashboard}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_MASTER} component={Master}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_ADMIN_LIST} component={AdminList}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_CONTENTMANAGER_LIST} component={ContentManagerList}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_TUTOR_LIST} component={TutorList}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_STUDENT_LIST} component={StudentList}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_TAG_LIST} component={TagList}></Route>
          <Redirect to={APPLICATION_URL.SUPERADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
