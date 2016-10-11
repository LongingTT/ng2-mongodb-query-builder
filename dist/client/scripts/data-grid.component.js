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
var core_1 = require("@angular/core");
// declare function prettyPrintOne(sourceCodeHtml:string,opt_langExtension:string,opt_numberLines: number|boolean): string;
// declare function prettyPrint(sourceCodeHtml?:Function,opt_root?:HTMLElement|HTMLDocument): void;
var DataGridComponent = (function () {
    //public code:string =JSON.stringify(this.jsonObject,null,4)
    //public code:string="";
    // =JSON.stringify({
    // 	"$and": [
    // 	{
    // 		"version": {
    // 			"$eq": "134"
    // 		}
    // 	},
    // 	{
    // 		"author": {
    // 			"$eq": "sad"
    // 		}
    // 	}
    // 	]
    // } ,null, "\t")
    function DataGridComponent() {
        // code...
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataGridComponent.prototype, "dataObject", void 0);
    DataGridComponent = __decorate([
        core_1.Component({
            selector: 'data-grid',
            templateUrl: '../views/data-grid.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], DataGridComponent);
    return DataGridComponent;
}());
exports.DataGridComponent = DataGridComponent;
