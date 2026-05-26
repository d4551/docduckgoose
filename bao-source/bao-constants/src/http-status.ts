/**
 * HTTP status code constants.
 *
 * Centralizes numeric HTTP status codes to avoid magic numbers
 * across client and server modules.
 *
 */

/**
 * Common HTTP status code constants.
 */
export const HTTP_STATUS: {
  readonly ok: 200;
  readonly created: 201;
  readonly accepted: 202;
  readonly noContent: 204;
  readonly multiStatus: 207;
  readonly multipleChoices: 300;
  readonly movedPermanently: 301;
  readonly found: 302;
  readonly seeOther: 303;
  readonly badRequest: 400;
  readonly unauthorized: 401;
  readonly forbidden: 403;
  readonly notFound: 404;
  readonly methodNotAllowed: 405;
  readonly notAcceptable: 406;
  readonly requestTimeout: 408;
  readonly conflict: 409;
  readonly payloadTooLarge: 413;
  readonly unsupportedMediaType: 415;
  readonly unprocessableEntity: 422;
  readonly tooEarly: 425;
  readonly tooManyRequests: 429;
  readonly internalServerError: 500;
  readonly notImplemented: 501;
  readonly badGateway: 502;
  readonly serviceUnavailable: 503;
  readonly gatewayTimeout: 504;
} = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  multiStatus: 207,
  multipleChoices: 300,
  movedPermanently: 301,
  found: 302,
  seeOther: 303,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  requestTimeout: 408,
  conflict: 409,
  payloadTooLarge: 413,
  unsupportedMediaType: 415,
  unprocessableEntity: 422,
  tooEarly: 425,
  tooManyRequests: 429,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
} as const;

/**
 * Union of HTTP status code numeric values.
 */
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
