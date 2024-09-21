import axios from 'axios';

const ERRORS = {
  NO_RESPONSE: 'the request failed unexpectedly',
};

function serviceErrorHandler(error: unknown, customError: string): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log(error);
      return `${error.response.status}: ${error.message}`;
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
    if (payload[key] !== null || payload[key] !== '') {
      formData.append(key, payload[key]);
    }
  }
  return formData;
}

export { serviceErrorHandler, packageRecordIntoFormData };
