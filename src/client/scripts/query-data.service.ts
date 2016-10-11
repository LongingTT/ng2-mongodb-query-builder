import {Injectable} from '@angular/core'
import {Http,Headers,RequestOptions,Response} from '@angular/http';

import {Observable} from 'rxjs/observable'

@Injectable()
export class QueryDataService{
	constructor(private http:Http){}
	private queryUrl='/api/query';
	getDocuments(collectionName:string, mongoQuery:any):Observable<any>{
		// Query request body structure
		// {"collection": <document name : string>,
		//  "mongoquery": <mongo query object : any>}
		let requestBody:any = {
			"collection":collectionName,
			"mongoquery":mongoQuery
		}

		let body:string = JSON.stringify(requestBody);
		let headers=new Headers({'Content-Type':'application/json'});
		let options=new RequestOptions({headers:headers});

		return this.http.post(location.origin+this.queryUrl,body,options)
		.map(this.extractData)
		.catch(this.handleError);		

	}

	private extractData(res:Response){
		let body= res.json();
		return body.data||{};

	}

	private handleError(error:any){
		// In a real world app, we might use a remote logging infrastructure
		// we'd also dig deeper into the error to get a better message
		let errmsg = (error.message)?error.message:error.status?`${error.status}-${error.statusText}`:'Server error';
		console.error(errmsg);
		return Observable.throw(errmsg);
	}
}