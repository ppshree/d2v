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
import { useTranslation } from 'react-i18next';
import { updateActivePanel } from '../../containers/LoginPage/LoginPageSlice';

export const SideBar: FC = () => {
  const { loggedInUser, activePanel: activeMenu } = useSelector((state: RootState) => state.LoginPageReducer);
  const [listOfPanels, setListOfPanels] = useState<any[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (loggedInUser.role_id == USER_TYPE.SUPERADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SUPERADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.ADMIN) {
      setListOfPanels(SIDEBAR_PANELS.ADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.TUTOR) {
      setListOfPanels(SIDEBAR_PANELS.TUTOR);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLSUPERADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLTUTOR);
    } else {
      return;
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
          {topListOfPanels.length > 0 &&
            topListOfPanels.map((panel) => (
              <ListItem
                button
                key={panel?.name}
                onClick={() => {
                  dispatch(updateActivePanel(panel?.name));
                  history.push(panel.redirectTo);
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={t(panel.name)} className={activeMenu == panel.name ? 'active-panel' : ''} />
              </ListItem>
            ))}
        </List>
        <div className={classes.drawerFooterContainer}>
          <List>
            {bottomListOfPanels.length > 0 &&
              bottomListOfPanels.map((panel) => (
                <ListItem
                  button
                  key={panel?.name}
                  onClick={() => {
                    dispatch(updateActivePanel(panel?.name));
                    history.push(panel.redirectTo);
                  }}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={t(panel.name)} className={activeMenu == panel.name ? 'active-panel' : ''} />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </Drawer>
  );
};
