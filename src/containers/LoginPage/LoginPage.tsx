import React, { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/service/shared.service';
import './LoginPage.css';
import { RootState } from '../../app/rootReducer';
import { IloginUser } from '../../app/entity/constant';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { updateLoginError } from '../../containers/LoginPage/LoginPageSlice';
import { LoginShowcase } from '../../components/LoginShowcase/LoginShowcase';
import { Navbar } from '../../components/Navbar/Navbar';
export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const { isLoading: loginIsLoading } = useSelector((state: RootState) => state.LoginPageReducer);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<EventTarget>) => {
    dispatch(updateLoginError(''));
    e.preventDefault();
    if (userEmail && password) {
      const user: IloginUser = {
        email: userEmail.replace(/\s+/g, '').toLowerCase(),
        password: password.replace(/\s+/g, ''),
      };
      dispatch(loginUser(user));
    } else {
      dispatch(updateLoginError('Both fields are mandatory')); //setErrMessage('Both fields are mandatory');
      return;
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="login-background">
        <div className="login-form">
          <div className="ml-28">
            <LoginForm
              setUserEmail={setUserEmail}
              setPassword={setPassword}
              login={handleSubmit}
              loginIsLoading={loginIsLoading}
            />
          </div>
        </div>
        <LoginShowcase />
      </div>
    </div>
  );
};
