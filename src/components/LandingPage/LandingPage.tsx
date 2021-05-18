import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';
import logo from '../../asset/logo.svg';
import { USER_TYPE } from '../../app/entity/constant';
import { displayLogin, updateLoginError } from '../../containers/LoginPage/LoginPageSlice';
import { useQueryParam } from 'use-query-params';

interface LandingPageProps {
  selectUserType: React.Dispatch<React.SetStateAction<USER_TYPE | undefined>>;
}

export const LandingPage: FC<LandingPageProps> = ({ selectUserType }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fromOrigin] = useQueryParam<string>('from');
  const users = [
    { id: USER_TYPE.ADMIN, style: 'hand user-right-buttons blue-btn', name: 'Admin', bgColor: '' },
    { id: USER_TYPE.MEDIC, style: 'hand user-right-buttons blue-btn', name: 'Physician', bgColor: '' },
    { id: USER_TYPE.PATIENT, style: 'hand user-right-buttons', name: 'Patient', bgColor: '#eb8f0f' },
  ];

  return (
    <div className="user-container">
      <div className="user-left-container">
        <img src={logo} alt="Test" style={{ height: '60px' }} />
      </div>
      <div className="left-inner-container">
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className={`${user.style} ${fromOrigin === 'website' ? 'disabled' : ''}`}
              style={{ backgroundColor: user.bgColor }}
              onClick={() => {
                if (fromOrigin !== 'website') {
                  selectUserType(user.id);
                  dispatch(displayLogin(true));
                  dispatch(updateLoginError(''));
                }
              }}
            >
              {t(user.name)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
