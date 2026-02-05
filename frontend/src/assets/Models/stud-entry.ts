export class Students {
  id!: string;
  firstName!: string;
  age!: number;
  class!: string;

  constructor(s: any) {
    this.id = s.id;
    this.firstName = s.firstName;
    this.age = s.age;
    this.class = s.class;
  }
}

export interface StudEntry {
  students: Students[];
}
