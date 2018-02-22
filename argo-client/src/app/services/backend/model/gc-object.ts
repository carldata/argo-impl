
/**
 * Represents a fragment of Google Cloud Storage Object
 * https://cloud.google.com/storage/docs/json_api/v1/objects#resource
 */
export interface IGcObject {
  name: string;
  mediaLink: string;
  contentType: string;
}