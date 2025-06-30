export interface JobInfo {
  id: string;
  domain: string;
  company: string;
  title: string;
  description?: string;
  salary?: string;
  type?: string;
  location?: string;
  contacts?: string[];
}