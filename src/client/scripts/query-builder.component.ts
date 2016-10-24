
import { Component,ElementRef,OnInit,Input } from "@angular/core";
import { NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";

import {QueryDataService} from './query-data.service'

@Component({
    templateUrl: '../views/query-builder.component.html',
    styleUrls:['../css/query-builder.component.css'],
    providers: [QueryDataService]
})
export class QueryBuilderComponent {
    private _clauseId: number;
    private _filterString: string;
    public clauses: Array<FilterClause | GroupMarkClause>;
    public clausePositionInGroup = ClausePositionInGroup;
    public clauseAndOr = AndOr;
    public maxGroupLevel: number = 0;
    public maxGroupWidth: number = 20;
    public groupMarkBaseWidth: number = 20;
    public groupMarkBaseHeight: number = 36;
    public groupMarkWidthIncrementMax: number = 15;
    public groupMarkWidthIncrementMin: number = 3;
    public groupMarkHeightIncrement: number = 3;
    public groupValidationResult: boolean = false;

    public collectionMetadata:any;
    public selectedCollectionMetadata:any;
    public selectedCollectionFieldsNameArray: Array<string>;// For UI
    public errorMessage:any;

    public selectedCollection:any;
    // Configuration
    public collectionID:string ='';

    public mongoQueryObject:any;
    public queryResultObject:any;

    //public shownTabId:string="MongoQueryJson";
    public shownTabId:string="QueryResultJson";
   
    constructor(private queryDataService:QueryDataService,private el:ElementRef) {
        this._clauseId = 0;
        this._filterString = '';
        this.clauses = new Array<FilterClause | GroupMarkClause>();
        this.appendFilterClause();
    }

    ngOnInit(){
        this.getCollectionMetadata();
    }

onDatetimePicked(datetime:any,clause:FilterClause){//moment object
    clause.value=datetime.toISOString();
console.log(datetime.toISOString());

}

    getCollectionMetadata(){
        console.debug("getCollectionMetadata running");
        let __mongoQueryObject:any;
        if(this.collectionID.length){
            __mongoQueryObject={displayName:this.collectionID};

        }else{
            __mongoQueryObject={};

        } 
        this.queryDataService.getDocuments('collectionmetadata',__mongoQueryObject)
        .subscribe(
           metadata=>this._getCollectionMetadataOnSuccess(metadata),
           error=>this._getCollectionMetadataOnError(error)
        );
    }
    _getCollectionMetadataOnSuccess(metadata:any){
        if(metadata&&metadata.length>0) {
            this.collectionMetadata=metadata;

            // The following variable will be set again when user select a collection.
            this.selectedCollectionMetadata=this.collectionMetadata[0];
            this.collectionID = this.collectionMetadata._id;
            this.selectedCollectionFieldsNameArray=Object.keys(this.selectedCollectionMetadata.fields);
        }else{
            console.error( `Invalid metadata:${JSON.stringify(metadata)}.`);

        }
    }
    _getCollectionMetadataOnError(error:any)
    {

        console.error( `Exception occurs when get collection metadata:${JSON.stringify(error)}.`);
    }

    onSelectCollection(metadata:any){

        this.selectedCollectionMetadata=metadata;
        this.collectionID = metadata._id;
        this.selectedCollectionFieldsNameArray=Object.keys(metadata.fields);

        // Clear caluses
        this.clauses=null;
    }
    public filterOptions:any = {
        'string': [
            { displayName: "=", stringFormat: '{"{0}":{"$eq":"{1}"}}', inputType: "string" },
            { displayName: '<>', stringFormat: '{"{0}":{"$ne":"{1}"}}', inputType: 'string' },
            //{ displayName: 'in (; separated)', stringFormat: "XXX", inputType: 'string' },
            { displayName: '= (case-insensitive)', stringFormat: '{"{0}":{"$regex":"^{1}$","$options":"i"}}', inputType: 'string' },
            { displayName: '<> (case-insensitive)', stringFormat: '{"{0}":{"$regex":"^((?!{1}).*)$","$options":"i"}}', inputType: 'string' },
            { displayName: 'starts with', stringFormat: '{"{0}":{"$regex":"^{1}"}}', inputType: 'string' },
            { displayName: 'does not start with', stringFormat: '{"{0}":{"$regex":"^(?!{1})"}}', inputType: 'string' },
            { displayName: 'starts with (case-insensitive)', stringFormat: '{"{0}":{"$regex":"^{1}","$options":"i"}}', inputType: 'string' },
            { displayName: 'does not start with (case-insensitive)', stringFormat: '{"{0}":{"$regex":"^(?!{1})","$options":"i"}}', inputType: 'string' },
            { displayName: 'ends with', stringFormat: '{"{0}":{"$regex":"{1}$"}}', inputType: 'string' },
            { displayName: 'does not end with', stringFormat: '{"{0}":{"$regex":"^(?!.*{1}$).*$"}}', inputType: 'string' },
            { displayName: 'ends with (case-insensitive)', stringFormat: '{"{0}":{"$regex":"{1}$","$options":"i"}}', inputType: 'string' },
            { displayName: 'does not end with (case-insensitive)', stringFormat: '{"{0}":{"$regex":"^(?!.*{1}$).*$","$options":"i"}}', inputType: 'string' },
            { displayName: 'contains', stringFormat: '{"{0}":{"$regex":"{1}"}}', inputType: 'string' },
            { displayName: 'contains (case-insensitive)', stringFormat: '{"{0}":{"$regex":"{1}","$options":"i"}}', inputType: 'string' }
            //{ displayName: 'has length', stringFormat: "XXX", inputType: 'int' }
        ],
        // TODO: NOT SUPPORT DATETIME
        'datetime': [
        { displayName: '=', stringFormat: '{"{0}":{"$eq":"{1}"}}', inputType: 'datetime', },
        { displayName: '<', stringFormat: '{"{0}":{"$lt":"{1}"}}', inputType: 'datetime', },
        { displayName: '>', stringFormat: '{"{0}":{"$gt":"{1}"}}', inputType: 'datetime', },
        { displayName: 'year equals', stringFormat: 'XXX', inputType: 'int' },
        { displayName: 'month number equals', stringFormat: 'XXX', inputType: 'int' },
        { displayName: 'day number equals', stringFormat: 'XXX', inputType: 'int' },
        { displayName: 'hour equals', stringFormat: 'XXX', inputType: 'int' },
        { displayName: 'minute equals', stringFormat: 'XXX', inputType: 'int' },
        { displayName: 'second equals', stringFormat: 'XXX', inputType: 'int' }
        ],
        'int': [
        { displayName: '=', stringFormat: '{"{0}":{"$eq":{1}}}', inputType: 'int' },
        { displayName: '<>', stringFormat: '{"{0}":{"$ne":{1}}}', inputType: 'int' }, 
        { displayName: '>', stringFormat: '{"{0}":{"$gt":{1}}}', inputType: 'int' },
        { displayName: '>=', stringFormat: '{"{0}":{"$gte":{1}}}', inputType: 'int' },
        { displayName: '<', stringFormat: '{"{0}":{"$lt":{1}}}', inputType: 'int' },
        { displayName: '<=', stringFormat: '{"{0}":{"$lte":{1}}}', inputType: 'int' }
        ],
        // TODO: NOT SUPPORT FLOAT
        'float': [
           { displayName: 'round equals', stringFormat: 'XXX', inputType: 'int' },
           { displayName: 'floor equals', stringFormat: 'XXX', inputType: 'int' },
           { displayName: 'ceiling equals', stringFormat: 'XXX', inputType: 'int' },
           { displayName: '=', stringFormat: 'XXX', inputType: 'double' },
           { displayName: '<>', stringFormat: 'XXX', inputType: 'double' },
           { displayName: '>', stringFormat: 'XXX', inputType: 'double' },
           { displayName: '>=', stringFormat: 'XXX', inputType: 'double' },
           { displayName: '<', stringFormat: 'XXX', inputType: 'double' },
           { displayName: '<=', stringFormat: 'XXX', inputType: 'double' }
        ],
        // TODO: NOT SUPPORT BOOL
        'boolean': [
        { displayName: '=', stringFormat: '{"{0}":{"$eq":{1}}}', inputType: 'boolean', inputTypeOptions: ['true', 'false'] },
        { displayName: '<>', stringFormat: '{"{0}":{"$eq":{1}}}', inputType: 'boolean', inputTypeOptions: ['true', 'false'] }
        ],
        // TODO: NOT SUPPORT OPTION
        'option': [
        { displayName: '=', stringFormat: 'XXX', inputType: 'option' },
        ]
    }

    generateClauseId(): number {
        return (new Date()).getTime();
    }
    // getClauses() {
    //    this.refreshClauses();
    //    this.mongoQueryObject= this.generateFilterString_MongoDB();
    //    alert(JSON.stringify(this.mongoQueryObject));
    // }

    public getMongoQueryObject():void{
        this.mongoQueryObject= this.generateFilterString_MongoDB();
    }
    public queryData():void{

        this.getMongoQueryObject();
        this.queryDataService.getDocuments(this.selectedCollectionMetadata._id,this.mongoQueryObject)        
        .subscribe(
           docs=>this._queryDataOnSuccess(docs),
           error=>this._queryDataOnError(error)
        );;
    }

private _queryDataOnSuccess(queryResult:any):void{
this.queryResultObject=queryResult;

}
private _queryDataOnError(error:any):void{


}


    getClausePositionInGroup(filterClause: FilterClause): ClausePositionInGroup {
        for (let item of this.clauses) {
            if (item instanceof GroupMarkClause) {
                if (filterClause.clauseId == item.groupMarkStartClauseId) {
                    return ClausePositionInGroup.Start;
                } else if (filterClause.clauseId == item.groupMarkEndClauseId) {
                    return ClausePositionInGroup.End;
                }
            }
        }

        return ClausePositionInGroup.Middle;
    }
    refreshClauses() {
        let groupStack: Array<GroupMarkClause> = new Array<GroupMarkClause>();

        let __groupStackForUpdateStartClauseId:Array<GroupMarkClause>=new Array<GroupMarkClause>();
        let __filterClauseForUpdateGroupEndClauseId:FilterClause;

        this.maxGroupLevel = 0;
        this.maxGroupWidth=20;
        for (let i = 0; i < this.clauses.length; i++) {
            let item: FilterClause | GroupMarkClause = this.clauses[i];
            if (item instanceof FilterClause) {
                item.selected = false;

                if(__groupStackForUpdateStartClauseId.length>0)
                {
                    for(let j=0;i<__groupStackForUpdateStartClauseId.length;j++)
                    {
                        __groupStackForUpdateStartClauseId[j].groupMarkStartClauseId=item.clauseId;

                        // Update end group mark's start clauseId
                        let groupEndClause:GroupMarkClause=this._getGroupMarkEndClauseById(__groupStackForUpdateStartClauseId[j].clauseId,i+1);
                        groupEndClause.groupMarkStartClauseId=item.clauseId;

                    }
                    __groupStackForUpdateStartClauseId.length=0;
                }

                __filterClauseForUpdateGroupEndClauseId=item;

            } else if (item instanceof GroupMarkClause) {

                // Remove group who has only one sub-clause 
                if ((i + 2) < this.clauses.length) {
                    if (item.clauseId == this.clauses[i + 2].clauseId) {
                        this.clauses.splice(i, 1);
                        i--;
                        this.clauses.splice(i + 2, 1);////Because "this.clauses[i]" has been removed, so we should use "i+1" istead of "i+2" 
                        continue;
                    }
                }
                item.groupLevel = 0;
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                    __groupStackForUpdateStartClauseId.push(item);

                    for (let j = 0; j < groupStack.length; j++) {
                        if (groupStack[j].groupLevel < (groupStack.length - j)) {
                            groupStack[j].groupLevel = groupStack.length - j;
                        }
                    }

                    //item.groupLevel = groupStack.length;
                    if (this.maxGroupLevel < groupStack.length) {
                        this.maxGroupLevel = groupStack.length;
                    }

                    item.groupMarkWidth = this.groupMarkBaseWidth;
                    item.groupMarkHeight = this.groupMarkBaseHeight;
                    if (groupStack.length > 1) {
                        for (let j = groupStack.length - 1; j >= 0; j--) {
                            if (j + 1 < groupStack.length) {
                                if (groupStack[j].groupMarkStartClauseId == groupStack[j + 1].groupMarkStartClauseId) {
                                    let newGroupMarkWidth = groupStack[j + 1].groupMarkWidth + this.groupMarkWidthIncrementMax;
                                    if (groupStack[j].groupMarkWidth < newGroupMarkWidth) {
                                        groupStack[j].groupMarkWidth = newGroupMarkWidth;
                                    }
                                    if(this.maxGroupWidth < newGroupMarkWidth)
                                    {
                                        this.maxGroupWidth=newGroupMarkWidth;
                                    }

                                } else {
                                    let newGroupMarkWidth = groupStack[j + 1].groupMarkWidth + this.groupMarkWidthIncrementMin;
                                    if (groupStack[j].groupMarkWidth < newGroupMarkWidth) {
                                        groupStack[j].groupMarkWidth = newGroupMarkWidth;
                                    }
                                    if(this.maxGroupWidth < newGroupMarkWidth)
                                    {
                                        this.maxGroupWidth=newGroupMarkWidth;

                                    }
                                }
                            }
                        }
                        for (let j = 0; j < groupStack.length; j++) {
                            if (j - 1 >= 0) {
                                if (groupStack[j].groupMarkStartClauseId == groupStack[j - 1].groupMarkStartClauseId) {
                                    groupStack[j].groupMarkHeight = groupStack[j - 1].groupMarkHeight - this.groupMarkHeightIncrement;
                                } else {
                                    groupStack[j].groupMarkHeight = this.groupMarkBaseHeight;
                                }
                            }
                        }
                    }


                } else if (item.groupDirection == GroupDirection.End) {
                    __groupStackForUpdateStartClauseId.length=0;

                    let popedGroupStartedClause:GroupMarkClause =groupStack.pop(); 
                    if(__filterClauseForUpdateGroupEndClauseId){
                        item.groupMarkEndClauseId=__filterClauseForUpdateGroupEndClauseId.clauseId;
                        popedGroupStartedClause.groupMarkEndClauseId=__filterClauseForUpdateGroupEndClauseId.clauseId;

                    }
                    //groupStack.pop();
                }
            }
        }
    }
    getParentGroups(index: number): Array<GroupMarkClause> {
        let groupStack: Array<GroupMarkClause> = new Array<GroupMarkClause>();
        for (let i = 0; i < index; i++) {
            let item: GroupMarkClause | FilterClause = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                } else if (item.groupDirection == GroupDirection.End) {
                    groupStack.pop();
                }
            }
        }
        return groupStack;
    }
    public validateFilterGroup() {
        this.groupValidationResult = this._validateFilterGroup();
    }

    private _validateFilterGroup(): boolean {

        let firstSelectedClause: FilterClause = this._getFirstSelectedClause();

        // no selected
        if (firstSelectedClause == null) {
            return false;
        }

        let firstSelectedClauseIndex: number = this.clauses.indexOf(firstSelectedClause);
        let lastSelectedClause: FilterClause = this._getLastSelectedClause();
        let lastSelectedClauseIndex: number = this.clauses.indexOf(lastSelectedClause);
        let startGroupStack: Array<GroupMarkClause> = this._getImmediateParentStartGroups(firstSelectedClauseIndex);
        let endGroupStack: Array<GroupMarkClause> = this._getImmediateParentEndGroups(lastSelectedClauseIndex);

        // only one clause
        if (firstSelectedClauseIndex == lastSelectedClauseIndex) {
            return false;
        }

        // validate duplicate group
        for (let item of startGroupStack) {
            if (lastSelectedClause.clauseId == item.groupMarkEndClauseId) {
                return false;
            }
        }
        // in different group
        let groupStack: Array<GroupMarkClause> = new Array<GroupMarkClause>();
        for (let i = (firstSelectedClauseIndex - startGroupStack.length); i <= (lastSelectedClauseIndex + endGroupStack.length); i++) {

            let item: FilterClause | GroupMarkClause = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                } else if (item.groupDirection == GroupDirection.End && groupStack.length > 0 && groupStack[groupStack.length - 1].clauseId == item.clauseId) {
                    groupStack.pop();
                } else if (item.groupDirection == GroupDirection.End && i < lastSelectedClauseIndex) {
                    groupStack.push(item);
                }

            } else if (item instanceof FilterClause) {
                //continue
                if (!item.selected) {
                    return false;
                }
            }
        }
        if (groupStack.length > 0) {
            return false;
        }
        return true;
    }
    removeGroup(groupId: number) {
        for (let i = 0; i < this.clauses.length; i++) {
            let item: FilterClause | GroupMarkClause = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.clauseId == groupId) {
                    this.clauses.splice(i, 1);
                    i--;//Ensure traverse all the elements
                }
            }
        }

        this.refreshClauses();
    }
    createGroup() {
        let firstSelectedClause: FilterClause = this._getFirstSelectedClause();
        let firstSelectedClauseIndex: number = this.clauses.indexOf(firstSelectedClause);
        let lastSelectedClause: FilterClause = this._getLastSelectedClause();
        let lastSelectedClauseIndex: number = this.clauses.indexOf(lastSelectedClause);
        let startGroupStack: Array<GroupMarkClause> = this._getImmediateParentStartGroups(firstSelectedClauseIndex);
        let endGroupStack: Array<GroupMarkClause> = this._getImmediateParentEndGroups(lastSelectedClauseIndex);


        let newGroupClauseId = this.generateClauseId();

        // insert group start mark
        if (startGroupStack.length == 0) {
            this.clauses.splice(firstSelectedClauseIndex, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.Start, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
            firstSelectedClauseIndex++;
            lastSelectedClauseIndex++;
        } else {
            for (let i = 0; i < startGroupStack.length; i++) {
                let item: GroupMarkClause = startGroupStack[i];
                let groupEndIndex: number = this._getClauseIndexById(item.groupMarkEndClauseId);
                if (lastSelectedClauseIndex > groupEndIndex) {
                    if (i == (startGroupStack.length - 1)) {
                        this.clauses.splice(this.clauses.indexOf(item), 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.Start, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                        firstSelectedClauseIndex++;
                        lastSelectedClauseIndex++;
                    }
                    continue;
                } else if (lastSelectedClauseIndex < groupEndIndex) {
                    this.clauses.splice(this.clauses.indexOf(item) + 1, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.Start, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                    firstSelectedClauseIndex++;
                    lastSelectedClauseIndex++;
                    break;
                } else {
                    //TODO:Throw errors
                }
            }
        }

        // insert group end mark
        if (endGroupStack.length == 0) {
            this.clauses.splice(lastSelectedClauseIndex + 1, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.End, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
        } else {
            for (let i = 0; i < endGroupStack.length; i++) {
                let item: GroupMarkClause = endGroupStack[i];
                let groupStartIndex: number = this._getClauseIndexById(item.groupMarkStartClauseId);
                if (firstSelectedClauseIndex < groupStartIndex) {
                    if (i == (endGroupStack.length - 1)) {
                        this.clauses.splice(this.clauses.indexOf(item) + 1, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.End, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                    }
                    continue;
                } else if (firstSelectedClauseIndex > groupStartIndex) {
                    this.clauses.splice(this.clauses.indexOf(item), 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.End, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                    break;
                } else {
                    //TODO:Throw errors
                }
            }
        }
        this.refreshClauses();
    }
    private _getFirstSelectedClause(): FilterClause {
        for (let i = 0; i < this.clauses.length; i++) {
            let item: FilterClause | GroupMarkClause = this.clauses[i];
            if (item instanceof FilterClause) {
                if (item.selected) {
                    return item;
                }
            }
        }
        return null;//Not Found
    }
    private _getLastSelectedClause(): FilterClause {
        for (let i = (this.clauses.length - 1); i >= 0; i--) {
            let item: FilterClause | GroupMarkClause = this.clauses[i];
            if (item instanceof FilterClause) {
                if (item.selected) {
                    return item;
                }
            }
        }

        return null;//Not Found
    }
    private _getImmediateParentStartGroups(index: number): Array<GroupMarkClause> {
        let groupStack: Array<GroupMarkClause> = new Array<GroupMarkClause>();

        for (let i = (index - 1); i >= 0; i--) {
            let item: GroupMarkClause | FilterClause = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                } else if (item.groupDirection == GroupDirection.End) {
                    return groupStack;
                }
            } else {
                return groupStack;
            }
        }
        return groupStack;
    }
    private _getImmediateParentEndGroups(index: number): Array<GroupMarkClause> {
        let groupStack: Array<GroupMarkClause> = new Array<GroupMarkClause>();

        for (let i = (index + 1); i < this.clauses.length; i++) {
            let item: GroupMarkClause | FilterClause = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.End) {
                    groupStack.push(item);
                } else if (item.groupDirection == GroupDirection.Start) {
                    return groupStack;
                }
            } else {
                return groupStack;
            }
        }
        return groupStack;
    }
    private _getClauseIndexById(clauseId: number): number {
        for (let i = 0; i < this.clauses.length; i++) {
            if (this.clauses[i].clauseId == clauseId) {
                return i;
            }
        }
        return -1;//Not Found
    }
    private _getFilterClauseById(clauseId: number): FilterClause {
        for (let item of this.clauses) {
            if (item.clauseId == clauseId && item instanceof FilterClause) {
                return item;
            }
        }
        return null;//Not Found

    }
        private _getGroupMarkStartClauseById(clauseId: number): GroupMarkClause {
        for (let item of this.clauses) {
            if (item.clauseId == clauseId && item instanceof GroupMarkClause && item.groupDirection==GroupDirection.Start) {
                return item;
            }
        }
        return null;//Not Found

    }
    private _getGroupMarkEndClauseById(clauseId:number,searchStartIndex:number):GroupMarkClause{
        for(let i=searchStartIndex; i<this.clauses.length;i++){
            let item:GroupMarkClause|FilterClause=this.clauses[i];
            if (item.clauseId == clauseId && item instanceof GroupMarkClause && item.groupDirection==GroupDirection.End) {
                return item;
            }
        }
        return null;//Not Found
    }

    insertFilterClause(index: number) {
        // let newClauseId:number =this.generateClauseId();

        while ((index - 1) >= 0) {
            let item: GroupMarkClause | FilterClause = this.clauses[index - 1];
            if(item instanceof GroupMarkClause){
            //if (this.clauses[index - 1].clauseCategory == ClauseCategory.GroupMarkClause) {
                // if(item.groupDirection==GroupDirection.End)
                // {
                //     item.groupMarkEndClauseId=newClauseId;
                //     let __groupMarkStartClause:GroupMarkClause =  this._getGroupMarkStartClauseById(item.clauseId);
                //     __groupMarkStartClause.groupMarkEndClauseId=newClauseId;
                // }
                
                index--;
            } else {
                break;
            }
        }
        this.clauses.splice(index, 0, new FilterClause(ClauseCategory.FilterClause, this.generateClauseId()));
        this.refreshClauses();
    }
appendFilterClause(){

    this.clauses.push(new FilterClause(ClauseCategory.FilterClause, this.generateClauseId()));
}

    public removeFilterClause(index: number): void {
        this.clauses.splice(index, 1);
        this.refreshClauses();
    }

    generateFilterString_MongoDB(): any {
        //return alert(JSON.stringify(this._generateMongoDBFilterObject(0, this.clauses.length - 1)));
        return this._generateMongoDBFilterObject(0, this.clauses.length - 1);
    }

    private _generateMongoDBFilterObject(startClauseIndex: number, endClauseIndex: number): any {

        let _preAndor: number = -2;
        let _tempResult: any = null;

        for (let i = startClauseIndex; i <= endClauseIndex; i++) {
            let item: FilterClause | GroupMarkClause = this.clauses[i];
            if (item instanceof FilterClause) {

                if (_preAndor < 0) {
                    if (_preAndor == -1) {
                        _preAndor = item.andOr;
                        if (_preAndor == AndOr.and) {
                            _tempResult = { $and: [_tempResult, JSON.parse(item.toFilterString())] };
                        } else {
                            _tempResult = { $or: [_tempResult, JSON.parse(item.toFilterString())] };
                        }
                    } else {
                        _tempResult = JSON.parse(item.toFilterString());
                        _preAndor++;
                    }
                } else {
                    if (_preAndor == item.andOr) {
                        _tempResult['$' + AndOr[_preAndor]].push(JSON.parse(item.toFilterString()));

                    } else {
                        _preAndor = item.andOr;
                        if (_preAndor == AndOr.and) {
                            _tempResult = { $and: [_tempResult, JSON.parse(item.toFilterString())] };
                        } else {
                            _tempResult = { $or: [_tempResult, JSON.parse(item.toFilterString())] };
                        }
                    }
                }

            } else {
                if (item.groupDirection == GroupDirection.Start) {
                    let _groupEndClauseIndex: number = this._getClauseIndexById(item.groupMarkEndClauseId);
                    let _innerResult: any = this._generateMongoDBFilterObject(i + 1, _groupEndClauseIndex);
                    if (_preAndor == -2) {

                        _tempResult = _innerResult;
                        _preAndor++;
                    } else if (_innerResult) {
                        if (_preAndor == -1) {
                            _preAndor = this._getFilterClauseById(item.groupMarkStartClauseId).andOr;
                            if (_preAndor == AndOr.and) {
                                _tempResult = { $and: [_tempResult, _innerResult] };
                            } else {
                                _tempResult = { $or: [_tempResult, _innerResult] };
                            }
                        }
                        else {

                            let _curAndor = this._getFilterClauseById(item.groupMarkStartClauseId).andOr;

                            if (_preAndor == _curAndor) {
                                _tempResult['$' + AndOr[_preAndor]].push(_innerResult);
                            } else {
                                _preAndor = _curAndor;
                                if (_preAndor == AndOr.and) {
                                    _tempResult = { $and: [_tempResult, _innerResult] };
                                } else {
                                    _tempResult = { $or: [_tempResult, _innerResult] };
                                }
                            }

                        }
                    }
                    i = _groupEndClauseIndex;
                }

            }
        }
        return _tempResult;
    }

}
enum ClausePositionInGroup { Start, Middle, End };
enum ClauseCategory { FilterClause, GroupMarkClause };
enum GroupDirection { Start, End };
enum AndOr { and, or };
class ClauseBase {

    constructor(public clauseCategory: ClauseCategory, public clauseId: number) {
    }
}

export class FilterClause extends ClauseBase {
    //public clauseCategory: ClauseCategory;
    //public clauseId: number;
    //public andOr: AndOr;
    //public fieldName: string;
    //public operator: string;
    //public value: string;
    constructor(
        public clauseCategory: ClauseCategory,
        public clauseId: number,
        public andOr: AndOr = AndOr.and,
        //public fieldName: string = null,
        //public operator: string = null,
        public field: any = null,
        public filterOption: any = null,
        public value: string = null,
        public selected: boolean = false
        ) {
        super(clauseCategory, clauseId);
    }
    public toFilterString = function (): string {

        //return this._stringFormat(this.filterOption ? this.filterOption.operator : '', this.field ? this.field : this.field.fieldName, this.value);
        //return this._stringFormat(this.operator, this.fieldName, this.value);
        return this._stringFormat(this.filterOption ? this.filterOption.stringFormat : '', this.field ? this.field.name : '', this.value);
    }
    private _stringFormat = function (a: string): string {
        let args = arguments;
        return a.replace(/{(\d+)}/g, function (match, number) {
            number = parseInt(number);
            return typeof args[number + 1] != 'undefined' ? args[number + 1] : match;
        });
    }
}

export class GroupMarkClause extends ClauseBase {
    constructor(
        public clauseCategory: ClauseCategory,
        public clauseId: number,
        public groupDirection: GroupDirection,
        public groupLevel: number,
        public groupMarkWidth: number, // for ui 
        public groupMarkHeight: number, // for UI
        public groupMarkStartClauseId: number,
        public groupMarkEndClauseId: number

        ) {
        super(clauseCategory, clauseId);
    }
}

