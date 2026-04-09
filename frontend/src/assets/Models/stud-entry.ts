export class Students {
  id!: string;
  firstName!: string;
  dob!: number;
  class!: string;

  constructor(s: any) {
    this.id = s.id;
    this.firstName = s.firstName;
    this.dob = s.dob;
    this.class = s.class;
  }
}

export interface StudEntry {
  students: Students[];
}
