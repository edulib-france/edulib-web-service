import Promise = require('bluebird');
import { AbstractEdulibWSOAuth, IOptions } from './abstract.edulib.ws.oauth';
import request = require('request');

export interface IClassroom {
  establishment_account_id: string;
  school_level_id: string;
  grade_id: string;
  degree_id: string;
  name: string;
  code: string;
  id?: string;
}

export interface IEtablishmentUser {
  establishment_account_id: string;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
}

export interface IStudent extends IEtablishmentUser {
  classroom_id: string;
  school_level_id?: string;
  grade_id?: string;
  degree_id?: string;
}

export interface ITeacher extends IEtablishmentUser {
  classroom_ids: string[];
  subject_ids: string[];
}

export interface IGrade {
  id: string;
  name: string;
  slug: string;
  order: number;
  school_level_id: string;
}

export interface ISchoolLevel {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface ISubject {
  id: string;
  name: string;
  slug: string;
  school_level_ids: string[];
}

export interface IEtablishmentLicense {
  id: string;
  key: string;
  start_validity_date: string;
  end_validity_date: string;
  license_article: {
    isbn: string;
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
  student_id: string;
  teacher_id: string;
  is_affected: true;
}

export class EdulibWSV4 extends AbstractEdulibWSOAuth {

  constructor(protected options: IOptions) {
    super('v4', options);
  }

  public getGrades(): Promise<IGrade[]> {
    return this.request({ uri: this.buildUrl('/grades'), method: 'GET', });
  }

  public getGrade(id: string): Promise<IGrade> {
    return this.request({ uri: this.buildUrl(`/grades/${id}`), method: 'GET', });
  }

  public getDegrees(): Promise<any> {
    return this.request({ uri: this.buildUrl('/degrees'), method: 'GET', });
  }

  public getDegree(id: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/degrees/${id}`), method: 'GET', });
  }

  public getSchoolLevels(): Promise<ISchoolLevel[]> {
    return this.request({ uri: this.buildUrl('/school_levels'), method: 'GET', });
  }

  public getSchoolLevel(id: string): Promise<ISchoolLevel> {
    return this.request({ uri: this.buildUrl(`/school_levels/${id}`), method: 'GET', });
  }

  public getSubjects(): Promise<ISubject[]> {
    return this.request({ uri: this.buildUrl('/subjects'), method: 'GET', });
  }

  public getSubject(id: string): Promise<ISubject> {
    return this.request({ uri: this.buildUrl(`/subjects/${id}`), method: 'GET', });
  }

  public getEstablishmentAccounts(): Promise<any> {
    return this.request({ uri: this.buildUrl('/establishment_accounts'), method: 'GET', });
  }

  public getEstablishmentByUAI(uai: string): Promise<any> {
    return this.request({ uri: this.buildUrl(`/establishment_accounts/by-uai/${uai}`), method: 'GET', })
  }

  public getEstablishmentLicenses(id: string, articleId?: string): Promise<IEtablishmentLicense[]> {
    const qs: any = {};
    if (articleId) { qs.article_id = articleId; }
    return this.request({ uri: this.buildUrl(`/establishment_accounts/${id}/licenses`), method: 'GET', qs })
  }

  public getEstablishmentCatalog(id: string): Promise<IEtablishmentLicense[]> {
    return this.request({ uri: this.buildUrl(`/establishment_accounts/${id}/catalog`), method: 'GET' })
  }

  public getEstablishmentClassrooms(uai: string): Promise<IClassroom[]> {
    return this.request({ uri: this.buildUrl(`/classrooms/establishment/${uai}`), method: 'GET', });
  }

  public getEstablishmentClassroom(uai: string, code: string): Promise<IClassroom> {
    return this.request({ uri: this.buildUrl(`/classrooms/establishment/${uai}/classroom/${code}`), method: 'GET', });
  }

  public createClassroom(data: IClassroom): Promise<any> {
    const form = { classroom: data };
    return this.request({ uri: this.buildUrl('/classrooms'), method: 'POST', form });
  }

  public updateClassroom(id: string, data: any): Promise<any> {
    const form = { data };
    return this.request({ uri: this.buildUrl(`/classrooms/${id}`), method: 'POST', form });
  }

  public createStudent(data: IStudent): Promise<any> {
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

  public createTeacher(data: ITeacher): Promise<any> {
    const deferred = Promise.defer();
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const options = { uri: this.buildUrl('/teachers'), method: 'POST', headers }
    this.updateOptions(options);
    const req = request(options, (err, res, body) => {
      this.processResponse(err, res, body).then((data) => deferred.resolve(data), (err) => deferred.reject(err));
    });
    const formData = req.form();
    formData.append('teacher[establishment_account_id]', data.establishment_account_id);
    formData.append('teacher[last_name]', data.last_name);
    formData.append('teacher[first_name]', data.first_name);
    formData.append('teacher[email]', data.email);
    formData.append('teacher[password]', data.password);
    (data.classroom_ids || []).forEach(d => formData.append('teacher[classroom_ids][]', d));
    (data.subject_ids || []).forEach(d => formData.append('teacher[subject_ids][]', d));
    return deferred.promise;
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

};