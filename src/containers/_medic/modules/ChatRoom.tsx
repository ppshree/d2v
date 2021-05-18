import React, { FC } from 'react';
import { Header } from '../../Header/Header';
import { SideBar } from '../../../components/SideBar/SideBar';
import { useStylesCommon } from '../../../app/style';
import Toolbar from '@material-ui/core/Toolbar';
import '../Medic.css';

export const ChatRoom: FC = () => {
  const classes = useStylesCommon();

  return <h1>This is medic chatroom page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default ChatRoom;
