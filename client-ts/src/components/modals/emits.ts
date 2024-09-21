export interface ConfirmationModalEmits {
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}

export interface MainModalEmits {
  (e: 'close'): void;
}
