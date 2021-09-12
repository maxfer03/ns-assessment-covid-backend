import { IDBcountryInfo } from "./interfaces";

export const compareContinent = ( a: IDBcountryInfo, b: IDBcountryInfo ): number => {
    if ( a.continent < b.continent ){
      return -1;
    }
    if ( a.continent > b.continent ){
      return 1;
    }
    return 0;
  }