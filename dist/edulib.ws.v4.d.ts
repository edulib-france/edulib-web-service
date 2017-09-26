import Promise = require('bluebird');
import { AbstractEdulibWSOAuth, IOptions } from './abstract.edulib.ws.oauth';
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
    student_id: string;
    teacher_id: string;
    is_affected: true;
}
export declare class EdulibWSV4 extends AbstractEdulibWSOAuth {
    protected options: IOptions;
    constructor(options: IOptions);
    getGrades(): Promise<IGrade[]>;
    getGrade(id: string): Promise<IGrade>;
    getDegrees(): Promise<any>;
    getDegree(id: string): Promise<any>;
    getSchoolLevels(): Promise<ISchoolLevel[]>;
    getSchoolLevel(id: string): Promise<ISchoolLevel>;
    getSubjects(): Promise<ISubject[]>;
    getSubject(id: string): Promise<ISubject>;
    getEstablishmentAccounts(): Promise<any>;
    getEstablishmentByUAI(uai: string): Promise<any>;
    getEstablishmentLicenses(id: string, articleId?: string): Promise<IEtablishmentLicense[]>;
    getEstablishmentClassrooms(uai: string): Promise<IClassroom[]>;
    getEstablishmentClassroom(uai: string, code: string): Promise<IClassroom>;
    createClassroom(data: IClassroom): Promise<any>;
    updateClassroom(id: string, data: any): Promise<any>;
    createStudent(data: IStudent): Promise<any>;
    updateStudent(id: string, data: any): Promise<any>;
    assignStudentLicense(id: string, licenseId: string): Promise<any>;
    unassignStudentLicense(id: string, licenseId: string): Promise<any>;
    createTeacher(data: ITeacher): Promise<any>;
    updateTeacher(id: string, data: any): Promise<any>;
    assignTeacherLicense(id: string, licenseId: string): Promise<any>;
    unassignTeacherLicense(id: string, licenseId: string): Promise<any>;
    protected flattenJSON(obj: any, lvl?: number): any;
}
