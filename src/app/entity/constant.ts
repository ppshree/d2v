/* eslint-disable @typescript-eslint/no-explicit-any */
import { APPLICATION_URL } from '../router/applicationRoutes';
import { ChartBarIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';
import { UserGroupIcon } from '@heroicons/react/solid';
import { UserGroupIcon as UserGroupOutlineIcon } from '@heroicons/react/outline';
import { UsersIcon } from '@heroicons/react/solid';
import { UserAddIcon } from '@heroicons/react/solid';
import { BookOpenIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/solid';
import { ICreateAdmin, ICreateContentManager } from './model';

export enum COLORS {
  GSA_PRIMARY = 'gsa_primary',
  GSA_SECONDARY = 'gsa_secondary',
  GA_PRIMARY = 'ga_primary',
  GA_SECONDARY = 'ga_secondary',
  GCM_PRIMARY = 'gcm_primary',
  GCM_SECONDARY = 'gcm_secondary',
  GT_PRIMARY = 'gt_primary',
  GT_SECONDARY = 'gt_secondary',
  LSA_PRIMARY = 'lsa_primary',
  LSA_SECONDARY = 'lsa_secondary',
  LA_PRIMARY = 'la_primary',
  LA_SECONDARY = 'la_secondary',
  LT_PRIMARY = 'lt_primary',
  LT_SECONDARY = 'lt_secondary',
  LCM_PRIMARY = 'lcm_primary',
  LCM_SECONDARY = 'lcm_secondary',
}

export enum RESPONSE {
  FAILED = 'failed',
  SUCCESS = 'success',
  FILLALLTHEDATA = 'FILL ALL THE DATA',
  LOGINFAILED = 'LOGIN FAILED',
  DATANOTFOUND = 'DATA NOT FOUND',
  TOKENOTFOUND = 'TOKEM NOT FOUND',
}

export enum MIN_MAX_WIDTH {
  MAX_SIDEBAR = 'max-width-sidebar',
  MIN_SIDEBAR = 'min-width-sidebar',
  MAX_LAYOUT = 'max-width-layout',
  MIN_LAYOUT = 'min-width-layout',
}

export enum MODAL_POSITION {
  DEFAULT = 'inset-0',
}

export enum USER_TYPE {
  SUPERADMIN = 1,
  ADMIN = 2,
  TUTOR = 3,
  STUDENT = 4,
  SCHOOLSUPERADMIN = 5,
  SCHOOLADMIN = 6,
  SCHOOLTUTOR = 7,
  SCHOOLSTUDENT = 8,
  CONTENTMANAGER = 9,
  SCHOOLCONTENTMANAGER = 10,
}

export const LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'ger', name: 'Deutsch' },
];
export const SIDEBAR_PANELS = {
  SUPERADMIN: [
    { name: 'Dashboard', logo: ChartBarIcon, redirectTo: APPLICATION_URL.SUPERADMIN_DASHBOARD, isTopItem: true },
    { name: 'Master', logo: UserIcon, redirectTo: APPLICATION_URL.SUPERADMIN_MASTER, isTopItem: true },
    { name: 'Admin List', logo: UserGroupIcon, redirectTo: APPLICATION_URL.SUPERADMIN_ADMIN_LIST, isTopItem: true },
    {
      name: 'Content Manger List',
      logo: UserGroupOutlineIcon,
      redirectTo: APPLICATION_URL.SUPERADMIN_CONTENTMANAGER_LIST,
      isTopItem: true,
    },
    { name: 'Tutor List', logo: UsersIcon, redirectTo: APPLICATION_URL.SUPERADMIN_TUTOR_LIST, isTopItem: true },
    { name: 'School List', logo: BookOpenIcon, redirectTo: APPLICATION_URL.SUPERADMIN_SCHOOL_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.SUPERADMIN_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
  ADMIN: [
    { name: 'Dashboard', logo: ChartBarIcon, redirectTo: APPLICATION_URL.ADMIN_DASHBOARD, isTopItem: true },
    { name: 'Master', logo: UserIcon, redirectTo: APPLICATION_URL.ADMIN_MASTER, isTopItem: true },
    { name: 'Admin List', logo: UserGroupIcon, redirectTo: APPLICATION_URL.ADMIN_ADMIN_LIST, isTopItem: true },
    {
      name: 'Content Manger List',
      logo: UserGroupOutlineIcon,
      redirectTo: APPLICATION_URL.ADMIN_CONTENTMANAGER_LIST,
      isTopItem: true,
    },
    { name: 'Tutor List', logo: UsersIcon, redirectTo: APPLICATION_URL.ADMIN_TUTOR_LIST, isTopItem: true },
    { name: 'School List', logo: BookOpenIcon, redirectTo: APPLICATION_URL.ADMIN_SCHOOL_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.ADMIN_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
  TUTOR: [
    { name: 'Dashboard', logo: ChartBarIcon, redirectTo: APPLICATION_URL.TUTOR_DASHBOARD, isTopItem: true },
    { name: 'Course', logo: BookOpenIcon, redirectTo: APPLICATION_URL.TUTOR_COURSE, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.TUTOR_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
  CONTENTMANAGER: [
    { name: 'Dashboard', logo: ChartBarIcon, redirectTo: APPLICATION_URL.TUTOR_DASHBOARD, isTopItem: true },
    { name: 'Course', logo: BookOpenIcon, redirectTo: APPLICATION_URL.TUTOR_COURSE, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.TUTOR_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
  SCHOOLSUPERADMIN: [
    {
      name: 'Dashboard',
      logo: ChartBarIcon,
      redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD,
      isTopItem: true,
    },
    {
      name: 'Admin List',
      logo: UserGroupIcon,
      redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_ADMIN_LIST,
      isTopItem: true,
    },
    { name: 'Tutor List', logo: UsersIcon, redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_TUTOR_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
  SCHOOLADMIN: [
    { name: 'Dashboard', logo: ChartBarIcon, redirectTo: APPLICATION_URL.SCHOOLADMIN_DASHBOARD, isTopItem: true },
    { name: 'Tutor List', logo: UsersIcon, redirectTo: APPLICATION_URL.SCHOOLADMIN_TUTOR_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.SCHOOLADMIN_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
  SCHOOLTUTOR: [
    { name: 'Dashboard', logo: ChartBarIcon, redirectTo: APPLICATION_URL.SCHOOLTUTOR_DASHBOARD, isTopItem: true },
    { name: 'Course', logo: BookOpenIcon, redirectTo: APPLICATION_URL.SCHOOLTUTOR_COURSE, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.SCHOOLTUTOR_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
  SCHOOLCONTENTMANAGER: [
    { name: 'Dashboard', logo: ChartBarIcon, redirectTo: APPLICATION_URL.TUTOR_DASHBOARD, isTopItem: true },
    { name: 'Course', logo: BookOpenIcon, redirectTo: APPLICATION_URL.TUTOR_COURSE, isTopItem: true },
    {
      name: 'Student List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.TUTOR_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Hi',
      logo: UserCircleIcon,
      isTopItem: false,
    },
  ],
};

export const ROLES: any = {
  1: 'SUPERADMIN',
  2: 'ADMIN',
  3: 'TUTOR',
  4: 'STUDENT',
  5: 'SCHOOLSUPERADMIN',
  6: 'SCHOOLADMIN',
  7: 'SCHOOLSUPERADMIN',
  8: 'SCHOOLTUTOR',
  9: 'CONTENTMANAGER',
  10: 'SCHOOLCONTENTMANAGER',
};

export enum USER_STATUS {
  PENDING = 'pending', // (EMAIL CONFIRMATION NOT DONE YET)
  ONGOING = 'ongoing',
  APPROVED = 'approved',
  DISCARDED = 'discarded',
}

export enum CONTENT_TYPE {
  TEXT = 1,
  FILE = 2, //TO BE ADDED LATER
}
export interface IloginUser {
  email: string;
  password: string;
}

export const temp_content_managers: ICreateContentManager[] = [
  {
    id: '1',
    first_name: 'Jeevan Jyoti',
    last_name: 'Dash',
    email: 'dashjeevanjyoti@gmail.com',
    mobile_number: '8895475852',
    school_code: 'Dps',
    status: 'pending',
    role_id: '9',
    standard: '1',
    created_by: 'Samapika Nayak',
  },
  {
    id: '2',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johnDoe@gmail.com',
    mobile_number: '8895475852',
    school_code: 'Dps',
    status: 'approved',
    role_id: '9',
    standard: '2',
    created_by: 'Samapika Nayak',
  },
  {
    id: '3',
    first_name: 'Haresh',
    last_name: 'Dey',
    email: 'hareshDey@gmail.com',
    mobile_number: '8895475852',
    school_code: 'OPS',
    status: 'discarded',
    role_id: '9',
    standard: '3',
    created_by: 'Samapika Nayak',
  },
];

export const temp_admin: ICreateAdmin[] = [
  {
    id: '1',
    first_name: 'Jeevan Jyoti',
    last_name: 'Dash',
    email: 'dashjeevanjyoti@gmail.com',
    mobile_number: '8895475852',
    school_code: 'Dps788',
    status: 'pending',
    role_id: '3',
    created_by: 'Samapika Nayak',
  },
  {
    id: '2',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johnDoe@gmail.com',
    mobile_number: '8895475852',
    school_code: 'Dps788',
    status: 'approved',
    role_id: '2',
    created_by: 'Samapika Nayak',
  },
];
