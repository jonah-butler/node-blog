import { api } from './api.config';
import { ServiceError } from '@/utilities/error';
import { serviceErrorHandler } from '../utilities';
import { type EmailBody } from '@/types/services';

const CONTACT_SERVICE_ERRORS = {
  SEND_EMAIL: 'failed to send email',
};

type ContactErrors = keyof typeof CONTACT_SERVICE_ERRORS;
export class ContactServiceError extends ServiceError<ContactErrors> {}

const ContactService = {
  async sendEmail(email: EmailBody): Promise<boolean> {
    try {
      const response = await api.post('/email', email);
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

export { ContactService, CONTACT_SERVICE_ERRORS };
