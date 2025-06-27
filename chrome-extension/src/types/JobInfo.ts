export interface JobInfo {
  id: string;
  domain: string;
  company: string;
  title: string;
  description?: string;
  salary?: string;
  location?: string;
  skills?: string[];
  contact?: string[];
}