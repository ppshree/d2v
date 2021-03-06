/* eslint-disable @typescript-eslint/no-explicit-any */
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
  offset: number;
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

export interface ICreateAdmin {
  id?: string;
  name: string;
  email: string;
  mobile_number: string;
  role_id: string | any;
  school_code?: string;
  school_id?: string | any;
  created_by?: string;
  isEditFlag?: boolean;
  status: string;
}
export interface ICreateContentManager {
  id?: string;
  name: string;
  email: string;
  mobile_number: string;
  role_id: string | any;
  school_code?: string;
  standard: string;
  school_id?: string | any;
  created_by?: string;
  status: string | any;
  isEditFlag?: boolean;
}

export interface ICreateTutor {
  id?: string;
  name: string;
  email: string;
  mobile_number: string;
  role_id: string | any;
  school_code?: string;
  standard: string;
  school_id?: string | any;
  created_by?: string;
  status: string | any;
  isEditFlag?: boolean;
}

export interface ICreateStudent {
  id?: string;
  name: string;
  email: string;
  mobile_number: string;
  role_id: string | any;
  school_code?: string;
  standard: string;
  school_id?: string | any;
  created_by?: string;
  status: string | any;
  isEditFlag?: boolean;
}

export interface ICreateSchool {
  id?: string;
  school_name: string;
  school_head: string;
  classes: string;
  address: string;
  pin: string;
  city: string;
  contact_number: string;
  email: string;
  affiliation_no: string;
  authorized_by?: string;
  is_active?: boolean;
  created_by?: string;
  isEditFlag?: boolean;
}

export interface ITags {
  id?: string;
  learning_outcome: string;
  created_by?: string;
  isEditFlag?: boolean;
  created_at?: string;
}
export interface IClass {
  id?: string;
  standard_name: string;
  created_by?: string;
  isEditFlag?: boolean;
  created_at?: string;
}

export interface ISubject {
  id?: string | any;
  subject_name: string;
  subject_image: string;
  standard_id: string | any;
  standard_name?: string;
  created_by?: string;
  isEditFlag?: boolean;
  created_at?: string;
}
export interface ITopic {
  id?: string | any;
  topic_name: string;
  subject_id?: string;
  subject_name?: string;
  created_by?: string;
  isEditFlag?: boolean;
  created_at?: string;
}
export interface ISubTopic {
  id?: string | any;
  sub_topic_name: string;
  topic_id?: string;
  topic_name?: string;
  created_by?: string;
  isEditFlag?: boolean;
  created_at?: string;
}
