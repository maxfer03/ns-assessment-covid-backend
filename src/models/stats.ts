import { ObjectId } from "mongodb";

export default class Stat {
  constructor(
    public name: string,
    public id?: ObjectId
  ) {}
}
