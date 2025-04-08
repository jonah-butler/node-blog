import { type EmailBody } from '@/types/services';
import { ServiceError } from '@/utilities/error';
import { serviceErrorHandler } from '../utilities';
import { api } from './api.config';

const CONTACT_SERVICE_ERRORS = {
  SEND_EMAIL: 'failed to send email',
};

type ContactErrors = keyof typeof CONTACT_SERVICE_ERRORS;
export class ContactServiceError extends ServiceError<ContactErrors> {}

const ContactService = {
  async sendEmail(email: EmailBody): Promise<boolean> {
    try {
      const response = await api.post(`/user/send-email/${email.to}`, email);
      return response.status === 200;
    } catch (err) {
      const message = serviceErrorHandler(
        err,
        CONTACT_SERVICE_ERRORS.SEND_EMAIL,
      );
      throw new ContactServiceError({ name: 'SEND_EMAIL', message });
    }
  },
};

export { CONTACT_SERVICE_ERRORS, ContactService };
