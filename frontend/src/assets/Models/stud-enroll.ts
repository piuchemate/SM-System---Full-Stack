export class StudentDetail {
  fName!: string;
  mName!: string;
  lName!: string;
  gender!: string;
  email!: string;
  dob!: Date;
  birthPlace!: string;
  religion!: string;
  category!: string;
  caste!: string;
  motherTongue!: string;
  disability!: boolean;
  disabilityDetails!: string;
  lastSchool!: string;
  admissionDate!: Date;
  admissionClass!: string;
  address!: string;
  phone!: number;
  documentsSubmitted!: string;
  passportPhoto!: string;
  division!: string;
}
export class FatherDetail {
  fName!: string;
  mName!: string;
  lName!: string;
  email!: string;
  phone!: number;
}
export class MotherDetail {
  fName!: string;
  mName!: string;
  lName!: string;
  email!: string;
  phone!: number;
}
export interface StudEnroll {
  studentDetails: StudentDetail[];
  fatherDetails: FatherDetail[];
  motherDetails: MotherDetail[];
  id?: number | null;
}
