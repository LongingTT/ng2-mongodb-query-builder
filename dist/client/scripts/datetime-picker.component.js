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
var DatetimePickerComponent = (function () {
    function DatetimePickerComponent(el) {
        this.el = el;
        this.onDatetimePicked = new core_1.EventEmitter(); // moment object
    }
    DatetimePickerComponent.prototype.ngOnInit = function () {
        var that = this;
        jQuery(this.el.nativeElement.firstChild)
            .datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down"
            }
        });
        jQuery(this.el.nativeElement.firstChild)
            .on("dp.change", function (e) {
            that.onDatetimePicked.emit(e.date);
            //$('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatetimePickerComponent.prototype, "onDatetimePicked", void 0);
    DatetimePickerComponent = __decorate([
        core_1.Component({
            selector: 'datetime-picker',
            templateUrl: '../views/datetime-picker.component.html',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DatetimePickerComponent);
    return DatetimePickerComponent;
}());
exports.DatetimePickerComponent = DatetimePickerComponent;
