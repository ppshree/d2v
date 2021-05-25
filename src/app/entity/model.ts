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
  school_code: string;
  standard: string;
  school_id?: string | null;
  created_by?: string;
  status: string;
  isEditFlag?: boolean;
}
