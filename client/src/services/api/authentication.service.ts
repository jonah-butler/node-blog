import { ServiceError } from '@/utilities/error';
import { type LoginPayload } from '../../types/services';
import { type UserStore } from '../../types/user';
import { serviceErrorHandler } from '../utilities';
import { api } from './api.config';

const AUTHENTICATION_SERVICE_ERRORS = {
  LOGIN_FAILED: 'invalid login',
};

type AuthErrors = keyof typeof AUTHENTICATION_SERVICE_ERRORS;
export class AuthServiceError extends ServiceError<AuthErrors> {}

const AuthService = {
  async login(credentials: LoginPayload): Promise<UserStore> {
    try {
      const response = await api.post('/user/login', credentials);
      if (response.status !== 200) {
        throw new AuthServiceError({
          name: 'LOGIN_FAILED',
          message: AUTHENTICATION_SERVICE_ERRORS.LOGIN_FAILED,
        });
      }
      return response.data as UserStore;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        AUTHENTICATION_SERVICE_ERRORS.LOGIN_FAILED,
      );
      throw new AuthServiceError({
        name: 'LOGIN_FAILED',
        message,
      });
    }
  },
};

export { AUTHENTICATION_SERVICE_ERRORS, AuthService };
