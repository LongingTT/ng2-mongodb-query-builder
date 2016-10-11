"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var observable_1 = require('rxjs/observable');
var QueryDataService = (function () {
    function QueryDataService(http) {
        this.http = http;
        this.queryUrl = '/api/query';
    }
    QueryDataService.prototype.getDocuments = function (collectionName, mongoQuery) {
        // Query request body structure
        // {"collection": <document name : string>,
        //  "mongoquery": <mongo query object : any>}
        var requestBody = {
            "collection": collectionName,
            "mongoquery": mongoQuery
        };
        var body = JSON.stringify(requestBody);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(location.origin + this.queryUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    QueryDataService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    QueryDataService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // we'd also dig deeper into the error to get a better message
        var errmsg = (error.message) ? error.message : error.status ? error.status + "-" + error.statusText : 'Server error';
        console.error(errmsg);
        return observable_1.Observable.throw(errmsg);
    };
    QueryDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QueryDataService);
    return QueryDataService;
}());
exports.QueryDataService = QueryDataService;
