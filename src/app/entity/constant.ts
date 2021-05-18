import { APPLICATION_URL } from '../router/applicationRoutes';
export const BASE_URL = 'https://yw6ngz89zd.execute-api.eu-central-1.amazonaws.com/';
export enum STAGE {
  DEV = 'Dev',
  PROD = 'Prod',
}

export interface ItempUser {
  //PATCH DELETE FOR PRODUCTION
  status: number;
  user_type: number;
  email: string;
  name: string;
}

export enum USER_TYPE {
  ADMIN = 1,
  MEDIC = 2,
  PATIENT = 3,
  ASSISTANT = 4, //need to work on it
}

export const LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'ger', name: 'Deutsch' },
];
export const SIDEBAR_PANELS = {
  ADMIN: [
    { name: 'Physician List', logo: 'medicList', redirectTo: APPLICATION_URL.ADMIN_MEDIC_LIST, isTopItem: true },
    { name: 'Device List', logo: 'deviceList', redirectTo: APPLICATION_URL.ADMIN_DEVICE_LIST, isTopItem: true },
    { name: 'Data Privacy', logo: 'dataPrivacy', redirectTo: APPLICATION_URL.ADMIN_DATA_PRIVACY, isTopItem: false },
  ],
  MEDIC: [
    { name: 'Patient List', logo: 'home', redirectTo: APPLICATION_URL.MEDIC_PATIENT_LIST, isTopItem: true },
    { name: 'Patient Chat', logo: 'chat', redirectTo: APPLICATION_URL.MEDIC_CHAT, isTopItem: true },
    { name: 'Data Privacy', logo: 'dataPrivacy', redirectTo: APPLICATION_URL.MEDIC_DATA_PRIVACY, isTopItem: false },
  ],
  PATIENT: [
    { name: 'Overview Vital Parameters', logo: 'home', redirectTo: APPLICATION_URL.PATIENT_DASHBOARD, isTopItem: true },
    { name: 'Physician Chat', logo: 'chat', redirectTo: APPLICATION_URL.PATIENT_CHAT, isTopItem: true },
    { name: 'Data Privacy', logo: 'dataPrivacy', redirectTo: APPLICATION_URL.PATIENT_DATA_PRIVACY, isTopItem: false },
  ],
};
export interface ISideBar {
  name: string;
  logo: string;
}
export enum ROLES {
  ADMIN = 'ADMIN',
  MEDIC = 'MEDIC',
  PATIENT = 'PATIENT',
}

export type Role = keyof typeof ROLES;

export enum USER_STATUS {
  PENDING = 1, // (EMAIL CONFIRMATION NOT DONE YET)
  ONGOING = 2,
  COMPLETED = 3,
  DISCARDED = 4,
}

export enum DEVICE_STATUS {
  NOT_ASSIGNED = 1,
  ASSIGNED_TO_MEDIC = 2,
  ASSIGNED_TO_PATIENT = 3,
  //COMPLETED = 4,
  DAMAGED = 4,
  //RESOLVED = 6,
}

export enum CHAT_STATUS {
  UNREAD = 1,
  READ = 2,
}

export enum CONTENT_TYPE {
  TEXT = 1,
  FILE = 2, //TO BE ADDED LATER
}
export interface IloginUser {
  email: string;
  secret_key: string;
  user_type?: 1 | 2 | 3 | 4;
  role?: Role;
  patient_device?: string | null; //TO BE DELETED
}
export interface IForgetloginUser {
  email: string;
  user_type: 1 | 2 | 3 | 4;
  role: Role;
}
