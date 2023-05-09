export class CustomResponse {
  private message: string;
  private result: any;

  constructor(message: string, result?: any) {
    this.message = message;
    this.result = result;
  }
}
