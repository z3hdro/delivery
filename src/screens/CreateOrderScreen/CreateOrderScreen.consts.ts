export const EMPTY_CARGO_DATA = {
  id: 0,
  name: null,
  netWeight: '',
};

export const INITIAL_CARGO_DATA = [
  { ...EMPTY_CARGO_DATA }
];

export const INITIAL_ERROR_MAP = {
  departure: false,
  destination: false,
  price: false,
};

export const INITIAL_CARGO_ERROR = {
  cargoName: false,
  cargoNetWeight: false
};

export const INITIAL_CARGO_ERROR_MAP = [{ ...INITIAL_CARGO_ERROR }];


