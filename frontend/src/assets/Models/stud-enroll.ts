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

export class FatherDetail {
  firstName!: string;
  age!: number;
  class!: string;
  constructor(s: any) {
    this.firstName = s.firstName;
    this.age = s.age;
    this.class = s.class;
  }
}

export interface StudEnroll {
  students: Students[];
  fatherDetails: FatherDetail[];
}
