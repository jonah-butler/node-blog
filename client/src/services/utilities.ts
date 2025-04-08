import axios from 'axios';

const ERRORS = {
  NO_RESPONSE: 'the request failed unexpectedly',
};

function serviceErrorHandler(error: unknown, customError: string): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `${error.response.status}: ${error.response.data.error}`;
    } else if (error.request) {
      return ERRORS.NO_RESPONSE;
    } else {
      return error.message;
    }
  } else {
    return customError;
  }
}

function packageRecordIntoFormData(payload: Record<any, any>): FormData {
  const formData = new FormData();
  for (const key in payload) {
    if (payload[key]) {
      formData.append(key, payload[key]);
    }
  }
  return formData;
}

export { packageRecordIntoFormData, serviceErrorHandler };
