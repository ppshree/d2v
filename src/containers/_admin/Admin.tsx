import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { AdminList as AdminListForGlobalAdmin } from '../_superadmin/modules/AdminList';
import { TutorList as TutorListForGlobalAdmin } from '../_superadmin/modules/TutorList';
import { StudentList as StudentListForGlobalAdmin } from '../_superadmin/modules/StudentList';
import { ContentManagerList as ContentManagerListForGlobalAdmin } from '../_superadmin/modules/ContentManagerList';
import { TagList as TagListForGlobalAdmin } from '../_superadmin/modules/TagList';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const Admin: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.ADMIN_DASHBOARD} />
          <Route exact path={APPLICATION_URL.ADMIN_DASHBOARD} component={Dashboard}></Route>
          <Route exact path={APPLICATION_URL.ADMIN_ADMIN_LIST} component={AdminListForGlobalAdmin}></Route>
          <Route exact path={APPLICATION_URL.ADMIN_TUTOR_LIST} component={TutorListForGlobalAdmin}></Route>
          <Route exact path={APPLICATION_URL.ADMIN_STUDENT_LIST} component={StudentListForGlobalAdmin}></Route>
          <Route
            exact
            path={APPLICATION_URL.ADMIN_CONTENTMANAGER_LIST}
            component={ContentManagerListForGlobalAdmin}
          ></Route>
          <Route exact path={APPLICATION_URL.ADMIN_TAG_LIST} component={TagListForGlobalAdmin}></Route>
          <Redirect to={APPLICATION_URL.ADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
