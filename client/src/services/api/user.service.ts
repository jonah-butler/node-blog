import { type UserProfileResponse } from '@/types/services';
import { ServiceError } from '@/utilities/error';
import { serviceErrorHandler } from '../utilities';
import { api } from './api.config';

const USER_SERVICE_ERRORS = {
  GET_USER_PUBLIC: 'failed to get public user profile',
};

type UserErrors = keyof typeof USER_SERVICE_ERRORS;
export class UserServiceError extends ServiceError<UserErrors> {}

const UserService = {
  async getPublicUserProfile(username: string): Promise<UserProfileResponse> {
    try {
      const response = await api.get(`/user/${username}`);

      return response.data;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        USER_SERVICE_ERRORS.GET_USER_PUBLIC,
      );
      throw new UserServiceError({ name: 'GET_USER_PUBLIC', message });
    }
  },
};

export { USER_SERVICE_ERRORS, UserService };
