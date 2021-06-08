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
import { useColorUserType } from '../../app/heplers/useColorUserType';

interface Iprops {
  handleLayoutWidth: (size: string) => void;
  openProfileModal: () => void;
}

export const SideBar: FC<Iprops> = ({ handleLayoutWidth, openProfileModal }) => {
  const { loggedInUser, activePanel: activeMenu } = useSelector((state: RootState) => state.LoginPageReducer);
  const [listOfPanels, setListOfPanels] = useState<any[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState<string>(MIN_MAX_WIDTH.MAX_SIDEBAR);

  const dispatch = useDispatch();

  const history = useHistory();
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  useEffect(() => {
    if (loggedInUser.role_id == USER_TYPE.SUPERADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SUPERADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.ADMIN) {
      setListOfPanels(SIDEBAR_PANELS.ADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.TUTOR) {
      setListOfPanels(SIDEBAR_PANELS.TUTOR);
    } else if (loggedInUser.role_id == USER_TYPE.CONTENTMANAGER) {
      setListOfPanels(SIDEBAR_PANELS.CONTENTMANAGER);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLSUPERADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLADMIN);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLTUTOR);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLCONTENTMANAGER) {
      setListOfPanels(SIDEBAR_PANELS.SCHOOLCONTENTMANAGER);
    } else {
      return;
    }
  }, [loggedInUser]);

  useEffect(() => {
    window.innerWidth >= 700 ? setSidebarWidth(MIN_MAX_WIDTH.MAX_SIDEBAR) : setSidebarWidth(MIN_MAX_WIDTH.MIN_SIDEBAR);
  }, [window.innerWidth]);

  const { t } = useTranslation();

  const topListOfPanels = listOfPanels.filter((panel) => panel.isTopItem);
  const bottomListOfPanels = listOfPanels.filter((panel) => !panel.isTopItem);

  const handleSidebarWidth = (sizeSidebar: string, sizeLayout: string) => {
    setSidebarWidth(sizeSidebar);
    handleLayoutWidth(sizeLayout);
  };

  const handleProfileOpen = (e: React.SyntheticEvent) => {
    e.preventDefault();
    openProfileModal();
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
      <div className="w-auto h-auto sidebar-scroll">
        <ul className="list-outside">
          {topListOfPanels.length > 0 &&
            topListOfPanels.map((panel) => (
              <li
                className={
                  activeMenu == panel.name
                    ? `w-auto p-2 mt-2 cursor-pointer bg-${currentSecondaryColor}`
                    : `w-auto p-2 mt-2 cursor-pointer transition delay-50 duration-300 ease-in-out hover:bg-${currentSecondaryColor}`
                }
                key={panel?.name}
                onClick={() => {
                  dispatch(updateActivePanel(panel?.name));
                  history.push(panel.redirectTo);
                }}
              >
                <div className="flex justify-start items-center">
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && <panel.logo className="w-5 mx-3" />}
                  {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && (
                    <panel.logo
                      className={activeMenu == panel.name ? `bg-${currentSecondaryColor} w-5 m-auto` : 'w-5 m-auto'}
                    />
                  )}
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && <p className="text-left text-base">{t(panel.name)}</p>}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="absolute w-full bottom-0 left-0">
        {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && (
          <UserCircleIcon onClick={handleProfileOpen} className="w-5 m-auto cursor-pointer" />
        )}
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
                <div className="flex justify-start items-center">
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && (
                    <panel.logo onClick={handleProfileOpen} className="w-6 mx-auto cursor-pointer" />
                  )}
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && (
                    <p className="text-left text-base mx-auto">{t(panel.name + ' ' + loggedInUser.first_name)}</p>
                  )}
                  {sidebarWidth === MIN_MAX_WIDTH.MAX_SIDEBAR && (
                    <button
                      className=" mx-auto cursor-pointer"
                      onClick={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        handleSidebarWidth(MIN_MAX_WIDTH.MIN_SIDEBAR, MIN_MAX_WIDTH.MIN_LAYOUT);
                      }}
                    >
                      <ChevronLeftIcon className="w-8" />
                    </button>
                  )}
                  {sidebarWidth === MIN_MAX_WIDTH.MIN_SIDEBAR && (
                    <button
                      className=" m-auto cursor-pointer"
                      onClick={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        handleSidebarWidth(MIN_MAX_WIDTH.MAX_SIDEBAR, MIN_MAX_WIDTH.MAX_LAYOUT);
                      }}
                    >
                      <ChevronRightIcon className="w-8" />
                    </button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
