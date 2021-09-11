export interface IcovidStats {
  get:          string;
  parameters?:  any;
  errors?:      any;
  results:      number;
  response:     IcountryInfo;
}

export interface IcountryInfo {
  continent:    string;
  country:      string;
  population:   number;
  cases:        Icases;
  deaths:       Ideaths;
  tests:        Itests;
  day:          Date | string;
  time:         TimeRanges | string;
}

export interface Icases {
  new:          string;
  active:       number;
  critical:     number;
  recovered:    number;
  "1M_pop":     string;
  total:        number;
}
export interface Ideaths {
  new:          string;
  "1M_pop":     string;
  total:        number;
}
export interface Itests {
  "1M_pop":     string;
  total:        number;
}

/////////////////////////
export interface Iuser {
  username:     string;
  password:     string;
}
