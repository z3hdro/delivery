import { Job } from 'types/jobs';
import { DrivingLicense } from 'screens/UserViewScreen/UserViewScreen.types';
import { USER_STATUS } from 'constants/user';

export type Role = {
  id: number
  name: string
}

export type UserFull = {
  id: number
  phone: string
  role_id: number
  approved: boolean
  responsible_user: number | null,
  createdAt: string
  updatedAt: string
  role: Role
}

export type User = UserFull & {
  password: string
  refresh_token: string
  fcm_token: string | null,
}

export type UserPerson = {
  id: number
  phone: string
  approved: boolean
  role: Role
}

export type Contragent = {
  id: 0
  name: string
  inn: string
  kpp: string
  supplier: boolean
  buyer: boolean
  transport_company: boolean
  createdAt: string
  updatedAt: string
}

export type Passport = {
  id: number
  series: number
  number: number
  authority: string
  date_of_issue: string
  department_code: string
  createdAt: string
  updatedAt: string
}

export type PersonJobPosition = {
  id: number
  name: string
}

export type Person = {
  id: number
  user_id: number
  user: UserPerson
  contragent: Contragent
  jobPosition: PersonJobPosition
}

export type ExtendedPerson = Person & {
  name: string | null
  surname: string | null
  patronymic: string | null
}

export type ApprovedDriver = {
  id: number
  user_id: number
  name: string
  surname: string
  patronymic: string
  job_position_id: number | null
  inn: string | null
  passport_id: number
  self_employed: boolean
  individual: boolean
  company: boolean
  contragent_id: number | null
  email: string | null
  telegram: string | null
  createdAt: string
  updatedAt: string
  user: UserFull
  contragent: Contragent | null,
  jobPosition: Job | null,
  passport: Passport | null
  drivingLicense: DrivingLicense | null
}

export type UnapprovedDriver = {
  id: number
  phone: string
  role_id: number
  approved: boolean
  responsible_user: number | null
  createdAt: string
  updatedAt: string
  role: Role
}

export type Manager = {
  id: number
  user_id: number
  name: string | null
  surname: string | null
  patronymic: string | null
  job_position_id: number | null
  inn: string | null
  passport_id: string | null
  self_employed: boolean
  individual: boolean
  company: boolean
  contragent_id: number | null
  email: string | null
  telegram: string | null
  createdAt: string
  updatedAt: string
  user: {
    id: number
    phone: string
    role_id: number
    approved: boolean
    responsible_user: number | null
    createdAt: string
    updatedAt: string
  }
}

export type USER_STATUS_VALUES = `${USER_STATUS}`
