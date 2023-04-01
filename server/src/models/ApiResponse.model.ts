export class ApiResponse<T> {
  status: number;
  message: string;
  data: T | undefined;

  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
