import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { AdminList } from './modules/AdminList';
import { TutorList } from './modules/TutorList';
import { StudentList } from './modules/StudentList';
import { useStylesCommon } from '../../app/style';
//import { contactSupport, deleteAdminProfile } from '../../app/service/admin.service';
import { Header } from '../Header/Header';
import { SideBar } from '../../components/SideBar/SideBar';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const SchoolSuperAdmin: React.FC = () => {
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
          <Redirect exact from={path} to={APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD} />
          <Route exact path={APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD} component={Dashboard}></Route>
          <Route exact path={APPLICATION_URL.SCHOOLSUPERADMIN_ADMIN_LIST} component={AdminList}></Route>
          <Route exact path={APPLICATION_URL.SCHOOLSUPERADMIN_TUTOR_LIST} component={TutorList}></Route>
          <Route exact path={APPLICATION_URL.SCHOOLSUPERADMIN_STUDENT_LIST} component={StudentList}></Route>
          <Redirect to={APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
