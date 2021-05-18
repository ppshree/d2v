/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, BaseSyntheticEvent, useEffect, useState } from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import logo from '../../asset/logo.svg';
import dropdown from '../../asset/dropdown-arrow-down.svg';
import dropup from '../../asset/dropdown-arrow-up.svg';
import { signOut, updateDefaultLanguage, updateLoginError } from '../../containers/LoginPage/LoginPageSlice';
import { useStylesCommon } from '../../app/style';
import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu';
import { IresetKey } from '../../app/entity/model';
import { forgotKey } from '../../app/service/shared.service';
import { RootState } from '../../app/rootReducer';
interface HeaderPageProps {
  title?: string;
  onDeleteProfile?: () => void;
  onContactSupport?: (message: string) => void;
}

export const Header: FC<HeaderPageProps> = ({ onDeleteProfile, onContactSupport }) => {
  const { i18n, t } = useTranslation();
  const { defaultLanguage, loggedInUser, isForgotPassword } = useSelector((state: RootState) => state.LoginPageReducer);
  const history = useHistory();
  const classes = useStylesCommon();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const logout = () => {
    dispatch(signOut());
    history.push('/');
  };
  const updateLang = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(updateDefaultLanguage(lang));
  };
  const [showResetPasswordMessage, setShowResetPasswordMessage] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showContactSupportModal, setShowContactSupportModal] = useState(false);

  useEffect(() => {
    if (isForgotPassword) {
      setShowResetPasswordMessage(true);
    }
  }, [isForgotPassword]);

  const forgotPassword = () => {
    dispatch(updateLoginError(''));
    const userInfo: IresetKey = {
      email: loggedInUser.email,
      user_type: loggedInUser.user_type,
    };
    dispatch(forgotKey(userInfo));
  };

  const confirmDeleteProfile = () => {
    setShowConfirmDeleteModal(true);
  };

  const deleteProfile = () => {
    if (onDeleteProfile) {
      onDeleteProfile();
    }
    setShowConfirmDeleteModal(false);
  };

  const contactSupport = () => {
    setShowContactSupportModal(true);
  };

  const sendContactSupportMessage = (message: string) => {
    if (onContactSupport) {
      onContactSupport(message);
    }
    setShowContactSupportModal(false);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <div className="header-container">
          <div className="header-logo">
            <img src={logo} />
          </div>
          <div className="header-inner-container">
            <div className="header-title">&nbsp;</div>
            <div className="header-user-title">
              {loggedInUser.name}
              <span onClick={handleClick}>
                {anchorEl ? (
                  <img
                    src={dropup}
                    style={{ width: '24px', height: '24px', position: 'relative', top: '3px' }}
                    className="hand"
                  />
                ) : (
                  <img
                    src={dropdown}
                    style={{ width: '24px', height: '24px', position: 'relative', top: '3px' }}
                    className="hand"
                  />
                )}
              </span>
            </div>
          </div>
          <HeaderMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            logout={logout}
            defaultLanguage={defaultLanguage}
            updateLang={updateLang}
            deleteProfile={confirmDeleteProfile}
            forgotPassword={forgotPassword}
            contactSupport={contactSupport}
          ></HeaderMenu>
        </div>
      </AppBar>
      <Snackbar
        open={showResetPasswordMessage}
        autoHideDuration={4000}
        onClose={() => setShowResetPasswordMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success">{t('Sent password reset email')}</Alert>
      </Snackbar>
    </>
  );
};
