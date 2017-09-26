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
var abstract_edulib_ws_1 = require("./abstract.edulib.ws");
var AbstractEdulibWSOAuth = (function (_super) {
    __extends(AbstractEdulibWSOAuth, _super);
    function AbstractEdulibWSOAuth(version, options) {
        var _this = _super.call(this, version, options) || this;
        _this.version = version;
        _this.options = options;
        return _this;
    }
    AbstractEdulibWSOAuth.prototype.authenticate = function (username, password) {
        var _this = this;
        return this.request({
            uri: this.host + "/oauth/token",
            method: 'POST',
            form: {
                username: username,
                password: password,
                grant_type: 'password',
                client_id: this.options.oAuthApp.clientId,
                client_secret: this.options.oAuthApp.clientSecret
            }
        }).then(function (auth) { return _this.auth = auth; });
    };
    AbstractEdulibWSOAuth.prototype.refresh = function () {
        var _this = this;
        return this.request({
            uri: this.host + "/oauth/token",
            method: 'POST',
            form: {
                grant_type: 'refresh_token',
                client_id: this.options.oAuthApp.clientId,
                client_secret: this.options.oAuthApp.clientSecret,
                refresh_token: this.getAuthToken()
            }
        }).then(function (auth) { return _this.auth = auth; });
    };
    AbstractEdulibWSOAuth.prototype.getAuthToken = function () {
        return this.auth ? this.auth.access_token : '';
    };
    return AbstractEdulibWSOAuth;
}(abstract_edulib_ws_1.AbstractEdulibWS));
exports.AbstractEdulibWSOAuth = AbstractEdulibWSOAuth;
;
//# sourceMappingURL=abstract.edulib.ws.oauth.js.map