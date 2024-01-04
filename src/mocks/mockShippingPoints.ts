export const MOCK_SHIPPING_POINTS = [
  {
    id: 1,
    name: 'Металлобаза №3',
    address: {
      id: 1,
      name: 'Металлобаза №3',
      country: 'РФ',
      city: 'Москва',
      street: 'ул.Кошкина',
      house: '2',
      building: 'к2',
      floor: '1',
      postcode: '533145',
      apartment: '',
      description: ''
    },
    contacts: [
      {
        id: 88,
        name: 'Валерий',
        surname: 'Игнатьев',
        patronymic: 'Юрьевич',
        jobTitle: 'менеджер',
        phone: '+79854502085',
        email: 'ignatev@bk.ru',
        telegram: '@ignatev',
        description: '',
      },
      {
        id: 89,
        name: 'Кутепов',
        surname: 'Виталий',
        patronymic: 'Александрович',
        jobTitle: 'скалдщик',
        phone: '+79850430022',
        email: 'kutepov@mail.ru',
        telegram: '@kutepov',
        description: '',
      },
    ]
  },
  {
    id: 2,
    name: 'Склад №1',
    address: {
      id: 2,
      name: 'Склад №1',
      country: 'РФ',
      city: 'Санкт-Петербург',
      street: 'ул.Мира',
      house: '56',
      building: '',
      floor: '5',
      postcode: '142124',
      apartment: '',
      description: ''
    },
    contacts: [
      {
        id: 120,
        name: 'Иванов',
        surname: 'Петр',
        patronymic: 'Михайлович',
        jobTitle: 'скалдщик',
        phone: '+79853551112',
        email: 'ivanov@bk.ru',
        telegram: '@ivanov',
        description: '',
      },
    ]
  },
  {
    id: 3,
    name: 'Пром.зона №86',
    address: {
      id: 3,
      name: 'Пром.зона №86',
      country: 'РФ',
      city: 'Воронеж',
      street: 'проспект.Дружбы',
      house: '15',
      building: '3',
      floor: '1',
      postcode: '533145',
      apartment: '',
      description: ''
    },
    contacts: [
      {
        id: 121,
        name: 'Валерий',
        surname: 'Игнатьев',
        patronymic: 'Юрьевич',
        jobTitle: 'менеджер',
        phone: '+79854502085',
        email: 'ignatev@bk.ru',
        telegram: '@ignatev',
        description: '',
      },
      {
        id: 122,
        name: 'Кутепов',
        surname: 'Виталий',
        patronymic: 'Александрович',
        jobTitle: 'скалдщик',
        phone: '+79850430022',
        email: 'kutepov@mail.ru',
        telegram: '@kutepov',
        description: '',
      },
    ]
  },
  {
    id: 4,
    name: 'Склад №12',
    address: {
      id: 4,
      name: 'Склад №12',
      country: 'РФ',
      city: 'Москва',
      street: 'ул.Каширская',
      house: '2',
      building: 'к2',
      floor: '1',
      postcode: '135133',
      apartment: '',
      description: ''
    },
    contacts: [
      {
        id: 123,
        name: 'Кутепов',
        surname: 'Виталий',
        patronymic: 'Александрович',
        jobTitle: 'скалдщик',
        phone: '+79850430022',
        email: 'kutepov@mail.ru',
        telegram: '@kutepov',
        description: '',
      },
    ]
  }
];

export type MockShippingPoint = typeof MOCK_SHIPPING_POINTS[0]