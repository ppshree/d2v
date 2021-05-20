/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { USER_TYPE, SIDEBAR_PANELS, MIN_MAX_WIDTH } from '../../app/entity/constant';
import './SideBar.css';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateActivePanel } from '../../containers/LoginPage/LoginPageSlice';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/solid';

interface Iprops {
  handleSignout: () => void;
  handleLayoutWidth: (size: string) => void;
}

export const SideBar: FC<Iprops> = ({ handleLayoutWidth, handleSignout }) => {
  const { loggedInUser, activePanel: activeMenu } = useSelector((state: RootState) => state.LoginPageReducer);
  const [listOfPanels, setListOfPanels] = useState<any[]>([]);
  const [currentPrimaryColor, setCurrentPrimaryColor] = useState<string>('');
  const [currentSecondaryColor, setCurrentSecondaryColor] = useState<string>('');
  const [sidebarWidth, setSidebarWidth] = useState<string>(MIN_MAX_WIDTH.MIN_SIDEBAR);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (loggedInUser.role_id == USER_TYPE.SUPERADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SUPERADMIN);
      setCurrentPrimaryColor('gsa_primary');
      setCurrentSecondaryColor('gsa_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.ADMIN) {
      setListOfPanels(SIDEBAR_PANELS.ADMIN);
      setCurrentPrimaryColor('ga_primary');
      setCurrentSecondaryColor('ga_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.TUTOR) {
      setListOfPanels(SIDEBAR_PANELS.TUTOR);
      setCurrentPrimaryColor('gt_primary');
      setCurrentSecondaryColor('gt_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLSUPERADMIN);
      setCurrentPrimaryColor('lsa_primary');
      setCurrentSecondaryColor('lsa_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLADMIN);
      setCurrentPrimaryColor('la_primary');
      setCurrentSecondaryColor('la_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLTUTOR);
      setCurrentPrimaryColor('lt_primary');
      setCurrentSecondaryColor('lt_secondary');
    } else {
      return;
    }
  }, [loggedInUser]);

  const { t } = useTranslation();

  const topListOfPanels = listOfPanels.filter((panel) => panel.isTopItem);
  const bottomListOfPanels = listOfPanels.filter((panel) => !panel.isTopItem);

  const handleSidebarWidth = (sizeSidebar: string, sizeLayout: string) => {
    setSidebarWidth(sizeSidebar);
    handleLayoutWidth(sizeLayout);
  };

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 flex-3 ${sidebarWidth} py-10 z-10 bg-${currentPrimaryColor} text-text_white sidebar-shadow`}
    >
      <div className="flex flex-col justify-evenly items-center p-3">
        <div className="flex justify-evenly items-center">
          {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && <div className="w-10 h-10 mr-4 bg-text_grey"></div>}
          {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && <div className="w-10 h-10 m-auto bg-text_grey"></div>}
          {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && <div className="comp-name">Company Name</div>}
        </div>
        <div className="divide-y bg-text_grey w-full h-0.5 m-4"></div>
      </div>
      <div className="w-auto h-auto">
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
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && <panel.logo className="w-5 mx-3" />}
                  {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && (
                    <panel.logo className={activeMenu == panel.name ? 'active-panel w-5 m-auto' : 'w-5 m-auto'} />
                  )}
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && (
                    <p
                      className={activeMenu == panel.name ? 'active-panel text-left text-base' : 'text-left text-base'}
                    >
                      {t(panel.name)}
                    </p>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="absolute w-full bottom-0 left-0">
        {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && (
          <LogoutIcon onClick={() => handleSignout()} className="w-5 m-auto cursor-pointer" />
        )}
        {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && (
          <LogoutIcon onClick={() => handleSignout()} className="w-5 m-auto cursor-pointer" />
        )}
        {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && <UserCircleIcon className="w-5 m-auto cursor-pointer" />}
        <ul className={`list-outside bg-${currentSecondaryColor}`}>
          {bottomListOfPanels.length > 0 &&
            bottomListOfPanels.map((panel) => (
              <li
                className="w-auto p-2 mt-3"
                key={panel?.name}
                onClick={() => {
                  history.push(panel.redirectTo);
                }}
              >
                <div className="flex justify-center items-center">
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && <panel.logo className="w-5 mx-3 cursor-pointer" />}
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && (
                    <p className="text-left text-base">{t(panel.name + ' ' + loggedInUser.first_name)}</p>
                  )}
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && (
                    <ChevronLeftIcon
                      onClick={() => handleSidebarWidth(MIN_MAX_WIDTH.MIN_SIDEBAR, MIN_MAX_WIDTH.MIN_LAYOUT)}
                      className="w-5 ml-16 cursor-pointer"
                    />
                  )}
                  {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && (
                    <ChevronRightIcon
                      onClick={() => handleSidebarWidth(MIN_MAX_WIDTH.MAX_SIDEBAR, MIN_MAX_WIDTH.MAX_LAYOUT)}
                      className="w-5 m-auto cursor-pointer"
                    />
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
