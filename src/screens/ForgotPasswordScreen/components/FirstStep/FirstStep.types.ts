export type Props = {
  onSendCode: (phone: string) => Promise<void>;
  errorText: string | null;
  onResetError: () => void;
}
