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

// To be remove later
export interface IMedicUser {
  id?: string;
  id_auto?: number;
  is_active?: boolean;
  email: string;
  fullname?: string;
  password?: string;
  mobile_no?: string | null;
  address?: string | null;
  date_of_birth?: string | null;
  status: 1 | 2 | 3 | 4;
  admin_id?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  isEditFlag?: boolean; //FE
  user_type?: number; //FE
}

export interface IPatientUser {
  id?: string;
  id_auto?: number;
  is_active?: boolean;
  email: string;
  fullname?: string;
  name?: string;
  password?: string;
  mobile_no?: string | null;
  address?: string | null;
  date_of_birth?: string | null;
  status: 1 | 2 | 3 | 4;
  medic_id?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  isEditFlag?: boolean; //FE
  user_type?: number; //FE
  patient_device?: string; //FE
  device?: Array<any>;
  chatId?: string | null;
}

export interface Idevice {
  admin_id?: string | null;
  created_at?: string | null;
  current_status: number;
  id?: string | null;
  id_auto?: number;
  imei?: string | null;
  medic_id?: string | null;
  patient_id?: string | null;
  updated_at?: string | null;
  medic_name?: string | null;
  patient_name?: string | null;
}

export interface IresetKey {
  email: string;
  user_type: number;
}

export interface IrequestReadings {
  imei: string;
  patientEmail: string;
}
export interface IReadingsDevice {
  rssi?: number;
  batteryVoltage?: number;
  signalStrength?: number;
  irregular?: number;
  deviceId?: number;
  unit?: number;
  diastolic?: number;
  systolic?: number;
  patient_id: string;
  pulse?: number;
  imei: string;
  id: string;
  ts?: number;
  date?: string;
  time?: string;
}

export interface IResetPassword {
  userType: string;
  resetToken: string;
  password: string;
}
