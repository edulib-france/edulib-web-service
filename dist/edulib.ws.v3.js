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
var abstract_edulib_ws_token_1 = require("./abstract.edulib.ws.token");
var EdulibWSV3 = (function (_super) {
    __extends(EdulibWSV3, _super);
    function EdulibWSV3(options) {
        var _this = _super.call(this, 'v3', options) || this;
        _this.options = options;
        return _this;
    }
    EdulibWSV3.prototype.getUserBySsoId = function (uai, ssoId) {
        var qs = { uai: uai, sso_id: ssoId };
        return this.request({ uri: this.buildUrl('/users/identify-by-sso'), method: 'GET', qs: qs });
    };
    EdulibWSV3.prototype.getUserByCredential = function (username, password) {
        var qs = { username: username, password: password };
        return this.request({ uri: this.buildUrl('/users/identify-by-credentials'), method: 'GET', qs: qs });
    };
    EdulibWSV3.prototype.setUserSsoId = function (userId, ssoId) {
        var form = { user_id: userId, sso_id: ssoId };
        return this.request({ uri: this.buildUrl('/users/set-sso-id'), method: 'PATCH', form: form });
    };
    EdulibWSV3.prototype.getEtablishmentCatalog = function (uai) {
        var qs = { uai: uai };
        return this.request({ uri: this.buildUrl('/establishment_accounts/catalog'), method: 'GET', qs: qs });
    };
    EdulibWSV3.prototype.createLicense = function (uai, productEan, articleEan, offerRef, quantity) {
        var form = {
            offer_reference: offerRef,
            article_isbn: articleEan, product_isbn: productEan,
            establishment_account_uai: uai, license_count: quantity
        };
        return this.request({ uri: this.buildUrl('/licenses'), method: 'POST', form: form });
    };
    return EdulibWSV3;
}(abstract_edulib_ws_token_1.AbstractEdulibWSToken));
exports.EdulibWSV3 = EdulibWSV3;
;
//# sourceMappingURL=edulib.ws.v3.js.map