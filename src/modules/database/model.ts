import { Model as ObjectionModel } from 'objection';

export class Model extends ObjectionModel {
  // updatedAtString!: DateString;
  // createdAtString!: DateString;
  // get updatedAt(): Date {
  //   return new Date(this.createdAtString);
  // }
  // set updatedAt(value: Date) {
  //   this.updatedAtString = value.toISOString();
  // }
  // get createdAt(): Date {
  //   return new Date(this.createdAtString);
  // }
  // set createdAt(value: Date) {
  //   this.updatedAtString = value.toISOString();
  // }
  // $beforeUpdate() {
  //   this.updatedAt = new Date();
  // }
  // $beforeInsert() {
  //   this.updatedAt = new Date();
  //   // this.createdAt = new Date();
  // }
}
