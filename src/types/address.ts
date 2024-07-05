export type Country = {
  id: number
  name: string
}

export type City = {
  id: number
  name: string
}

export type Street = {
  id: number
  name: string
}

export type Region = {
  id: number
  name: string
}

export type Address = {
  id: number
  name: string | null
  country_id: number
  city_id: number
  street_id: number
  house: string
  building: string
  floor: string | null
  postcode: string | null
  apartment: string | null
  description: string
  Country: Country
  City: City
  Street: Street
  Region: Region | null
}
