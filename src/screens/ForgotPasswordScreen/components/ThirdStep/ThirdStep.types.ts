export type Props = {
  restorePassword: (password: string, confirmPassword: string) => Promise<void>;
}