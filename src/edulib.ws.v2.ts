import Promise = require('bluebird');
import { AbstractEdulibWSOAuth, IOptions } from './abstract.edulib.ws.oauth';

class EdulibWSV2 extends AbstractEdulibWSOAuth {

  constructor(protected options: IOptions) {
    super('v2', options);
  }

  public getUser(): Promise<any> {
    return this.request({ uri: this.buildUrl('/users/me'), method: 'GET', });
  }

  public getUserLicenses(): Promise<any> {
    return this.request({ uri: this.buildUrl('/users/licenses'), method: 'GET', });
  }

  public getUserClassrooms(): Promise<any> {
    return this.request({ uri: this.buildUrl('/users/classrooms'), method: 'GET', });
  }

};

export = EdulibWSV2;