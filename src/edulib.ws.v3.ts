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
  },
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
    }
  },
  license_offer: {
    reference: string;
    license_length: number;
    unit_price: number;
  },
  created_at: string;
}

export class EdulibWSV3 extends AbstractEdulibWSToken {

  constructor(protected options: IOptions) {
    super('v3', options);
  }

  public getUserBySsoId(uai: string, ssoId: string): Promise<IUser> {
    const qs = { uai, sso_id: ssoId };
    return this.request({ uri: this.buildUrl('/users/identify-by-sso'), method: 'GET', qs });
  }

  public getUserByCredential(username: string, password: string): Promise<IUser> {
    const qs = { username, password };
    return this.request({ uri: this.buildUrl('/users/identify-by-credentials'), method: 'GET', qs });
  }

  public setUserSsoId(userId: string, ssoId: string): Promise<any> {
    const form = { user_id: userId, sso_id: ssoId };
    return this.request({ uri: this.buildUrl('/users/set-sso-id'), method: 'PATCH', form });
  }

  public getEtablishmentCatalog(uai: string): Promise<any> {
    const qs = { uai };
    return this.request({ uri: this.buildUrl('/establishment_accounts/catalog'), method: 'GET', qs });
  }

  public createLicense(uai: string, productEan: string, articleEan: string, offerRef: string, quantity: number): Promise<any> {
    const form = {
      offer_reference: offerRef,
      article_isbn: articleEan, product_isbn: productEan,
      establishment_account_uai: uai, license_count: quantity
    };
    return this.request({ uri: this.buildUrl('/licenses'), method: 'POST', form });
  }

};