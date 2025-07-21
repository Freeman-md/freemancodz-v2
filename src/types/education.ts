export type CertificationType = "Degree" | "Diploma" | "Certification" | "Course"

export type Certification = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate?: string;
  description?: string;
  tools?: string[];
  modules?: string[];
  grade?: string;
  certificateUrl?: string;
  type?: CertificationType;
};
