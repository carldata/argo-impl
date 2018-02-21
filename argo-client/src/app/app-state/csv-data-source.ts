export enum EnumCsvDataSourceType {
  NotClassified,
  Flow,
  Rainfall
} 

export interface ICsvDataSource {
  name: string;
  url: string;
  type: EnumCsvDataSourceType;
}