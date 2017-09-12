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
var abstract_edulib_ws_oauth_1 = require("./abstract.edulib.ws.oauth");
var EdulibWSV2 = (function (_super) {
    __extends(EdulibWSV2, _super);
    function EdulibWSV2(options) {
        var _this = _super.call(this, 'v2', options) || this;
        _this.options = options;
        return _this;
    }
    EdulibWSV2.prototype.getUser = function () {
        return this.request({ uri: this.buildUrl('/users/me'), method: 'GET', });
    };
    EdulibWSV2.prototype.getUserLicenses = function () {
        return this.request({ uri: this.buildUrl('/users/licenses'), method: 'GET', });
    };
    EdulibWSV2.prototype.getUserClassrooms = function () {
        return this.request({ uri: this.buildUrl('/users/classrooms'), method: 'GET', });
    };
    return EdulibWSV2;
}(abstract_edulib_ws_oauth_1.AbstractEdulibWSOAuth));
;
module.exports = EdulibWSV2;
//# sourceMappingURL=edulib.ws.v2.js.map