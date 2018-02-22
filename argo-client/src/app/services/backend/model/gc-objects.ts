import { IGcObject } from "./gc-object";

/**
 * Represents response received of https://cloud.google.com/storage/docs/json_api/v1/objects/list
 * Google Cloud Storage Object
 */
export interface IGcObjects {
  items: IGcObject[];
}