import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { StudentList } from './modules/StudentList';
import { RootState } from '../../app/rootReducer';
//import { contactSupport, deleteAdminProfile } from '../../app/service/admin.service';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const Tutor: React.FC = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  //const {} = useSelector((state: RootState) => state.AdminHomePageReducer);
  useEffect(() => {
    //make api calls
  }, []);

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
