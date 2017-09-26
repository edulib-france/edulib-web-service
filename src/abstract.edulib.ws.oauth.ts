import Promise = require('bluebird');
import { AbstractEdulibWS, IOptions as IWSOptions } from './abstract.edulib.ws';

export interface IOAuthApp {
  clientId: string;
  clientSecret: string;
}

export interface IOptions extends IWSOptions {
  oAuthApp: IOAuthApp;
}

export interface IAuth {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
}

export abstract class AbstractEdulibWSOAuth extends AbstractEdulibWS {

  public auth: IAuth;

  constructor(protected version: string, protected options: IOptions) {
    super(version, options);
  }

  protected authenticate(username: string, password: string): Promise<IAuth> {
    return this.request({
      uri: `${this.host}/oauth/token`,
      method: 'POST',
      form: {
        username,
        password,
        grant_type: 'password',
        client_id: this.options.oAuthApp.clientId,
        client_secret: this.options.oAuthApp.clientSecret
      }
    }).then(auth => this.auth = auth);
  }

  protected refresh(): Promise<IAuth> {
    return this.request({
      uri: `${this.host}/oauth/token`,
      method: 'POST',
      form: {
        grant_type: 'refresh_token',
        client_id: this.options.oAuthApp.clientId,
        client_secret: this.options.oAuthApp.clientSecret,
        refresh_token: this.getAuthToken()
      }
    }).then(auth => this.auth = auth);
  }

  protected getAuthToken(): string {
    return this.auth ? this.auth.access_token : '';
  }

};