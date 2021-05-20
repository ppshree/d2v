/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { USER_TYPE, SIDEBAR_PANELS } from '../../app/entity/constant';
import './SideBar.css';
import { useHistory } from 'react-router-dom';
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

  const { t } = useTranslation();

  const topListOfPanels = listOfPanels.filter((panel) => panel.isTopItem);
  const bottomListOfPanels = listOfPanels.filter((panel) => !panel.isTopItem);

  return (
    <div className="col-span-1 w-full py-10 z-10 bg-gsa_primary text-text_white sidebar-shadow">
      <div className="flex flex-col justify-evenly items-center p-3">
        <div className="flex justify-evenly items-center">
          <div className="w-10 h-10 mr-4 bg-text_grey"></div>
          <div className="comp-name">Company Name</div>
        </div>
        <div className="divide-solid w-full h-0.5 bg-gray m-4"></div>
      </div>
      <div className="w-auto">
        <ul className="list-outside">
          {topListOfPanels.length > 0 &&
            topListOfPanels.map((panel) => (
              <li
                className="w-auto p-2 mt-3 cursor-pointer transition delay-50 duration-300 ease-in-out hover:bg-text_grey"
                key={panel?.name}
                onClick={() => {
                  dispatch(updateActivePanel(panel?.name));
                  history.push(panel.redirectTo);
                }}
              >
                <div className="flex justify-start items-center">
                  <panel.logo className="w-5 mx-3" />
                  <p className={activeMenu == panel.name ? 'active-panel text-left text-base' : 'text-left text-base'}>
                    {t(panel.name)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-auto">
        <ul className="list-outside">
          {bottomListOfPanels.length > 0 &&
            bottomListOfPanels.map((panel) => (
              <li
                className="w-auto p-2 mt-3 cursor-pointer transition delay-50 duration-300 ease-in-out hover:bg-text_grey "
                key={panel?.name}
                onClick={() => {
                  dispatch(updateActivePanel(panel?.name));
                  history.push(panel.redirectTo);
                }}
              >
                <div className="flex justify-start items-center">
                  <panel.logo className="w-5 mx-3" />
                  <p className={activeMenu == panel.name ? 'active-panel text-left text-base' : 'text-left text-base'}>
                    {t(panel.name)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
