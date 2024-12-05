export type SuccessResponseType<T = void> = {
  success: true;
  message: string;
  data: T extends void ? {} : T;
};

export type ErrorResponseType = {
  success: false;
  error: string;
  isFormError?: boolean;
};
