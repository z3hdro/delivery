export const MOCK_NOMENCLATURE = [
  {
    id: 1,
    name: 'A',
    measure: {
      id: 1,
      name: 'т'
    }
  },
  {
    id: 2,
    name: 'Г',
    measure: {
      id: 2,
      name: 'кг'
    }
  },
  {
    id: 3,
    name: 'В',
    measure: {
      id: 3,
      name: 'ц'
    }
  },
];

export type MockNomenclature = typeof MOCK_NOMENCLATURE[0]