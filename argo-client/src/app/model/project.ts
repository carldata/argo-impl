import { ICsvDataSource } from "./csv-data-source";

export interface IProject {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  splitDate: Date;
  flows: ICsvDataSource[];
  rainfalls: ICsvDataSource[];
}