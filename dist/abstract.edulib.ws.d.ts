import Promise = require('bluebird');
import { Options } from 'request';
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
export declare abstract class AbstractEdulibWS {
    protected version: string;
    protected options: IOptions;
    static Environment: IEnvironment;
    protected host: string;
    protected logger: ILogger;
    constructor(version: string, options: IOptions);
    protected abstract getAuthToken(): string;
    protected request(options: Options): Promise<any>;
    protected buildUrl(path: string): string;
}
