import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { Master } from './modules/Master';
import { AdminList } from './modules/AdminList';
import { TutorList } from './modules/TutorList';
import { ContentManagerList } from './modules/ContentManagerList';
import { SchoolList } from './modules/SchoolList';
import { StudentList } from './modules/StudentList';
import { RootState } from '../../app/rootReducer';
import { useStylesCommon } from '../../app/style';
//import { contactSupport, deleteAdminProfile } from '../../app/service/admin.service';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const SuperAdmin: React.FC = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  //const {} = useSelector((state: RootState) => state.AdminHomePageReducer);
  const classes = useStylesCommon();

  useEffect(() => {
    //make api calls
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
          <Route exact path={APPLICATION_URL.SUPERADMIN_SCHOOL_LIST} component={SchoolList}></Route>
          <Route exact path={APPLICATION_URL.SUPERADMIN_STUDENT_LIST} component={StudentList}></Route>
          <Redirect to={APPLICATION_URL.SUPERADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
