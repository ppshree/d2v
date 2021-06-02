import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import './LoginForm.css';
import { AlertBar } from '../shared/AlertBar';
import { DEFAULT } from '../../app/entity/constant';
import { updateLoginError } from '../../containers/LoginPage/LoginPageSlice';

interface LoginFormProps {
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  login: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  loginIsLoading: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ setUserEmail, setPassword, login, loginIsLoading }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loginTitle, setLoginTitle] = useState<string>(DEFAULT.LOGINTITLE);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { loginError: errMessage } = useSelector((state: RootState) => state.LoginPageReducer);

  return (
    <div className="popUp-container">
      <div className="flex flex-col h-full justify-evenly">
        <div className="login-title-section">
          <h3 className="login-title">{loginTitle}</h3>
          {!isLogin && (
            <p className="text-gray-500 w-full font-light">
              Enter a registered email/mobile number associated with your account to reset the password
            </p>
          )}
        </div>
        {errMessage && <AlertBar message={errMessage} />}
        <form className="flex flex-col h-60 justify-evenly">
          <div className="flex flex-col h-full space-y-2 justify-center">
            <label className="block text-gray-500 w-full font-bold" htmlFor="email">
              Email/Mobile Number
            </label>
            <input
              style={{ width: '305px' }}
              className="appearance-none focus:outline-none px-4 py-2 rounded input-box-shadow"
              type="text"
              maxLength={50}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              required
            ></input>
          </div>
          {isLogin && (
            <div className="flex flex-col h-full space-y-2 justify-center">
              <label className="block text-gray-500 w-full font-bold" htmlFor="password">
                Password
              </label>
              <input
                style={{ width: '305px' }}
                className="appearance-none focus:outline-none px-4 py-2 rounded input-box-shadow"
                type="password"
                maxLength={15}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              ></input>
            </div>
          )}
          <div className="login-button">
            {isLogin && (
              <button
                onClick={login}
                className="mt-4 px-2 py-2 rounded focus:outline-none bg-login_button text-text_white button"
                style={{ width: '305px' }}
              >
                {!loginIsLoading ? t('Login') : t('Loading') + '...'}
              </button>
            )}
            {!isLogin && (
              <button
                onClick={login}
                className="mt-4 px-2 py-2 rounded focus:outline-none bg-login_button text-text_white button"
                style={{ width: '305px' }}
              >
                {!loginIsLoading ? t('Confirm') : t('Loading') + '...'}
              </button>
            )}
            <p className="text-gray-500 w-full font-bold mt-2">
              {t(isLogin ? 'Having issue in login? ' : '')}
              <span
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  event.preventDefault();
                  dispatch(updateLoginError(''));
                  setIsLogin(isLogin ? false : true);
                  setLoginTitle(isLogin ? DEFAULT.FORGETPASSWORD : DEFAULT.LOGINTITLE);
                }}
                className="text-gs_primary cursor-pointer"
              >
                {t(isLogin ? 'Forget Password' : 'Back To Login')}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
