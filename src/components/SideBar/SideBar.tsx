/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { USER_TYPE, SIDEBAR_PANELS } from '../../app/entity/constant';
import './SideBar.css';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import { useStylesCommon } from '../../app/style';
import deviceActive from '../../asset/icons/device-o.svg';
import deviceInActive from '../../asset/icons/device-b.svg';
import medicActive from '../../asset/icons/medic-o.svg';
import medicInActive from '../../asset/icons/medic-b.svg';
import chatActive from '../../asset/icons/chat-o.svg';
import chatInActive from '../../asset/icons/chat-b.svg';
import homeActive from '../../asset/icons/home-o.svg';
import homeInActive from '../../asset/icons/home-b.svg';
import dataProtectionActive from '../../asset/icons/protection-o.svg';
import dataProtectionInactive from '../../asset/icons/protection-b.svg';
import { useTranslation } from 'react-i18next';
import { updateActivePanel } from '../../containers/LoginPage/LoginPageSlice';

export const SideBar: FC = () => {
  const { loggedInUser, activePanel: activeMenu } = useSelector((state: RootState) => state.LoginPageReducer);
  const [listOfPanels, setListOfPanels] = useState<any[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (loggedInUser.user_type == USER_TYPE.ADMIN) {
      setListOfPanels(SIDEBAR_PANELS.ADMIN);
    }
  }, [loggedInUser]);

  const classes = useStylesCommon();
  const { t } = useTranslation();

  const topListOfPanels = listOfPanels.filter((panel) => panel.isTopItem);
  const bottomListOfPanels = listOfPanels.filter((panel) => !panel.isTopItem);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer} style={{ marginTop: '15px' }}>
        <List>
          {topListOfPanels.length &&
            topListOfPanels.map((panel) => (
              <ListItem
                button
                key={panel?.name}
                onClick={() => {
                  dispatch(updateActivePanel(panel?.name));
                  history.push(panel.redirectTo);
                }}
              >
                <ListItemIcon>
                  {panel.logo == 'chat' && (
                    <img src={activeMenu == panel.name ? chatActive : chatInActive} className={classes.logoIcon} />
                  )}
                  {panel.logo == 'deviceList' && (
                    <img src={activeMenu == panel.name ? deviceActive : deviceInActive} className={classes.logoIcon} />
                  )}
                  {panel.logo == 'medicList' && (
                    <img src={activeMenu == panel.name ? medicActive : medicInActive} className={classes.logoIcon} />
                  )}
                  {panel.logo == 'home' && (
                    <img src={activeMenu == panel.name ? homeActive : homeInActive} className={classes.logoIcon} />
                  )}
                  {panel.logo == 'dataPrivacy' && (
                    <img
                      src={activeMenu == panel.name ? dataProtectionActive : dataProtectionInactive}
                      className={classes.logoIcon}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={t(panel.name)} className={activeMenu == panel.name ? 'active-panel' : ''} />
              </ListItem>
            ))}
        </List>
        <div className={classes.drawerFooterContainer}>
          <List>
            {bottomListOfPanels.length &&
              bottomListOfPanels.map((panel) => (
                <ListItem
                  button
                  key={panel?.name}
                  onClick={() => {
                    dispatch(updateActivePanel(panel?.name));
                    history.push(panel.redirectTo);
                  }}
                >
                  <ListItemIcon>
                    {panel.logo == 'chat' && (
                      <img src={activeMenu == panel.name ? chatActive : chatInActive} className={classes.logoIcon} />
                    )}
                    {panel.logo == 'deviceList' && (
                      <img
                        src={activeMenu == panel.name ? deviceActive : deviceInActive}
                        className={classes.logoIcon}
                      />
                    )}
                    {panel.logo == 'medicList' && (
                      <img src={activeMenu == panel.name ? medicActive : medicInActive} className={classes.logoIcon} />
                    )}
                    {panel.logo == 'home' && (
                      <img src={activeMenu == panel.name ? homeActive : homeInActive} className={classes.logoIcon} />
                    )}
                    {panel.logo == 'dataPrivacy' && (
                      <img
                        src={activeMenu == panel.name ? dataProtectionActive : dataProtectionInactive}
                        className={classes.logoIcon}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={t(panel.name)} className={activeMenu == panel.name ? 'active-panel' : ''} />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </Drawer>
  );
};
