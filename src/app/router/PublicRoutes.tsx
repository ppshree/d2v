import { Switch, Redirect, Route } from 'react-router-dom';
import { APPLICATION_URL } from './ApplicationRoutes';
import { LoginPage } from '../../containers/LoginPage/LoginPage';
import { Navbar } from '../../components/Navbar/Navbar';
import { PasswordSetupPage } from '../../containers/PasswordSetupPage/PasswordSetupPage';
import { useEffect } from 'react';

export const PublicRoutes: React.FC = () => {
  useEffect(() => {
    //BUGFIX: localstorage clear having issues inside useeeffect //
    localStorage.setItem('loggedInUser', JSON.stringify({}));
    localStorage.removeItem('sessionToken');
    localStorage.clear();
  }, []);
  return (
    <div className="relative">
      <Navbar />
      <div className="login-background">
        <div className="login-form ml-28">
          <Switch>
            <Route exact path="/createPassword/:id" component={PasswordSetupPage}></Route>
            <Route exact path={APPLICATION_URL.LOGIN} component={LoginPage}></Route>
            <Redirect to={APPLICATION_URL.LOGIN} />
          </Switch>
        </div>
        <div className="showcase"></div>
      </div>
    </div>
  );
};
