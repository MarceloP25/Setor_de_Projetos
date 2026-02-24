import type { Admin } from "./Admin";

export interface SystemLog {
  userId: string;
  userData: Admin;
  action: string;
  objectType: string;
  objectId: string;
  date: any;
}