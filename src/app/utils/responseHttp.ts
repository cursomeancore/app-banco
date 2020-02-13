export interface ResponseHttp<T> {
  ok: boolean;
  msg: string;
  data: T;
}
