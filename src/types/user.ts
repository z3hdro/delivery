export type User = {
  phone: string
  role: string
  approved: boolean
}

export type UserPerson = {
  id: number
  phone: string
  approved: boolean
}

export type Contragent = {
  id: 0,
  name: string
  inn: string
  kpp: string
  supplier: boolean
  buyer: boolean
  transport_company: boolean
}

export type PersonJobPosition = {
  id: number
  name: string
}

export type Person = {
  user: UserPerson
  contragent: Contragent
  jobPosition: PersonJobPosition
}

export type ApprovedDriver = {
  id: number
  name: string
  surname: string
  patronymic: string
  inn: string
  self_employed: boolean
  individual: boolean
  company: boolean
  email: string
  telegram: string
  user_id: number,
  job_position_id: number,
  passport_id: number,
  contragent_id: number
}

export type UnapprovedDriver = {
  id: number
  phone: string
  password: string
  role_id: number
  approved: boolean
  responsible_user: number
  refresh_token: string
  fcm_token: string
}