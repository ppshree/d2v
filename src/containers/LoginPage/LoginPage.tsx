import React, { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotKey, loginUser } from '../../app/service/shared.service';
import './LoginPage.css';
import { RootState } from '../../app/rootReducer';
import { IloginUser, USER_TYPE } from '../../app/entity/constant';
import { IresetKey } from '../../app/entity/model';
import { LandingPage } from '../../components/LandingPage/LandingPage';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { updateLoginError } from '../../containers/LoginPage/LoginPageSlice';
export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const { isLoading: loginIsLoading } = useSelector((state: RootState) => state.LoginPageReducer);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUser_Type] = useState<IloginUser['user_type']>();

  const handleSubmit = (e: FormEvent<EventTarget>) => {
    dispatch(updateLoginError(''));
    e.preventDefault();
    if (userEmail && password && user_type) {
      const user: IloginUser = {
        email: userEmail.replace(/\s+/g, '').toLowerCase(),
        secret_key: password.replace(/\s+/g, ''),
      };
      if (user_type == USER_TYPE.ADMIN || user_type == USER_TYPE.MEDIC || user_type == USER_TYPE.PATIENT) {
        dispatch(loginUser({ user, userType: user_type }));
      } else {
        dispatch(updateLoginError('Try another user type.'));
        return;
      }
    } else {
      dispatch(updateLoginError('Both fields are mandatory')); //setErrMessage('Both fields are mandatory');
      return;
    }
  };

  const forgotPassword = (e: FormEvent<EventTarget>) => {
    dispatch(updateLoginError(''));
    e.preventDefault();
    if (userEmail && user_type) {
      const user: IresetKey = {
        email: userEmail.replace(/\s+/g, '').toLowerCase(),
        user_type: user_type,
      };
      dispatch(forgotKey(user));
    } else {
      dispatch(updateLoginError('Email is mandatory'));
      return;
    }
  };

  return (
    <div className="login-background">
      {user_type ? (
        <LoginForm
          setUserEmail={setUserEmail}
          setPassword={setPassword}
          login={handleSubmit}
          forgotKey={forgotPassword}
          loginIsLoading={loginIsLoading}
          selectUserType={setUser_Type}
          userType={user_type}
        />
      ) : (
        <LandingPage selectUserType={setUser_Type} />
      )}
    </div>
  );
};
