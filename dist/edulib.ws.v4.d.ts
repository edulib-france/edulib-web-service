import Promise = require('bluebird');
import { AbstractEdulibWSOAuth, IOptions } from './abstract.edulib.ws.oauth';
declare namespace EdulibWSV4 {
    interface IClassroom {
        establishment_account_id: string;
        school_level_id: string;
        grade_id: string;
        degree_id: string;
        name: string;
        code: string;
    }
    interface IStudent {
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
    interface ITeacher {
        establishment_account_id: string;
        last_name: string;
        first_name: string;
        email: string;
        password: string;
        classroom_ids: string[];
        subject_ids: string[];
    }
}
declare class EdulibWSV4 extends AbstractEdulibWSOAuth {
    protected options: IOptions;
    constructor(options: IOptions);
    getGrades(): Promise<any>;
    getGrade(id: string): Promise<any>;
    getDegrees(): Promise<any>;
    getDegree(id: string): Promise<any>;
    getSchoolLevels(): Promise<any>;
    getSchoolLevel(id: string): Promise<any>;
    getSubjects(): Promise<any>;
    getSubject(id: string): Promise<any>;
    getEstablishmentAccounts(): Promise<any>;
    getEstablishmentClassrooms(uai: string): Promise<any>;
    getEstablishmentClassroom(uai: string, code: string): Promise<any>;
    createClassroom(data: EdulibWSV4.IClassroom): Promise<any>;
    updateClassroom(id: string, data: any): Promise<any>;
    createStudent(data: EdulibWSV4.IStudent): Promise<any>;
    updateStudent(id: string, data: any): Promise<any>;
    assignStudentLicense(id: string, licenseId: string): Promise<any>;
    unassignStudentLicense(id: string, licenseId: string): Promise<any>;
    createTeacher(data: EdulibWSV4.ITeacher): Promise<any>;
    updateTeacher(id: string, data: any): Promise<any>;
    assignTeacherLicense(id: string, licenseId: string): Promise<any>;
    unassignTeacherLicense(id: string, licenseId: string): Promise<any>;
    protected flattenJSON(obj: any, lvl?: number): any;
}
export = EdulibWSV4;
