import { InterfaceLanguage, InterfaceMode } from '../../database/schema/users';

export class GetProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  interfaceMode: InterfaceMode;
  interfaceLanguage: InterfaceLanguage;
  isActive: boolean;
}
