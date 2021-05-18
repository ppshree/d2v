import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Dashboard } from './modules/Dashboard';
import { RootState } from '../../app/rootReducer';
import { useStylesCommon } from '../../app/style';
//import { contactSupport, deleteAdminProfile } from '../../app/service/admin.service';
import { Header } from '../Header/Header';
import { SideBar } from '../../components/SideBar/SideBar';

export const Tutor: React.FC = () => {
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
    <div className={classes.root} style={{ height: '100%' }}>
      <Header />
      <SideBar />
      <main className={classes.content}>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.TUTOR_DASHBOARD} />
          <Route exact path={APPLICATION_URL.TUTOR_DASHBOARD} component={Dashboard}></Route>
          <Redirect to={APPLICATION_URL.TUTOR_DASHBOARD} />
        </Switch>
      </main>
    </div>
  );
};
