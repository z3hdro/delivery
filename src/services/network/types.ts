import { ApprovedDriver, Person, UnapprovedDriver, User } from 'types/user';

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export type RegisterResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export type UserInfoResponse = {
  person: Person
}

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

export type ApprovedDriverResponse = ApprovedDriver[]

export type UnapprovedDriverResponse = UnapprovedDriver[]