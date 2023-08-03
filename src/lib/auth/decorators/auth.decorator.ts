import { SetMetadata } from '@nestjs/common';
import { AUTH_KEY } from 'src/constants/keys';

export const AuthAccess = (require: boolean) => SetMetadata(AUTH_KEY, require);
