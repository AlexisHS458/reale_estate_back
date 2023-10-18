export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
}

export function getHttpStatusName(status: HttpStatus): string {
  const key = Object.keys(HttpStatus).find((key) => HttpStatus[key] === status);

  return key || "INTERNAL_SERVER_ERROR";
}
