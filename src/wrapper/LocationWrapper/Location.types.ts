import { ReactNode } from 'react';
import { LocationObject } from 'expo-location';

export type Props = {
  children: ReactNode
}

export type TASK_DATA = {
  locations: LocationObject[]
}
