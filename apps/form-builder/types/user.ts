export type InterfaceMode = 'light' | 'dark' | 'system';

export type InterfaceLanguage = 'en-US' | 'vi-VN';

export type Role = 'user' | 'admin' | 'superadmin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  interfaceMode: InterfaceMode;
  interfaceLanguage: InterfaceLanguage;
  isActive: boolean;
}
