export interface Religion {
  value: string;
  label: string;
  castes: string[];
}

export interface StudentFormData {
  religions: Religion[];
  languages: string[];
  classes : string[];
  documents: string[];
}

export interface StudFormData {
  studFormData: StudentFormData;
}