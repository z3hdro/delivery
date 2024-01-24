import { EMPTY_COMPANY, EMPTY_PASSPORT, EMPTY_PERSON } from './UserViewScreen.consts';

export type Person = typeof EMPTY_PERSON;
export type Passport = typeof EMPTY_PASSPORT & { photo: string[] }
export type Company = typeof EMPTY_COMPANY