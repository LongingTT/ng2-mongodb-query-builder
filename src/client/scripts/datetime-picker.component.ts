import { Component,ElementRef,EventEmitter,OnInit,Input,Output } from "@angular/core";

@Component({
	selector: 'datetime-picker',
    templateUrl: '../views/datetime-picker.component.html',
    //styleUrls:['../css/datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit{
	@Output() onDatetimePicked = new EventEmitter<any>();// moment object

	constructor(private el:ElementRef)
	{

	}
	ngOnInit(){
		var that:DatetimePickerComponent = this;
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
	}
}