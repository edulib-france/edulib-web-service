import Promise = require('bluebird');
import { AbstractEdulibWSOAuth, IOptions } from './abstract.edulib.ws.oauth';
export declare class EdulibWSV2 extends AbstractEdulibWSOAuth {
    protected options: IOptions;
    constructor(options: IOptions);
    getUser(): Promise<any>;
    getUserLicenses(): Promise<any>;
    getUserClassrooms(): Promise<any>;
}
