export type Driver = {
  id: 0
  name: string
  surname: string
}

export type WorkingDriver = {
  orderId: number
  geo: string
  driver: Driver
}