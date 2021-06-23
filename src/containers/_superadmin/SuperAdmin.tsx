/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { AdminList as AdminListForSuperAdmin } from './modules/AdminList';
import { TutorList as TutorListForSuperAdmin } from './modules/TutorList';
import { ContentManagerList as ContentManagerListForSuperAdmin } from './modules/ContentManagerList';
import { StudentList as StudentListForSuperAdmin } from './modules/StudentList';
import { TagList as TagListForSuperAdmin } from './modules/TagList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const SuperAdmin: React.FC = () => {
  const { path } = useRouteMatch();
  const { t } = useTranslation();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SUPERADMIN_DASHBOARD} />
          <Route exact path={APPLICATION_URL.SUPERADMIN_DASHBOARD} component={Dashboard}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_ADMIN_LIST} component={AdminListForSuperAdmin}></Route>
          <Route
            exact
            path={APPLICATION_URL.SUPERADMIN_CONTENTMANAGER_LIST}
            component={ContentManagerListForSuperAdmin}
          ></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_TUTOR_LIST} component={TutorListForSuperAdmin}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_STUDENT_LIST} component={StudentListForSuperAdmin}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_TAG_LIST} component={TagListForSuperAdmin}></Route>
          <Redirect to={APPLICATION_URL.SUPERADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
