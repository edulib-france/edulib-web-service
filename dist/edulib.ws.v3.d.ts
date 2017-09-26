import * as Promise from 'bluebird';
import { AbstractEdulibWSToken, IOptions } from './abstract.edulib.ws.token';
export interface IUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    type: string;
    edulib_password: string;
    establishment_uai: string;
    cas__sso_id: string;
}
export declare class EdulibWSV3 extends AbstractEdulibWSToken {
    protected options: IOptions;
    constructor(options: IOptions);
    getUserBySsoId(uai: string, ssoId: string): Promise<IUser>;
    getUserByCredential(username: string, password: string): Promise<IUser>;
    setUserSsoId(userId: string, ssoId: string): Promise<any>;
    getEtablishmentCatalog(uai: string): Promise<any>;
    createLicense(uai: string, productEan: string, articleEan: string, offerRef: string, quantity: number): Promise<any>;
}
