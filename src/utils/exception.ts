export class Exception{
  public status: number;
  public message: string;

  constructor(exceptionOptions: IExceptionOptions){
    this.status = exceptionOptions.status,
    this.message = exceptionOptions.message
  }
}

interface IExceptionOptions {
  status: number,
  message: string,
}
