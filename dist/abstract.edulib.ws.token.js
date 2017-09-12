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
var AbstractEdulibWSToken = (function (_super) {
    __extends(AbstractEdulibWSToken, _super);
    function AbstractEdulibWSToken(version, options) {
        var _this = _super.call(this, version, options) || this;
        _this.version = version;
        _this.options = options;
        return _this;
    }
    AbstractEdulibWSToken.prototype.getAuthToken = function () {
        return this.options.authToken;
    };
    return AbstractEdulibWSToken;
}(abstract_edulib_ws_1.AbstractEdulibWS));
exports.AbstractEdulibWSToken = AbstractEdulibWSToken;
;
//# sourceMappingURL=abstract.edulib.ws.token.js.map