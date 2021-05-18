import React, { FC, MouseEvent } from 'react';
import './ForgetPasswordForm.css';
import logo from '../../asset/logo.svg';
import { useTranslation } from 'react-i18next';
interface ForgetPasswordFormProps {
  errMessage: null | string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>; //(e: React.ChangeEvent<HTMLInputElement>) => void;
  sendLink: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  sendLinkIsLoading: boolean;
}

export const ForgetPasswordForm: FC<ForgetPasswordFormProps> = ({
  errMessage,
  setUserEmail,
  sendLink,
  sendLinkIsLoading,
}) => {
  const { t } = useTranslation();
  return (
    <div className="popUp-container">
      <div className="popUp-ineer-container">
        <div className="login-title" style={{ marginBottom: '16px' }}>
          <img src={logo} alt="Test" style={{ height: '30px' }} />
        </div>
        <form>
          <span className="card-error-title">{errMessage}</span>
          <input
            placeholder={t('Email')}
            className="card-input pii"
            type="text"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            required
          ></input>
          <button onClick={sendLink} className="card-button">
            {!sendLinkIsLoading ? t('Send Link') : t('Loading')}
          </button>
        </form>
      </div>
    </div>
  );
};
