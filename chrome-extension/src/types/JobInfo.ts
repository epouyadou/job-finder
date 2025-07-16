export interface JobInfo {
  url: string;
  domain: string;
  company: string;
  title: string;
  description?: string;
  salary?: string;
  type?: string;
  location?: string;
  contacts?: string[];
  postedDate?: Date;
}