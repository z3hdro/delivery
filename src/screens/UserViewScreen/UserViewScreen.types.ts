import { Option } from 'types/picker';

export type ImageFile = {
  uri: string
  name?: string
  type: string
}

export type PersonData = {
  id: number
  phone: string
  name: string
  surname: string
  patronymic: string
  inn: string | null
  self_employed: boolean
  individual: boolean
  company: boolean
  jobPosition: Option | null
  email: string | null
  telegram: string | null
}

export type DrivingLicense = {
  series: string
  number: string
}

export type Passport = {
  series: string
  number: string
  authority: string
  date_of_issue: string
  department_code: string
}

export type PassportData = Passport & { photo: string[] }

export type CompanyData = {
  name: string
  inn: string
  kpp: string
  supplier: boolean
  buyer: boolean
  transport_company: boolean
}

export type ErrorMap = {
  phone: boolean
  companyName: boolean
  companyInn: boolean
  companyKpp: boolean
  email: boolean
  name: boolean
  surname: boolean
  jobPosition: boolean
  type: boolean
  driverLicenseSeries: boolean
  driverLicenseNumber: boolean
  passportSeries: boolean
  passportNumber: boolean
  passportAuthority: boolean
  passportDateOfIssue: boolean
  passportDepartmentCode: boolean
  photos: boolean
}

export type ValidationArgs = {
  company: boolean
  companyName: string
  companyInn: string
  companyKpp: string
  email?: string
  name: string
  surname: string
  jobPosition: Option | null
  selfEmployed: boolean
  driverLicenseSeries: string
  driverLicenseNumber: string
  passportSeries: string
  passportNumber: string
  passportAuthority: string
  passportDateOfIssue: string
  passportDepartmentCode: string
  photos: number
}
