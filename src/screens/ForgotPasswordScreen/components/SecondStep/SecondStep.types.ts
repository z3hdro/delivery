export type Props = {
  userPhone: string
  resendCode: () => Promise<void>;
  onSendConfirmCode: (code: string) => Promise<void>;
}