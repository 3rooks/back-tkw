import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/keys';
import { ROLES } from 'src/constants/roles';

export const RolesAccess = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
