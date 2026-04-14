export interface Religion {
  value: string;
  label: string;
  castes: string[];
}

export interface FormData {
  religions: Religion[];
  languages: string[];
  classes: string[];
  documents: string[];
}
export interface StaffFormData {
  departments: {
    value: string;
    label: string;
    positions: string[];
  }[];
}

export interface FormsData {
  formData: FormData;
  staffFormData: StaffFormData;
}