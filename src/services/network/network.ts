import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import { BASE_URL } from './network.consts';
class NetworkService {
  protected unauthorizedClient: AxiosInstance;

  protected authorizedClient: AxiosInstance;

  protected userId: string | null;

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.unauthorizedClient = axios.create({
      ...axiosConfig,
    });
    this.authorizedClient = axios.create({
      ...axiosConfig,
    });
    this.userId = null;
  }

  public setUserId(userId: string | null) {
    this.userId = userId;
  }

  public setAuthHeader(token: string) {
    this.authorizedClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  public clearAuthHeader() {
    this.authorizedClient.defaults.headers.common.Authorization = '';
  }

  public async login(data: {
    username: string;
    password: string;
  }): Promise<object> {
    // const result = await this.unauthorizedClient.post('auth/login', data);
    const result: { data: object } = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: {} });
      }, 1000);
    });

    return result.data;
  }

  // public async logout(): Promise<LogoutResponse> {
  //   const result = await this.authorizedClient.post('auth/logout');
  //
  //   return result.data;
  // }

  // public async logoutToken(token: string): Promise<void> {
  //   await fetch(`${this.unauthorizedClient.getUri()}auth/logout`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  // public async refreshToken(): Promise<string> {
  //   const refreshTokenRes =
  //     await this.authorizedClient.post<RefreshTokenResponse>('auth/refresh');
  //
  //   if (refreshTokenRes.data.signInResults !== 'Succeeded') {
  //     throw new Error('Error refreshing auth token');
  //   }
  //
  //   await this.setAuthHeader(refreshTokenRes.data.token);
  //
  //   return refreshTokenRes.data.token;
  // }

  // public async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  //   const result = await this.unauthorizedClient.post('auth/password/forgot', {
  //     email,
  //   });
  //
  //   return result.data;
  // }
  //
  // public async signUp(email: string): Promise<SignUpResponse> {
  //   const result = await this.unauthorizedClient.post('auth/signup', {
  //     email,
  //   });
  //
  //   return result.data;
  // }
}

export const networkService = new NetworkService({
  baseURL: BASE_URL,
});
