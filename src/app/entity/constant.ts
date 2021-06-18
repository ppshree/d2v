/* eslint-disable @typescript-eslint/no-explicit-any */
import { APPLICATION_URL } from '../router/applicationRoutes';
import { ChartBarIcon } from '@heroicons/react/solid';
import { AcademicCapIcon } from '@heroicons/react/solid';
import { UserGroupIcon } from '@heroicons/react/solid';
import { UsersIcon } from '@heroicons/react/solid';
import { UserAddIcon } from '@heroicons/react/solid';
import { HashtagIcon } from '@heroicons/react/solid';
import { LibraryIcon } from '@heroicons/react/solid';
import { BookOpenIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/solid';

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
    { name: 'Courses', logo: BookOpenIcon, redirectTo: APPLICATION_URL.COURSE_CLASSLIST, isTopItem: true },
    { name: 'Admin List', logo: UserGroupIcon, redirectTo: APPLICATION_URL.SUPERADMIN_ADMIN_LIST, isTopItem: true },
    {
      name: 'Content Manger List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.SUPERADMIN_CONTENTMANAGER_LIST,
      isTopItem: true,
    },
    { name: 'Tutor List', logo: UsersIcon, redirectTo: APPLICATION_URL.SUPERADMIN_TUTOR_LIST, isTopItem: true },
    { name: 'School List', logo: LibraryIcon, redirectTo: APPLICATION_URL.SCHOOL_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: AcademicCapIcon,
      redirectTo: APPLICATION_URL.SUPERADMIN_STUDENT_LIST,
      isTopItem: true,
    },
    {
      name: 'Tag List',
      logo: HashtagIcon,
      redirectTo: APPLICATION_URL.SUPERADMIN_TAG_LIST,
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
    { name: 'Courses', logo: BookOpenIcon, redirectTo: APPLICATION_URL.COURSE_CLASSLIST, isTopItem: true },
    { name: 'Admin List', logo: UserGroupIcon, redirectTo: APPLICATION_URL.ADMIN_ADMIN_LIST, isTopItem: true },
    {
      name: 'Content Manger List',
      logo: UserAddIcon,
      redirectTo: APPLICATION_URL.ADMIN_CONTENTMANAGER_LIST,
      isTopItem: true,
    },
    { name: 'Tutor List', logo: UsersIcon, redirectTo: APPLICATION_URL.ADMIN_TUTOR_LIST, isTopItem: true },
    { name: 'School List', logo: LibraryIcon, redirectTo: APPLICATION_URL.SCHOOL_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: AcademicCapIcon,
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
    { name: 'Courses', logo: BookOpenIcon, redirectTo: APPLICATION_URL.COURSE_CLASSLIST, isTopItem: true },
    {
      name: 'Student List',
      logo: AcademicCapIcon,
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
    { name: 'Course', logo: BookOpenIcon, redirectTo: APPLICATION_URL.COURSE_CLASSLIST, isTopItem: true },
    {
      name: 'Student List',
      logo: AcademicCapIcon,
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
      logo: AcademicCapIcon,
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
      logo: AcademicCapIcon,
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
    { name: 'Course', logo: BookOpenIcon, redirectTo: APPLICATION_URL.COURSE_CLASSLIST, isTopItem: true },
    {
      name: 'Student List',
      logo: AcademicCapIcon,
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
    { name: 'Course', logo: BookOpenIcon, redirectTo: APPLICATION_URL.COURSE_CLASSLIST, isTopItem: true },
    {
      name: 'Student List',
      logo: AcademicCapIcon,
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
  1: 'SUPER ADMIN',
  2: 'ADMIN',
  3: 'TUTOR',
  4: 'STUDENT',
  5: 'SCHOOL SUPER ADMIN',
  6: 'SCHOOL ADMIN',
  7: 'SCHOOL TUTOR',
  8: 'SCHOOL STUDENT',
  9: 'CONTENT MANAGER',
  10: 'SCHOOL CONTENT MANAGER',
};

export enum DEFAULT {
  GLOBALSCHOOL = 'ysyw1234',
  LOGINTITLE = 'LEARN FROM THE BEST AT YOUR OWN PACE',
  FORGETPASSWORD = 'FORGET PASSWORD',
  CREATEPASSWORD = 'CREATE NEW PASSWORD',
}

export enum LIMIT {
  ALL = 100,
  DEFAULT = 10,
}

export enum USER_STATUS {
  PENDING = 'Pending', // (EMAIL CONFIRMATION NOT DONE YET)
  ONGOING = 'Ongoing',
  APPROVED = 'Approved',
  DISCARDED = 'Discarded',
}

export enum SCHOOL {
  NOTACTIVE = 0,
  ACTIVE = 1,
}

export enum CONTENT_TYPE {
  TEXT = 1,
  FILE = 2, //TO BE ADDED LATER
}
export interface IloginUser {
  email: string;
  password: string;
}
export interface IcreatePassword {
  userId: string;
  password: string;
  confirmPassword: string;
}

export interface IFilterObj {
  limit: number | any;
  offset: number | any;
  name?: string;
  email?: string;
  mobile_number?: string;
  role_id?: string;
  status?: string | number;
  standard?: string;
  subject?: string;
  topic?: string;
  subtopic?: string;
}
