export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  isActive: boolean;
}
