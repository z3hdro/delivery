import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { BASE_URL } from './network.consts';
import {
  DRIVER_LIST_LIMIT,
  LOGISTIC_POINT_LIMIT,
  MEASURE_LIMIT,
  NOMENCLATURE_LIMIT,
  ORDER_LIMIT
} from 'constants/limit';
import {
  AddLogisticPointPayload,
  AddNomenclaturePayload,
  AddressPayload,
  AddressResponse,
  AllOrderResponse,
  ApprovedDriverResponse,
  AvailableOrderResponse, CancelOrderPayload,
  CheckCodePayload,
  CompleteOrderPayload,
  ConfirmOrderPayload,
  ContactPayload,
  ContactResponse,
  CurrentOrderResponse,
  DepartOrderPayload, GetManagerPhoneResponse,
  JobsResponse,
  LoginPayload,
  LoginResponse,
  LogisticPointResponse,
  MeasureResponse,
  MessageResponse,
  NomenclatureResponse,
  OrderGeoPayload, OrderGeoResponse,
  OrderPayload,
  RefreshResponse,
  RegisterPayload,
  RegisterResponse,
  RejectOrderPayload,
  ResetPasswordPayload,
  TakeOrderPayload,
  UnapprovedDriverResponse, UpdateAddressResponse, UpdateContactResponse, UpdateOrderPayload,
  UserInfoResponse,
  WorkingDriversResponse
} from './types';
import { Order } from 'types/order';
import { Nomenclature } from 'types/nomenclature';
import { ORDER_TAB_STATUS } from 'constants/order';

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

  public getAuthorizationToken(): string {
    return this.authorizedClient.defaults.headers.common.Authorization as string;
  }

  public clearAuthHeader() {
    this.authorizedClient.defaults.headers.common.Authorization = '';
  }

  public async refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
    const result = await this.unauthorizedClient.post<RefreshResponse>('auth/refresh', { refreshToken });

    console.log('refresh result: ', result.data);

    return result.data;
  }

  public async login(data: LoginPayload): Promise<LoginResponse> {
    console.log('LoginPayload: ', data);
    const result = await this.unauthorizedClient.post<LoginResponse>('auth/signIn', data);

    console.log('login result: ', result.data);

    return result.data;
  }

  public async register(data: RegisterPayload): Promise<RegisterResponse> {
    console.log('RegisterPayload: ', data);
    const result = await this.unauthorizedClient.post<RegisterResponse>('auth/signUp', data);

    console.log('register result: ', result.data);

    return result.data;
  }

  public async logout() {
    const result = await this.authorizedClient.post<LoginResponse>('auth/logout');

    console.log('logout result: ', result.data);
  }

  public async recover(phone: string) {
    const result = await this.authorizedClient.post<MessageResponse>('auth/password/recover', { phone });

    console.log('recover result: ', result.data);
  }

  public async checkcode(data: CheckCodePayload) {
    const result = await this.authorizedClient.post<MessageResponse>('auth/password/checkcode', data);

    console.log('checkcode result: ', result.data);
  }

  public async resetPassword(data: ResetPasswordPayload) {
    const result = await this.authorizedClient.post<MessageResponse>('auth/password/reset', data);

    console.log('resetPassword result: ', result.data);
  }

  public async getUserData(): Promise<UserInfoResponse> {
    const result = await this.authorizedClient.get<UserInfoResponse>('auth/user');

    console.log('userData result: ', result.data);

    return result.data;
  }

  public async getApprovedDrivers(offset: number): Promise<ApprovedDriverResponse> {
    const result =
      await this.authorizedClient.get<ApprovedDriverResponse>(
        `drivers/approved?offset=${offset * DRIVER_LIST_LIMIT}&limit=${DRIVER_LIST_LIMIT}`
      );

    console.log('approved drivers result: ', result.data);

    return result.data;
  }

  public async getUnapprovedDrivers(offset: number): Promise<UnapprovedDriverResponse> {
    const result =
      await this.authorizedClient.get<UnapprovedDriverResponse>(
        `drivers/unapproved?offset=${offset * DRIVER_LIST_LIMIT}&limit=${DRIVER_LIST_LIMIT}`
      );

    console.log('unapproved drivers result: ', result.data);

    return result.data;
  }

  public async confirmDriver(data: FormData): Promise<MessageResponse> {
    console.log('formData: ', data);
    const result = await this.authorizedClient.post<MessageResponse>('drivers/confirm', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    console.log('confirmDriver result: ', result.data);

    return result.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async updateDriver(data: FormData): Promise<any> {
    console.log('formData: ', data);
    const result = await this.authorizedClient.post<MessageResponse>('drivers/update', data);

    console.log('updateDriver result: ', result.data);

    return result.data;
  }

  public async getDriverManagerPhone(): Promise<GetManagerPhoneResponse> {
    const result = await this.authorizedClient.get<GetManagerPhoneResponse>('drivers/getManagerPhone');

    console.log('getManagerPhone result: ', result.data);

    return result.data;
  }

  public async getAllJobs(): Promise<JobsResponse> {
    const result = await this.authorizedClient.get<JobsResponse>('drivers/jobs');

    console.log('getAllJobs result: ', result.data);

    return result.data;
  }

  public async addContact(data: ContactPayload): Promise<ContactResponse> {
    console.log('addContact payload: ', data);
    const result =
      await this.authorizedClient.post<ContactResponse>('contacts', data);

    console.log('addContact result: ', result.data);

    return result.data;
  }

  public async updateContact(data: ContactPayload, contactId: number): Promise<UpdateContactResponse> {
    const result =
      await this.authorizedClient.put<UpdateContactResponse>(`contacts/${contactId}`, data);

    console.log('updateContact result: ', result.data);

    return result.data;
  }

  public async addAddress(data: AddressPayload): Promise<AddressResponse> {
    console.log('addAddress payload: ', JSON.stringify(data));
    const result =
      await this.authorizedClient.post<AddressResponse>('address', data);

    console.log('addAddress result: ', result.data);

    return result.data;
  }

  public async updateAddress(data: AddressPayload, addressId: number): Promise<UpdateAddressResponse> {
    console.log('AddressPayload: ', data);
    const result =
      await this.authorizedClient.put<UpdateAddressResponse>(`address/${addressId}`, data);

    console.log('updateAddress result: ', result.data);

    return result.data;
  }

  public async getAllLogisticPoint(offset: number): Promise<LogisticPointResponse> {
    const result =
      await this.authorizedClient.get<LogisticPointResponse>(
        `logisticPoint/all?limit=${LOGISTIC_POINT_LIMIT}&offset=${offset * LOGISTIC_POINT_LIMIT}`
      );

    console.log('AllLogisticPoint result: ', result.data);

    return result.data;
  }

  public async addLogisticPoint(data: AddLogisticPointPayload): Promise<void> {
    console.log('addLogisticPoint payload: ', JSON.stringify(data));
    const result =
      await this.authorizedClient.post<void>('logisticPoint', data);

    console.log('addLogisticPoint result: ', result.data);
  }

  public async updateLogisticPoint(data: AddLogisticPointPayload, pointId: number): Promise<void> {
    console.log('update AddLogisticPointPayload: ', JSON.stringify(data));
    const result =
      await this.authorizedClient.put<void>(`logisticPoint/${pointId}`, data);

    console.log('updateLogisticPoint result: ', result.data);
  }

  public async deleteLogisticPoint(pointId: number): Promise<void> {
    console.log('deleteLogisticPoint pointId: ', pointId);
    const result =
      await this.authorizedClient.delete<void>(`logisticPoint/${pointId}`);

    console.log('deleteLogisticPoint result: ', result.data);
  }

  public async getAllMeasures(offset: number): Promise<MeasureResponse> {
    const result =
      await this.authorizedClient.get<MeasureResponse>(
        `measures/all?offset=${offset * MEASURE_LIMIT}&limit=${MEASURE_LIMIT}`
      );

    console.log('all measures result: ', result.data);

    return result.data;
  }

  public async searchNomenclatures(search: string): Promise<NomenclatureResponse> {
    const result =
      await this.authorizedClient.get<NomenclatureResponse>(
        `nomenclature/search?name=${search}`
      );

    console.log('searchNomenclatures result: ', result.data);

    return result.data;
  }

  public async getNomenclatures(offset: number): Promise<NomenclatureResponse> {
    const result =
      await this.authorizedClient.get<NomenclatureResponse>(
        `nomenclature/all?offset=${offset * NOMENCLATURE_LIMIT}&limit=${NOMENCLATURE_LIMIT}`
      );

    console.log('getNomenclatures result: ', result.data);

    return result.data;
  }

  public async addNomenclature(data: AddNomenclaturePayload): Promise<Nomenclature> {
    console.log('AddNomenclaturePayload: ', data);
    const result = await this.authorizedClient.post<Nomenclature>('nomenclature', data);

    console.log('addNomenclature result: ', result.data);

    return result.data;
  }

  public async updateNomenclature(nomenclatureId: number, data: AddNomenclaturePayload): Promise<Nomenclature> {
    console.log('nomenclatureId: ', nomenclatureId);
    console.log('payload: ', data);
    const result = await this.authorizedClient.put<Nomenclature>(`nomenclature/${nomenclatureId}`, data);

    console.log('updateNomenclature result: ', result.data);

    return result.data;
  }

  public async deleteNomenclature(nomenclatureId: number): Promise<MessageResponse> {
    console.log('nomenclatureId: ', nomenclatureId);
    const result = await this.authorizedClient.delete<MessageResponse>(`nomenclature/${nomenclatureId}`);

    console.log('deleteNomenclature result: ', result.data);

    return result.data;
  }



  public async getAvailableOrders(
    offset: number,
    status: ORDER_TAB_STATUS = ORDER_TAB_STATUS.ALL
  ): Promise<AvailableOrderResponse> {
    const result =
      await this.authorizedClient.get<AvailableOrderResponse>(
        `orders/available?offset=${offset * ORDER_LIMIT}&limit=${ORDER_LIMIT}&?status=${status}`
      );

    console.log(`getAvailableOrders result with status ${status}: `, result.data);

    return result.data;
  }

  public async getCurrentOrder(): Promise<CurrentOrderResponse> {
    const result =
      await this.authorizedClient.get<CurrentOrderResponse>(
        'orders/current'
      );

    console.log('getCurrentOrder result: ', result.data);

    return result.data;
  }

  public async getAllOrders(
    offset: number,
    status: ORDER_TAB_STATUS = ORDER_TAB_STATUS.ALL
  ): Promise<AllOrderResponse> {
    const result =
      await this.authorizedClient.get<AllOrderResponse>(
        `orders/all?offset=${offset * ORDER_LIMIT}&limit=${ORDER_LIMIT}&status=${status}`
      );

    console.log(`getAllOrders result with status ${status}: `, JSON.stringify(result.data));

    return result.data;
  }

  public async getOrder(orderId: number): Promise<Order> {
    const result =
      await this.authorizedClient.get<Order>(
        `orders/${orderId}`
      );

    console.log('getOrder result: ', result.data);

    return result.data;
  }

  public async updateOrder(orderId: number, data: UpdateOrderPayload): Promise<Order> {
    console.log('updateOrder payload: ', data);
    const result =
      await this.authorizedClient.put<Order>(
        `orders/${orderId}`,
        data
      );

    console.log('updateOrder result: ', result.data);

    return result.data;
  }

  public async deleteOrder(orderId: number): Promise<Order> {
    const result =
      await this.authorizedClient.delete<Order>(
        `orders/${orderId}`
      );

    console.log('deleteOrder result: ', result.data);

    return result.data;
  }

  public async getWorkingDrivers(): Promise<WorkingDriversResponse> {
    const result =
      await this.authorizedClient.get<WorkingDriversResponse>('orders/drivers');

    console.log('getWorkingDrivers result: ', result.data);

    return result.data;
  }

  public async addOrder(data: OrderPayload): Promise<Order> {
    console.log('addOrder payload: ', JSON.stringify(data));
    const result = await this.authorizedClient.post<Order>('orders/create', data);

    console.log('addOrder result: ', result.data);

    return result.data;
  }

  public async takeOrder(data: TakeOrderPayload): Promise<MessageResponse> {
    const result = await this.authorizedClient.post<MessageResponse>('orders/take', data);

    console.log('takeOrder result: ', result.data);

    return result.data;
  }

  public async confirmOrder(data: ConfirmOrderPayload): Promise<MessageResponse> {
    const result = await this.authorizedClient.post<MessageResponse>('orders/confirm', data);

    console.log('confirmOrder result: ', result.data);

    return result.data;
  }

  public async rejectOrder(data: RejectOrderPayload): Promise<MessageResponse> {
    const result = await this.authorizedClient.post<MessageResponse>('orders/rejectDriver', data);

    console.log('rejectOrder result: ', result.data);

    return result.data;
  }

  public async departOrder(data: DepartOrderPayload): Promise<MessageResponse> {
    const result = await this.authorizedClient.post<MessageResponse>('orders/depart', data);

    console.log('departOrder result: ', result.data);

    return result.data;
  }

  public async completeOrder(data: CompleteOrderPayload): Promise<MessageResponse> {
    const result = await this.authorizedClient.post<MessageResponse>('orders/complete', data);

    console.log('completeOrder result: ', result.data);

    return result.data;
  }

  public async updateOrderGeo(data: OrderGeoPayload): Promise<MessageResponse> {
    console.log('OrderGeoPayload: ', data);
    const result = await this.authorizedClient.post<MessageResponse>('orders/updateGeo', data);

    console.log('updateOrderGeo result: ', JSON.stringify(result.data));

    return result.data;
  }

  public async getManagerPhone(): Promise<GetManagerPhoneResponse> {
    const result = await this.authorizedClient.get<GetManagerPhoneResponse>('orders/getManagerPhone');

    console.log('getManagerPhone result: ', result.data);

    return result.data;
  }

  public async cancelOrder(data: CancelOrderPayload): Promise<MessageResponse> {
    const result = await this.authorizedClient.post<MessageResponse>('orders/cancel', data);

    console.log('cancelOrder result: ', result.data);

    return result.data;
  }

  public async getOrderGeo(orderId: number): Promise<OrderGeoResponse> {
    const result = await this.authorizedClient.get<OrderGeoResponse>(`orders/${orderId}/geo`);

    console.log('getOrderGeo result: ', result.data);

    return result.data;
  }

}

export const networkService = new NetworkService({
  baseURL: BASE_URL,
});
