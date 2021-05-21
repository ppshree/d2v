import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { RootState } from '../../app/rootReducer';
import { useStylesCommon } from '../../app/style';
//import { contactSupport, deleteAdminProfile } from '../../app/service/admin.service';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const Student: React.FC = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  //const {} = useSelector((state: RootState) => state.AdminHomePageReducer);
  const classes = useStylesCommon();
  const [alertMessage, setAlertMessage] = useState<string>();
  const [alertMessageType, setAlertMessageType] = useState<'success' | 'error'>();
  const [alertMessageCloseFunction, setAlertMessageCloseFunction] = useState<VoidFunction>();

  useEffect(() => {
    //make api calls
  }, []);

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.STUDENT_DASHBOARD} />
          <Route exact path={APPLICATION_URL.STUDENT_DASHBOARD} component={Dashboard}></Route>
          <Redirect to={APPLICATION_URL.STUDENT_DASHBOARD} />
        </Switch>
      </MainLayout>
    </div>
  );
};
