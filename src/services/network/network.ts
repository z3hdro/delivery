import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { BASE_URL } from './network.consts';
import {
  ApprovedDriverResponse,
  LoginResponse,
  RefreshResponse,
  RegisterResponse,
  UnapprovedDriverResponse,
  UserInfoResponse
} from './types';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';

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

    this.applyAuthorizedInterceptors();
  }

  private applyAuthorizedInterceptors() {
    const refreshAuth = async (failedRequest: AxiosError) => {
      try {
        const storedAccessToken = await appStorage.getData(STORAGE_KEYS.REFRESH_TOKEN);
        const storedRefreshToken = await appStorage.getData(STORAGE_KEYS.REFRESH_TOKEN);

        if (!storedRefreshToken || !storedAccessToken) {
          throw new Error('no credentials');
        }

        const { accessToken } = await this.refreshAccessToken(storedRefreshToken);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        failedRequest.response!.config.headers.Authorization = `Bearer ${accessToken}`;

        this.setAuthHeader(accessToken);

        return Promise.resolve();
      } catch (error) {
        if (this.userId) {
          this.setUserId(null);
          this.clearAuthHeader();

          await appStorage.removeData(STORAGE_KEYS.ACCESS_TOKEN);
        }

        return Promise.reject(error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    createAuthRefreshInterceptor(this.authorizedClient, refreshAuth);
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

  public async refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
    const result = await this.unauthorizedClient.post<RefreshResponse>('auth/refresh', { refreshToken });

    console.log('refresh result: ', result.data);

    return result.data;
  }

  public async login(data: {
    phone: string;
    password: string;
    fcmToken: string;
  }): Promise<LoginResponse> {
    const result = await this.unauthorizedClient.post<LoginResponse>('auth/signIn', data);

    console.log('login result: ', result.data);

    return result.data;
  }

  public async register(data: {
    phone: string;
    password: string;
    fcmToken: string;
  }): Promise<RegisterResponse> {
    const result = await this.unauthorizedClient.post<RegisterResponse>('auth/signUp', data);

    console.log('register result: ', result.data);

    return result.data;
  }

  public async logout() {
    const result = await this.authorizedClient.post<LoginResponse>('auth/logout');

    console.log('login result: ', result.data);
  }

  public async getUserData(): Promise<UserInfoResponse> {
    const result = await this.authorizedClient.get<UserInfoResponse>('auth/user');

    console.log('usetData result: ', result.data);

    return result.data;
  }

  public async getApprovedDrivers(): Promise<ApprovedDriverResponse> {
    const result = await this.authorizedClient.get<ApprovedDriverResponse>('drivers/approved');

    console.log('approved drivers result: ', result.data);

    return result.data;
  }

  public async getUnapprovedDrivers(): Promise<UnapprovedDriverResponse> {
    const result = await this.authorizedClient.get<UnapprovedDriverResponse>('drivers/unapproved');

    console.log('unapproved drivers result: ', result.data);

    return result.data;
  }

}

export const networkService = new NetworkService({
  baseURL: BASE_URL,
});
