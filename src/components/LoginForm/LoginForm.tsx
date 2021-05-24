import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { USER_TYPE } from '../../app/entity/constant';
import './LoginForm.css';
import { AlertBar } from '../shared/AlertBar';
//import backArrow from '../../asset/back.svg';
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
  loginIsLoading,
}) => {
  const { t } = useTranslation();
  const { loginError: errMessage } = useSelector((state: RootState) => state.LoginPageReducer);

  return (
    <div className="popUp-container">
      <div className="popUp-ineer-container">
        <div className="mb-5">{/* <img src={logo} alt="Test" style={{ height: '30px' }} /> */}</div>
        <form>
          {errMessage && <AlertBar message={errMessage} />}
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
            // style={{ visibility: isLogin ? 'visible' : 'hidden' }}
            placeholder={t('Password')}
            className="card-input"
            type="password"
            maxLength={15}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>
          <button onClick={login} className="card-button" style={{ width: '305px' }}>
            {!loginIsLoading ? t('Login') : t('Loading') + '...'}
          </button>
        </form>
      </div>
    </div>
  );
};
