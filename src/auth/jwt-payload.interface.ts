import { UserRole } from './entities/roles.enum';

export interface JwtPayload {
  email: string;
  role: UserRole;
}
