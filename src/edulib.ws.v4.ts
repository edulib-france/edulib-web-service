import Promise = require('bluebird');
const _ = require('underscore');
import { AbstractEdulibWSOAuth, IOptions } from './abstract.edulib.ws.oauth';

declare namespace EdulibWSV4 {

  export interface IClassroom {
    establishment_account_id: string;
    school_level_id: string;
    grade_id: string;
    degree_id: string;
    name: string;
    code: string;
  }

  export interface IStudent {
    establishment_account_id: string;
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    classroom_id: string;
    school_level_id?: string;
    grade_id?: string;
    degree_id?: string;
  }

  export interface ITeacher {
    establishment_account_id: string;
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    classroom_ids: string[];
    subject_ids: string[];
  }

}

class EdulibWSV4 extends AbstractEdulibWSOAuth {

  constructor(protected options: IOptions) {
    super('v4', options);
  }

  public getGrades(): Promise<any> {
    return this.request({ uri: this.buildUrl('/grades'), method: 'GET', });
  }

  public getGrade(id: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/grades/${id}`), method: 'GET', });
  }

  public getDegrees(): Promise<any> {
    return this.request({ uri: this.buildUrl('/degrees'), method: 'GET', });
  }

  public getDegree(id: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/degrees/${id}`), method: 'GET', });
  }

  public getSchoolLevels(): Promise<any> {
    return this.request({ uri: this.buildUrl('/school_levels'), method: 'GET', });
  }

  public getSchoolLevel(id: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/school_levels/${id}`), method: 'GET', });
  }

  public getSubjects(): Promise<any> {
    return this.request({ uri: this.buildUrl('/subjects'), method: 'GET', });
  }

  public getSubject(id: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/subjects/${id}`), method: 'GET', });
  }

  public getEstablishmentAccounts(): Promise<any> {
    return this.request({ uri: this.buildUrl('/establishment_accounts'), method: 'GET', });
  }

  public getEstablishmentClassrooms(uai: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/classrooms/establishment/${uai}`), method: 'GET', });
  }

  public getEstablishmentClassroom(uai: string, code: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/classrooms/establishment/${uai}/classroom/${code}`), method: 'GET', });
  }

  public createClassroom(data: EdulibWSV4.IClassroom): Promise<any> {
    const form = { classroom: data };
    return this.request({ uri: this.buildUrl('/classrooms'), method: 'POST', form });
  }

  public updateClassroom(id: string, data: any): Promise<any> {
    const form = { data };
    return this.request({ uri: this.buildUrl(`/classrooms/${id}`), method: 'POST', form });
  }

  public createStudent(data: EdulibWSV4.IStudent): Promise<any> {
    const form = { student: data };
    return this.request({ uri: this.buildUrl('/students'), method: 'POST', form });
  }

  public updateStudent(id: string, data: any): Promise<any> {
    const form = { student: data };
    return this.request({ uri: this.buildUrl(`/students/${id}`), method: 'POST', form });
  }

  public assignStudentLicense(id: string, licenseId: string): Promise<any> {
    const form = { license_id: licenseId };
    return this.request({ uri: this.buildUrl(`/students/${id}/assign`), method: 'POST', form });
  }

  public unassignStudentLicense(id: string, licenseId: string): Promise<any> {
    const form = { license_id: licenseId };
    return this.request({ uri: this.buildUrl(`/students/${id}/unassign`), method: 'POST', form });
  }

  public createTeacher(data: EdulibWSV4.ITeacher): Promise<any> {
    const formData = this.flattenJSON({ teacher: data });
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.request({ uri: this.buildUrl('/teachers'), method: 'POST', headers, formData });
  }

  public updateTeacher(id: string, data: any): Promise<any> {
    const form = { teacher: data };
    return this.request({ uri: this.buildUrl(`/teachers/${id}`), method: 'POST', form });
  }

  public assignTeacherLicense(id: string, licenseId: string): Promise<any> {
    const form = { license_id: licenseId };
    return this.request({ uri: this.buildUrl(`/teachers/${id}/assign`), method: 'POST', form });
  }

  public unassignTeacherLicense(id: string, licenseId: string): Promise<any> {
    const form = { license_id: licenseId };
    return this.request({ uri: this.buildUrl(`/teachers/${id}/unassign`), method: 'POST', form });
  }

  protected flattenJSON(obj: any, lvl = 0): any {
    var nobj: { [key: string]: string } = {};
    _.each(obj, (val: any, key: string) => {
      if (_.isArray(val) && !_.isEmpty(val)) {
        _.each(val, (v: any) => {
          if (lvl === 0) {
            nobj[`${key}[]`] = v
          } else {
            nobj[`[${key}][]`] = v
          }
          if (_.isObject(v)) {
            nobj = this.flattenJSON(nobj, lvl + 1)
          };
        })
      } else if (_.isObject(val) && !_.isEmpty(val)) {
        var strip = this.flattenJSON(val, lvl + 1)
        _.each(strip, function (v: any, k: string) {
          if (lvl === 0) {
            nobj[`${key}${k}`] = v
          } else {
            nobj[`[${key}]${k}`] = v
          }
        })
      } else {
        if (lvl === 0) {
          nobj[key] = val
        } else {
          nobj[`[${key}]`] = val
        }
      }
    });
    return nobj;
  }

};

export = EdulibWSV4;