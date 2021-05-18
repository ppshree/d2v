import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';
import logo from '../../asset/logo.svg';
import { USER_TYPE } from '../../app/entity/constant';
import { displayLogin, updateLoginError } from '../../containers/LoginPage/LoginPageSlice';
import { useQueryParam } from 'use-query-params';

interface LandingPageProps {
  selectUserType?: React.Dispatch<React.SetStateAction<USER_TYPE | undefined>>;
}

export const LandingPage: FC<LandingPageProps> = ({ selectUserType }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fromOrigin] = useQueryParam<string>('from');

  const authType = [
    { style: 'hand user-right-buttons blue-btn', name: 'Login', bgColor: '' },
    { style: 'hand user-right-buttons', name: 'Register', bgColor: '#eb8f0f' },
  ];

  return (
    <div className="user-container">
      {/* <div className="user-left-container">
        <img src={logo} alt="Test" style={{ height: '60px' }} />
      </div> */}
      <div className="left-inner-container">
        <div>
          {authType.map((type, index) => (
            <div
              key={index}
              className={`${type.style} ${fromOrigin === 'website' ? 'disabled' : ''}`}
              style={{ backgroundColor: type.bgColor }}
              onClick={() => {
                if (fromOrigin !== 'website' && t(type.name) === 'Login') {
                  dispatch(displayLogin(true));
                  dispatch(updateLoginError(''));
                }
              }}
            >
              {t(type.name)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
