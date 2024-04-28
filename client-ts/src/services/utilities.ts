import axios from "axios";

const ERRORS = {
  NO_RESPONSE: "the request failed unexpectedly",
}

function serviceErrorHandler(error: unknown, customError: string): string {
  if(axios.isAxiosError(error)) {
    
    if(error.response) {
      const err = error.response.data;
      return `${err.statusCod}: ${err.message}`;
    } else if(error.request) {
      return ERRORS.NO_RESPONSE;
    } else {
      return error.message;
    }
    
  } else {
    return customError;
  }
}

function packageRecordIntoFormData(payload: Record<any, any>): FormData {
  console.log("payload: ", payload);
  const form_data = new FormData();
  return form_data;
}

export {
  serviceErrorHandler,
  packageRecordIntoFormData,
};