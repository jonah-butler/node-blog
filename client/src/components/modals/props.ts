export interface ModalProps {
  id: string;
  useVHTML: boolean;
  contents?: string;
  useClose?: boolean;
}

export interface ConfirmationModalProps {
  id: string;
  confirmButtonText: string;
  cancelButtonText: string;
}
