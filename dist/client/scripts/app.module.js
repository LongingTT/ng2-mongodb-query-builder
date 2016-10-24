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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_1 = require('./app.routing');
var query_builder_component_1 = require('./query-builder.component');
var layout_component_1 = require('./layout.component');
var google_code_prettify_json_component_1 = require('./google-code-prettify-json.component');
var data_grid_component_1 = require('./data-grid.component');
var datetime_picker_component_1 = require('./datetime-picker.component');
// Add the RxJS Observable operators we need in this app
require('./rxjs-operators');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule
            ],
            declarations: [
                layout_component_1.LayoutComponent,
                query_builder_component_1.QueryBuilderComponent,
                google_code_prettify_json_component_1.GoogleCodePrettifyForJsonComponent,
                data_grid_component_1.DataGridComponent,
                datetime_picker_component_1.DatetimePickerComponent
            ],
            providers: [
                app_routing_1.appRoutingProviders
            ],
            bootstrap: [
                layout_component_1.LayoutComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
