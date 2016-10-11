import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing,appRoutingProviders} from './app.routing';

import {QueryBuilderComponent} from './query-builder.component';
import {LayoutComponent} from './layout.component';
import {GoogleCodePrettifyForJsonComponent} from './google-code-prettify-json.component';
import {DataGridComponent} from './data-grid.component';

// Add the RxJS Observable operators we need in this app
import './rxjs-operators';

@NgModule({
	imports:[
	BrowserModule,
	FormsModule,
	routing,
	HttpModule
	],
	declarations:[
	LayoutComponent,
	QueryBuilderComponent,
	GoogleCodePrettifyForJsonComponent,
	DataGridComponent
	],
	providers:[
	appRoutingProviders
	],
	bootstrap:[
	LayoutComponent
	]
})
export class AppModule {
	
}