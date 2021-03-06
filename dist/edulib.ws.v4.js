"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var abstract_edulib_ws_oauth_1 = require("./abstract.edulib.ws.oauth");
var request = require("request");
var EdulibWSV4 = (function (_super) {
    __extends(EdulibWSV4, _super);
    function EdulibWSV4(options) {
        var _this = _super.call(this, 'v4', options) || this;
        _this.options = options;
        return _this;
    }
    EdulibWSV4.prototype.getGrades = function () {
        return this.request({ uri: this.buildUrl('/grades'), method: 'GET', });
    };
    EdulibWSV4.prototype.getGrade = function (id) {
        return this.request({ uri: this.buildUrl("/grades/" + id), method: 'GET', });
    };
    EdulibWSV4.prototype.getDegrees = function () {
        return this.request({ uri: this.buildUrl('/degrees'), method: 'GET', });
    };
    EdulibWSV4.prototype.getDegree = function (id) {
        return this.request({ uri: this.buildUrl("/degrees/" + id), method: 'GET', });
    };
    EdulibWSV4.prototype.getSchoolLevels = function () {
        return this.request({ uri: this.buildUrl('/school_levels'), method: 'GET', });
    };
    EdulibWSV4.prototype.getSchoolLevel = function (id) {
        return this.request({ uri: this.buildUrl("/school_levels/" + id), method: 'GET', });
    };
    EdulibWSV4.prototype.getSubjects = function () {
        return this.request({ uri: this.buildUrl('/subjects'), method: 'GET', });
    };
    EdulibWSV4.prototype.getSubject = function (id) {
        return this.request({ uri: this.buildUrl("/subjects/" + id), method: 'GET', });
    };
    EdulibWSV4.prototype.getEstablishmentAccounts = function () {
        return this.request({ uri: this.buildUrl('/establishment_accounts'), method: 'GET', });
    };
    EdulibWSV4.prototype.getEstablishmentByUAI = function (uai) {
        return this.request({ uri: this.buildUrl("/establishment_accounts/by-uai/" + uai), method: 'GET', });
    };
    EdulibWSV4.prototype.getEstablishmentLicenses = function (id, articleId) {
        var qs = {};
        if (articleId) {
            qs.article_id = articleId;
        }
        return this.request({ uri: this.buildUrl("/establishment_accounts/" + id + "/licenses"), method: 'GET', qs: qs });
    };
    EdulibWSV4.prototype.getEstablishmentCatalog = function (id) {
        return this.request({ uri: this.buildUrl("/establishment_accounts/" + id + "/catalog"), method: 'GET' });
    };
    EdulibWSV4.prototype.getEstablishmentClassrooms = function (uai) {
        return this.request({ uri: this.buildUrl("/classrooms/establishment/" + uai), method: 'GET', });
    };
    EdulibWSV4.prototype.getEstablishmentClassroom = function (uai, code) {
        return this.request({ uri: this.buildUrl("/classrooms/establishment/" + uai + "/classroom/" + code), method: 'GET', });
    };
    EdulibWSV4.prototype.createClassroom = function (data) {
        var form = { classroom: data };
        return this.request({ uri: this.buildUrl('/classrooms'), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.updateClassroom = function (id, data) {
        var form = { data: data };
        return this.request({ uri: this.buildUrl("/classrooms/" + id), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.createStudent = function (data) {
        var form = { student: data };
        return this.request({ uri: this.buildUrl('/students'), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.updateStudent = function (id, data) {
        var form = { student: data };
        return this.request({ uri: this.buildUrl("/students/" + id), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.assignStudentLicense = function (id, licenseId) {
        var form = { license_id: licenseId };
        return this.request({ uri: this.buildUrl("/students/" + id + "/assign"), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.unassignStudentLicense = function (id, licenseId) {
        var form = { license_id: licenseId };
        return this.request({ uri: this.buildUrl("/students/" + id + "/unassign"), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.createTeacher = function (data) {
        var _this = this;
        var deferred = Promise.defer();
        var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        var options = { uri: this.buildUrl('/teachers'), method: 'POST', headers: headers };
        this.updateOptions(options);
        var req = request(options, function (err, res, body) {
            _this.processResponse(err, res, body).then(function (data) { return deferred.resolve(data); }, function (err) { return deferred.reject(err); });
        });
        var formData = req.form();
        formData.append('teacher[establishment_account_id]', data.establishment_account_id);
        formData.append('teacher[last_name]', data.last_name);
        formData.append('teacher[first_name]', data.first_name);
        formData.append('teacher[email]', data.email);
        formData.append('teacher[password]', data.password);
        (data.classroom_ids || []).forEach(function (d) { return formData.append('teacher[classroom_ids][]', d); });
        (data.subject_ids || []).forEach(function (d) { return formData.append('teacher[subject_ids][]', d); });
        return deferred.promise;
    };
    EdulibWSV4.prototype.updateTeacher = function (id, data) {
        var form = { teacher: data };
        return this.request({ uri: this.buildUrl("/teachers/" + id), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.assignTeacherLicense = function (id, licenseId) {
        var form = { license_id: licenseId };
        return this.request({ uri: this.buildUrl("/teachers/" + id + "/assign"), method: 'POST', form: form });
    };
    EdulibWSV4.prototype.unassignTeacherLicense = function (id, licenseId) {
        var form = { license_id: licenseId };
        return this.request({ uri: this.buildUrl("/teachers/" + id + "/unassign"), method: 'POST', form: form });
    };
    return EdulibWSV4;
}(abstract_edulib_ws_oauth_1.AbstractEdulibWSOAuth));
exports.EdulibWSV4 = EdulibWSV4;
;
//# sourceMappingURL=edulib.ws.v4.js.map