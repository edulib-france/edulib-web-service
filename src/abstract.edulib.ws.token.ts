import { AbstractEdulibWS, IOptions as IWSOptions } from './abstract.edulib.ws';

export interface IOptions extends IWSOptions {
  authToken: string;
}

export abstract class AbstractEdulibWSToken extends AbstractEdulibWS {

  constructor(protected version: string, protected options: IOptions) {
    super(version, options);
  }

  protected getAuthToken(): string {
    return this.options.authToken;
  }

};