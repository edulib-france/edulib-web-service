const merge = require('merge');
import Promise = require('bluebird');
import request = require('request');
import { Options, RequestResponse } from 'request';

export interface IEnvironment {
  [key: string]: string;
}

export interface ILogger {
  debug: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
}

export interface IOptions {
  env: string;
  logger?: ILogger;
}

export abstract class AbstractEdulibWS {

  static Environment: IEnvironment = {
    staging: 'https://staging-edulib.xair.cloud',
    production: 'https://www.edulib.fr'
  }

  protected host: string;
  protected logger: ILogger = {
    debug: console.log,
    error: console.error
  };

  constructor(protected version: string, protected options: IOptions) {
    this.host = AbstractEdulibWS.Environment[options.env];
    if (options.logger) { this.logger = options.logger; }
  }

  protected abstract getAuthToken(): string;

  protected request(options: Options): Promise<any> {
    const deferred = Promise.defer();
    this.updateOptions(options);
    this.logger.debug('EdulibWS::request', 'options:', options);
    request(options, (err, res, body) => {
      this.processResponse(err, res, body).then((data) => deferred.resolve(data), (err) => deferred.reject(err));
    });
    return deferred.promise;
  }

  protected updateOptions(options: Options) {
    const authToken = this.getAuthToken();
    if (authToken) {
      options.headers = merge({
        Authorization: `Bearer ${authToken}`
      },
        options.headers || {});
    }
  }

  protected processResponse(err: any, res: RequestResponse, body: any): Promise<any> {
    if (err) { return Promise.reject(err); }
    if (res.statusCode === 200 || res.statusCode === 201) {
      try {
        return Promise.resolve(JSON.parse(body));
      } catch (err) {
        Promise.reject(err);
      }
    }
    return Promise.reject({ statusCode: res.statusCode, message: body });
  }

  protected buildUrl(path: string) {
    return `${this.host}/api/${this.version}${path}`;
  }

};