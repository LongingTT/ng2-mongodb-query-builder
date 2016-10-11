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
var GoogleCodePrettifyForJsonComponent = (function () {
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
    function GoogleCodePrettifyForJsonComponent(el) {
        this.el = el;
        //public code:string =JSON.stringify(this.jsonObject,null,4)
        this.code = "";
        // code...
    }
    //     ngAfterViewInit(){
    // 		if(prettyPrint){
    // 			setTimeout(prettyPrint(function(){},this.el.nativeElement),1)
    // 		}else{
    // 			console.error("Please adding dependence packages of google perttify")
    // 		}
    //     }
    GoogleCodePrettifyForJsonComponent.prototype.ngOnChanges = function (changes) {
        var preHtmlElement = this.el.nativeElement.firstElementChild;
        preHtmlElement.classList.remove("prettyprinted");
        for (var propName in changes) {
            var changedProp = changes[propName];
            if (changedProp.currentValue) {
                this.code = JSON.stringify(changedProp.currentValue, null, 4);
            }
            else {
                this.code = "/*** No Content ***/";
            }
            preHtmlElement.innerHTML = this.code;
        }
        setTimeout(prettyPrint(function () { }, this.el.nativeElement), 1);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GoogleCodePrettifyForJsonComponent.prototype, "jsonObject", void 0);
    GoogleCodePrettifyForJsonComponent = __decorate([
        core_1.Component({
            selector: 'google-code-prettify-json',
            templateUrl: '../views/google-code-prettify-json.component.html' // ,
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], GoogleCodePrettifyForJsonComponent);
    return GoogleCodePrettifyForJsonComponent;
}());
exports.GoogleCodePrettifyForJsonComponent = GoogleCodePrettifyForJsonComponent;
