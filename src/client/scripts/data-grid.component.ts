import { Component,OnChanges, SimpleChange, Input } from "@angular/core";

// declare function prettyPrintOne(sourceCodeHtml:string,opt_langExtension:string,opt_numberLines: number|boolean): string;
// declare function prettyPrint(sourceCodeHtml?:Function,opt_root?:HTMLElement|HTMLDocument): void;


@Component({
	selector:'data-grid',
    templateUrl	: '../views/data-grid.component.html'
})
export class DataGridComponent {
	@Input() dataObject:Array<any>;

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
	constructor() {
		// code...
	}

	//     ngAfterViewInit(){
	// 		if(prettyPrint){

	// 			setTimeout(prettyPrint(function(){},this.el.nativeElement),1)
	// 		}else{

	// 			console.error("Please adding dependence packages of google perttify")
	// 		}
	//     }

	// ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
	// 	// let preHtmlElement=this.el.nativeElement.firstElementChild;
	// 	// preHtmlElement.classList.remove("prettyprinted");
	//     for (let propName in changes) {
	//     	let changedProp = changes[propName];
	//       if(changedProp.currentValue)
	//       {
	//       	this.code=JSON.stringify(changedProp.currentValue,null,4);

	//       }else{

	//       	this.code="/*** No Content ***/";
	//       }
	//   }

	// }

}