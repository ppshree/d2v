import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import './PasswordForm.css';
import { AlertBar } from '../shared/AlertBar';
import { DEFAULT } from '../../app/entity/constant';
import { EyeIcon } from '@heroicons/react/solid';
import { EyeOffIcon } from '@heroicons/react/solid';

interface LoginFormProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  confirm: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  loginIsLoading: boolean;
}

export const PasswordForm: FC<LoginFormProps> = ({ setPassword, setConfirmPassword, confirm, loginIsLoading }) => {
  const { t } = useTranslation();
  const [loginTitle] = useState<string>(DEFAULT.CREATEPASSWORD);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loginError: errMessage } = useSelector((state: RootState) => state.LoginPageReducer);

  return (
    <div className="popUp-container">
      <div className="flex flex-col h-full justify-evenly">
        <div className="login-title-section">
          <h3 className="login-title">{loginTitle}</h3>
          <p className="text-gray-500 w-full font-light">
            Your password must be different from the previous used password{' '}
          </p>
        </div>
        {errMessage && <AlertBar message={errMessage} />}
        <form className="flex flex-col h-60 justify-evenly">
          <div className="flex flex-col h-full space-y-2 relative justify-center">
            <label className="block text-gray-500 w-full font-bold" htmlFor="password">
              Password
            </label>
            <div style={{ width: '305px' }} className="mr-auto relative">
              <span
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  setShowPassword(showPassword ? false : true);
                }}
                className="absolute inset-y-0 right-0 flex items-center px-4"
              >
                {!showPassword && <EyeIcon className={`text-gray w-6`} />}
                {showPassword && <EyeOffIcon className={`text-gray w-6`} />}
              </span>
              <input
                style={{ width: '305px' }}
                className="appearance-none focus:outline-none px-4 py-2 rounded input-box-shadow"
                type={!showPassword ? 'password' : 'text'}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              ></input>
            </div>
          </div>
          <div className="flex flex-col h-full space-y-2 justify-center">
            <label className="block text-gray-500 w-full font-bold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              style={{ width: '305px' }}
              className="appearance-none focus:outline-none px-4 py-2 rounded input-box-shadow"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            ></input>
          </div>
          <div className="login-button">
            <button
              onClick={confirm}
              className="mt-4 px-2 py-2 rounded focus:outline-none bg-login_button text-text_white button"
              style={{ width: '305px' }}
            >
              {!loginIsLoading ? t('Confirm') : t('Loading') + '...'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
