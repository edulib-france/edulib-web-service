import Promise = require('bluebird');
import { AbstractEdulibWSToken, IOptions } from './abstract.edulib.ws.token';
export declare class EdulibWSV3 extends AbstractEdulibWSToken {
    protected options: IOptions;
    protected authToken: string;
    constructor(options: IOptions, authToken: string);
    getUserBySsoId(uai: string, ssoId: string): Promise<any>;
    getUserByCredential(username: string, password: string): Promise<any>;
    setUserSsoId(userId: string, ssoId: string): Promise<any>;
    getEtablishmentCatalog(uai: string): Promise<any>;
}
