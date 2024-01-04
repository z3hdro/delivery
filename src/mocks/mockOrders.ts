export const MOCK_ORDERS = [
  {
    id: 1,
    departure: {
      name: 'склад №2',
      address: {
        name: 'склад №2',
        country: 'РФ',
        city: 'Омск',
        street: 'Ленина',
        house: '45',
        building: '99',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Василий',
          surname: 'Пупкин',
          partonymic: 'Петрович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        },
        {
          name: 'Петр',
          surname: 'Брюхин',
          partonymic: 'Васильевич',
          jobTitle: 'кладовщик',
          phone: 79099999999,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 54.989347,
        lon: 73.368221,
      }
    },
    destination: {
      name: 'склад№3',
      address: {
        name: 'склад№3',
        country: 'РФ',
        city: 'Чебоксары',
        street: 'Мира',
        house: '33',
        building: '69',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Иван',
          surname: 'Иванов',
          partonymic: 'Иванович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 56.139918,
        lon: 47.247728,
      }
    },
    nomenclature: {
      name: 'Лом 3А',
      measureName: 'т'
    },
    status: 0,
    driver: {
      userId: 111,
      name: 'Иванов',
      surname: 'Иванов',
      patronymic: 'Иванов',
      jobPosition: 'Водитель',
      personInn: '1234567890',
      passportId: {
        series: '4444',
        number: '666666',
        authority: 'МВД РФ',
        dateOfIssue: '2026-12-01T00:00:00.000Z',
        photo: []
      },
      selfEmployed: true,
      individual: false,
      company: false,
      contragentId: 513535,
      phone: '+79858404937',
      email: 'ivanov@mail.ru',
      telegram: '@ivanov',
    },
    deliveryDatePlan: '2023-12-29T19:00:00.000Z',
    deliveryDateFact: null,
    departureDatePlan: '2023-12-26T10:40:00.000Z',
    departureDateFact: null,
    grossWeight: 10,
    netWeight: 8,
    truckVin: '999 999 99 99',
    geo: {
      lat: 57.124198,
      lon: 65.461618,
    }
  },
  {
    id: 2,
    departure: {
      name: 'склад №2',
      address: {
        name: 'склад №2',
        country: 'РФ',
        city: 'Якутск',
        street: 'Ленина',
        house: '45',
        building: '14',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Василий',
          surname: 'Пупкин',
          partonymic: 'Петрович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        },
        {
          name: 'Петр',
          surname: 'Брюхин',
          partonymic: 'Васильевич',
          jobTitle: 'кладовщик',
          phone: 79854442211,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 0,
        lon: 0,
      }
    },
    destination: {
      name: 'склад№3',
      address: {
        name: 'склад№3',
        country: 'РФ',
        city: 'Новокузнецк',
        street: 'Мира',
        house: '33',
        building: '5',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Иван',
          surname: 'Иванов',
          partonymic: 'Иванович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 0,
        lon: 0,
      }
    },
    nomenclature: {
      name: 'Лом 5А',
      measureName: 'т'
    },
    status: 1,
    driver: {
      userId: 111,
      name: 'Иванов',
      surname: 'Иванов',
      patronymic: 'Иванов',
      jobPosition: 'Водитель',
      personInn: '1234567890',
      passportId: {
        series: '4444',
        number: '666666',
        authority: 'МВД РФ',
        dateOfIssue: '2026-12-01T00:00:00.000Z',
        photo: []
      },
      selfEmployed: true,
      individual: false,
      company: false,
      contragentId: 513535,
      phone: '+79858404937',
      email: 'ivanov@mail.ru',
      telegram: '@ivanov',
    },
    deliveryDatePlan: '2023-12-29T19:00:00.000Z',
    deliveryDateFact: null,
    departureDatePlan: '2023-12-26T10:40:00.000Z',
    departureDateFact: null,
    grossWeight: 15,
    netWeight: 11,
    truckVin: '999 999 99 99',
    geo: {
      lat: 0,
      lon: 0,
    }
  },
  {
    id: 3,
    departure: {
      name: 'склад №2',
      address: {
        name: 'склад №2',
        country: 'РФ',
        city: 'Екатеринбург',
        street: 'Ленина',
        house: '45',
        building: '10',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Василий',
          surname: 'Пупкин',
          partonymic: 'Петрович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        },
        {
          name: 'Петр',
          surname: 'Брюхин',
          partonymic: 'Васильевич',
          jobTitle: 'кладовщик',
          phone: 79091112222,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 0,
        lon: 0,
      }
    },
    destination: {
      name: 'склад№6',
      address: {
        name: 'склад№6',
        country: 'РФ',
        city: 'Тюмень',
        street: 'Мира',
        house: '33',
        building: '104a',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Иван',
          surname: 'Иванов',
          partonymic: 'Иванович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 0,
        lon: 0,
      }
    },
    nomenclature: {
      name: 'Лом 3А',
      measureName: 'кг'
    },
    status: 2,
    driver: {
      userId: 111,
      name: 'Иванов',
      surname: 'Иванов',
      patronymic: 'Иванов',
      jobPosition: 'Водитель',
      personInn: '1234567890',
      passportId: {
        series: '4444',
        number: '666666',
        authority: 'МВД РФ',
        dateOfIssue: '2026-12-01T00:00:00.000Z',
        photo: []
      },
      selfEmployed: true,
      individual: false,
      company: false,
      contragentId: 513535,
      phone: '+79858404937',
      email: 'ivanov@mail.ru',
      telegram: '@ivanov',
    },
    deliveryDatePlan: '2023-12-29T19:00:00.000Z',
    deliveryDateFact: null,
    departureDatePlan: '2023-12-26T10:40:00.000Z',
    departureDateFact: null,
    grossWeight: 22,
    netWeight: 17,
    truckVin: '999 999 99 99',
    geo: {
      lat: 0,
      lon: 0,
    }
  },
  {
    id: 4,
    departure: {
      name: 'Промозона №16',
      address: {
        name: 'Промозона №16',
        country: 'РФ',
        city: 'Москва',
        street: 'Кошкина',
        house: '62',
        building: '10',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Геннадий',
          surname: 'Иванов',
          partonymic: 'Петрович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        },
        {
          name: 'Петр',
          surname: 'Брюхин',
          partonymic: 'Васильевич',
          jobTitle: 'кладовщик',
          phone: 79091112222,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 0,
        lon: 0,
      }
    },
    destination: {
      name: 'склад№22',
      address: {
        name: 'склад№22',
        country: 'РФ',
        city: 'Казань',
        street: 'Мира',
        house: '5',
        building: '104a',
        floor: '',
        postcode: ''
      },
      contacts: [
        {
          name: 'Иван',
          surname: 'Иванов',
          partonymic: 'Иванович',
          jobTitle: 'начальник склада',
          phone: 79099999999,
          email: '',
          telegram: ''
        }
      ],
      geo: {
        lat: 0,
        lon: 0,
      }
    },
    nomenclature: {
      name: 'Лом 1А',
      measureName: 'т'
    },
    status: 1,
    driver: {
      userId: 111,
      name: 'Иванов',
      surname: 'Иванов',
      patronymic: 'Иванов',
      jobPosition: 'Водитель',
      personInn: '1234567890',
      passportId: {
        series: '4444',
        number: '666666',
        authority: 'МВД РФ',
        dateOfIssue: '2026-12-01T00:00:00.000Z',
        photo: []
      },
      selfEmployed: true,
      individual: false,
      company: false,
      contragentId: 513535,
      phone: '+79858404937',
      email: 'ivanov@mail.ru',
      telegram: '@ivanov',
    },
    deliveryDatePlan: '2023-12-29T19:00:00.000Z',
    deliveryDateFact: null,
    departureDatePlan: '2023-12-26T10:40:00.000Z',
    departureDateFact: null,
    grossWeight: 33,
    netWeight: 30,
    truckVin: '999 999 99 99',
    geo: {
      lat: 0,
      lon: 0,
    }
  }
];

export type MockOrder = typeof MOCK_ORDERS[0]