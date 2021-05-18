import React, { FC, useState } from 'react';
import './HeaderMenu.css';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { LANGUAGES } from '../../app/entity/constant';
import { useStylesCommon } from '../../app/style';

interface HeaderMenuProps {
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  setAnchorEl: React.Dispatch<React.SetStateAction<null>>;
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  defaultLanguage: string | null;
  updateLang: (lang: string) => void;
  deleteProfile?: () => void;
  forgotPassword?: () => void;
  contactSupport?: () => void;
}

export const HeaderMenu: FC<HeaderMenuProps> = ({
  anchorEl,
  setAnchorEl,
  logout,
  defaultLanguage,
  updateLang,
  forgotPassword,
  deleteProfile,
  contactSupport,
}) => {
  const classes = useStylesCommon();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [displayLanguage, setDisplayLanguage] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setDisplayLanguage(false);
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          {!displayLanguage && (
            <div style={{ display: 'flex', flexDirection: 'column' }} className="last-child-no-margin-buttom">
              <span
                className="menu-item"
                onClick={() => {
                  setDisplayLanguage(true);
                }}
              >
                {t('Language')}
              </span>
              {contactSupport && (
                <span className="menu-item" onClick={contactSupport}>
                  {t('Contact Support')}
                </span>
              )}
              {forgotPassword && (
                <span className="menu-item" onClick={forgotPassword}>
                  {t('Reset Password')}
                </span>
              )}
              {deleteProfile && (
                <span className="menu-item" onClick={deleteProfile}>
                  {t('Delete Profile')}
                </span>
              )}
              <span className="menu-item delete-menu-item" onClick={logout}>
                {t('Logout')}
              </span>
            </div>
          )}
          {displayLanguage && (
            <div style={{ display: 'flex', flexDirection: 'column' }} className="last-child-no-margin-buttom">
              {LANGUAGES.map((lang) => (
                <span
                  key={lang.id}
                  style={{ marginBottom: '16px', cursor: 'pointer' }}
                  onClick={() => {
                    setDisplayLanguage(false);
                    i18n.changeLanguage(lang.id);
                    updateLang(lang.id);
                  }}
                  className={defaultLanguage === lang.id ? 'selected-lang' : ''}
                >
                  {lang.name}
                </span>
              ))}
            </div>
          )}
        </Typography>
      </Popover>
    </div>
  );
};
