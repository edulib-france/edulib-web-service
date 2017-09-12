import { AbstractEdulibWS, IOptions as IWSOptions } from './abstract.edulib.ws';
export interface IOptions extends IWSOptions {
    authToken: string;
}
export declare abstract class AbstractEdulibWSToken extends AbstractEdulibWS {
    protected version: string;
    protected options: IOptions;
    constructor(version: string, options: IOptions);
    protected getAuthToken(): string;
}
