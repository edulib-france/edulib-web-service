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
export interface ILicense {
    id: string;
    key: string;
    slug: string;
    start_validity_date: string;
    end_validity_date: string;
    license_article: {
        isbn: number;
        title: string;
        availability_date_theoretical: string;
        is_available_via_ent: boolean;
    };
    license_product: {
        isbn: string;
        title: string;
        editor: string;
        resource_type: string;
        levels: string;
        degrees: string;
        subjects: string;
        images: {
            thumb: string;
            small: string;
            medium: string;
            large: string;
        };
    };
    license_offer: {
        reference: string;
        license_length: number;
        unit_price: number;
    };
    created_at: string;
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
