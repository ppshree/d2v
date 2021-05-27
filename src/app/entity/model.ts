/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICreateAdmin {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  role_id: string;
  school_code: string;
  school_id?: string | null;
  created_by?: string;
  status: string;
}
export interface ICreateContentManager {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  role_id: string;
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
  contact_number?: string;
  email: string;
  affiliation_no?: string;
  authorized_by?: string;
  is_active?: boolean;
}
