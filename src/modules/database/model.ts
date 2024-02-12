import { Model as ObjectionModel } from 'objection';

type DateString = string; //TODO: to type

export class Model extends ObjectionModel {
  updatedAtString!: DateString;
  createdAtString!: DateString;

  get updatedAt(): Date {
    return new Date(this.createdAtString);
  }

  set updatedAt(value: Date) {
    this.updatedAtString = value.toISOString();
  }

  get createdAt(): Date {
    return new Date(this.createdAtString);
  }

  set createdAt(value: Date) {
    this.updatedAtString = value.toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  $beforeInsert() {
    this.createdAt = new Date();
  }
}
