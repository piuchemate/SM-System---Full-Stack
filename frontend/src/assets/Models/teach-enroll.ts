export class TeacherDetail {
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
  joiningDate!: Date;
  joiningClass!: string;
  address!: string;
  phone!: number;
  documentsSubmitted!: string;
  passportPhoto!: string;
}
export class EmergencyDetail {
  fName!: string;
  mName!: string;
  lName!: string;
  email!: string;
  phone!: number;
}
export interface TeachEnroll {
  teacherDetails: TeacherDetail[];
    emergencyDetails: EmergencyDetail[];
  id?: number | null;
}
