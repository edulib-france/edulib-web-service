"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge = require('merge');
var Promise = require("bluebird");
var request = require("request");
var AbstractEdulibWS = (function () {
    function AbstractEdulibWS(version, options) {
        this.version = version;
        this.options = options;
        this.logger = {
            debug: console.log,
            error: console.error
        };
        this.host = AbstractEdulibWS.Environment[options.env];
        if (options.logger) {
            this.logger = options.logger;
        }
    }
    AbstractEdulibWS.prototype.request = function (options) {
        var deferred = Promise.defer();
        var authToken = this.getAuthToken();
        if (authToken) {
            options.headers = merge({ Authorization: "Bearer " + authToken }, options.headers || {});
        }
        this.logger.debug('EdulibWS::request', 'options:', options);
        request(options, function (err, res, body) {
            if (err) {
                return deferred.reject(err);
            }
            if (res.statusCode === 200 || res.statusCode === 201) {
                try {
                    return deferred.resolve(JSON.parse(body));
                }
                catch (err) {
                    deferred.reject(err);
                }
            }
            deferred.reject({ statusCode: res.statusCode, message: body });
        });
        return deferred.promise;
    };
    AbstractEdulibWS.prototype.buildUrl = function (path) {
        return this.host + "/api/" + this.version + path;
    };
    AbstractEdulibWS.Environment = {
        staging: 'https://staging-edulib.xair.cloud',
        production: 'https://www.edulib.fr'
    };
    return AbstractEdulibWS;
}());
exports.AbstractEdulibWS = AbstractEdulibWS;
;
//# sourceMappingURL=abstract.edulib.ws.js.map