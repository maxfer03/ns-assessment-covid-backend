import { ObjectId } from "bson";

export interface IcovidStats {
  get: string;
  parameters?: any;
  errors?: any;
  results: number;
  response: IcountryInfo;
}

export interface IcountryInfo {
  continent: string;
  country: string;
  population: number;
  cases: Icases;
  deaths: Ideaths;
  tests: Itests;
  day: Date | string;
  time: TimeRanges | string;
}

export interface Icases {
  new: string;
  active: number;
  critical: number;
  recovered: number;
  "1M_pop": string;
  total: number;
}
export interface Ideaths {
  new: string;
  "1M_pop": string;
  total: number;
}
export interface Itests {
  "1M_pop": string;
  total: number;
}

export interface IuserCountryInfo {
  cases: Icases;
  deaths: Ideaths;
  tests: Itests;
}

/////////////////////////
export interface Iuser {
  username: string;
  password: string;
}

export interface Isession {
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}

export type PartialSession = Omit<Isession, "issued" | "expires">;

export interface EncodeResult {
  token: string;
  expires: number;
  issued: number;
}

export type DecodeResult =
  | {
      type: "valid";
      session: Isession;
    }
  | {
      type: "integrity-error";
    }
  | {
      type: "invalid-token";
    };

export type ExpirationStatus = "expired" | "active" | "grace";
