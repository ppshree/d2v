/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IcreatePassword } from '../../app/entity/model';
import { RootState } from '../../app/rootReducer';
import { PasswordForm } from '../../components/PasswordForm/PasswordForm';
import { updateLoginError } from '../LoginPage/LoginPageSlice';

export const PasswordSetupPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const { isLoading: loginIsLoading } = useSelector((state: RootState) => state.LoginPageReducer);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: FormEvent<EventTarget>) => {
    dispatch(updateLoginError(''));
    e.preventDefault();
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        const passwordObj: IcreatePassword = {
          userId: id,
          password: password.replace(/\s+/g, ''),
          confirmPassword: confirmPassword.replace(/\s+/g, ''),
        };
      } else {
        dispatch(updateLoginError('Password is not matching'));
      }
    } else {
      dispatch(updateLoginError('Fields are mandatory'));
      return;
    }
  };
  return (
    <PasswordForm
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      confirm={handleSubmit}
      loginIsLoading={loginIsLoading}
    />
  );
};
