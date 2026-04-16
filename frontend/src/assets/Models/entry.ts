export class Entries {
  id!: string;
  name!: string;
  dob!: number;
  class!: string;
  division!: string;


  constructor(s: any) {
    this.id = s.id;
    this.name = s.name;
    this.dob = s.dob;
    this.class = s.class;
    this.division = s.division;
  }
}

export interface Entry {
  entries: Entries[];
}
