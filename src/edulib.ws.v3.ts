import Promise = require('bluebird');
import { AbstractEdulibWSToken, IOptions } from './abstract.edulib.ws.token';

export class EdulibWSV3 extends AbstractEdulibWSToken {

  constructor(protected options: IOptions, protected authToken: string) {
    super('v3', options);
  }

  public getUserBySsoId(uai: string, ssoId: string): Promise<any> {
    var qs = { uai, sso_id: ssoId };
    return this.request({ uri: this.buildUrl('/users/identify-by-sso'), method: 'GET', qs });
  }

  public getUserByCredential(username: string, password: string): Promise<any> {
    var qs = { username, password };
    return this.request({ uri: this.buildUrl('/users/identify-by-credentials'), method: 'GET', qs });
  }

  public setUserSsoId(userId: string, ssoId: string) {
    var form = { user_id: userId, sso_id: ssoId };
    return this.request({ uri: this.buildUrl('/users/set-sso-id'), method: 'PATCH', form });
  }

  public getEtablishmentCatalog(uai: string) {
    var qs = { uai };
    return this.request({ uri: this.buildUrl('/establishment_accounts/catalog'), method: 'GET', qs });
  }

};