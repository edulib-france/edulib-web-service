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
export declare abstract class AbstractEdulibWSOAuth extends AbstractEdulibWS {
    protected version: string;
    protected options: IOptions;
    auth: IAuth;
    constructor(version: string, options: IOptions);
    protected authenticate(username: string, password: string): Promise<IAuth>;
    protected getAuthToken(): string;
}
