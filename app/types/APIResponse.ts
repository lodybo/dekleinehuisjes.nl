interface BaseAPIResponse {
  ok: boolean;
}

interface SuccessResponse extends BaseAPIResponse {
  ok: true;
}

interface ErrorResponse extends BaseAPIResponse {
  ok: false;
  message: string;
}

export type APIResponse = SuccessResponse | ErrorResponse;
