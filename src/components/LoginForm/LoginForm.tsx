import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { USER_TYPE } from '../../app/entity/constant';
import './LoginForm.css';
import logo from '../../asset/logo.svg';
import backArrow from '../../asset/back.svg';
import { displayLogin } from '../../containers/LoginPage/LoginPageSlice';
interface LoginFormProps {
  //errMessage: null | string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>; //(e: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: React.Dispatch<React.SetStateAction<string>>; //(e: React.ChangeEvent<HTMLInputElement>) => void;
  login: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  forgotKey?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  loginIsLoading: boolean;
  selectUserType?: React.Dispatch<React.SetStateAction<USER_TYPE | undefined>>;
  userType?: USER_TYPE | undefined;
}

export const LoginForm: FC<LoginFormProps> = ({
  //errMessage,
  setUserEmail,
  setPassword,
  login,
  forgotKey,
  loginIsLoading,
  selectUserType,
  //userType,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLogin, loginError: errMessage } = useSelector((state: RootState) => state.LoginPageReducer);

  return (
    <div className="popUp-container">
      <div className="popUp-ineer-container">
        <div style={{ marginBottom: '10px' }}>{/* <img src={logo} alt="Test" style={{ height: '30px' }} /> */}</div>
        <form>
          <span className="card-error-title">{errMessage ? errMessage : ''}</span>
          <input
            placeholder={t('Email')}
            className="card-input pii"
            type="text"
            maxLength={50}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            required
          ></input>
          <input
            style={{ visibility: isLogin ? 'visible' : 'hidden' }}
            placeholder={t('Password')}
            className="card-input"
            type="password"
            maxLength={15}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>

          {isLogin && (
            <button onClick={login} className="card-button">
              {!loginIsLoading ? t('Login') : t('Loading') + '...'}
            </button>
          )}
          {!isLogin && (
            <button className="card-button">{!loginIsLoading ? t('Forgot Password') : t('Sending') + '...'}</button>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span
              style={{ display: 'flex', alignContent: 'center' }}
              className="card-link"
              onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                event.preventDefault();
                dispatch(displayLogin(isLogin ? false : true));
              }}
            >
              <img src={backArrow} alt="goBack" style={{ height: '20px' }} />
              {t('Back')}
            </span>
            <span
              className="card-link"
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                event.preventDefault();
                dispatch(displayLogin(isLogin ? false : true));
              }}
            >
              {t(isLogin ? 'Forgot Password' : 'Back To Login')}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
