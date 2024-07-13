export interface ModalProps {
  id: string;
  useVHTML: boolean;
  contents?: string;
}

export interface ConfirmationModalProps {
  id: string;
  confirmButtonText: string;
  cancelButtonText: string;
}
