interface ErrorConstructor<T extends string> {
  name: T;
  message: string;
  cause?: Error;
  [key: string]: undefined | string | Error;
}

export class ServiceError<T extends string> extends Error {
  name: T;
  message: string;
  cause: Error | undefined;

  constructor({name, message, cause}: ErrorConstructor<T>) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}