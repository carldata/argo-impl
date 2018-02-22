import { ICsvDataSource } from "./csv-data-source";

export interface IProject {
  id: string;
  name: string;
  url: string;
  startDate: Date;
  endDate: Date;
  splitDate: Date;
  csvDataSources: ICsvDataSource[];
}