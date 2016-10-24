"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var query_data_service_1 = require('./query-data.service');
var QueryBuilderComponent = (function () {
    function QueryBuilderComponent(queryDataService, el) {
        this.queryDataService = queryDataService;
        this.el = el;
        this.clausePositionInGroup = ClausePositionInGroup;
        this.clauseAndOr = AndOr;
        this.maxGroupLevel = 0;
        this.maxGroupWidth = 20;
        this.groupMarkBaseWidth = 20;
        this.groupMarkBaseHeight = 36;
        this.groupMarkWidthIncrementMax = 15;
        this.groupMarkWidthIncrementMin = 3;
        this.groupMarkHeightIncrement = 3;
        this.groupValidationResult = false;
        // Configuration
        this.collectionID = '';
        //public shownTabId:string="MongoQueryJson";
        this.shownTabId = "QueryResultJson";
        this.filterOptions = {
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
        };
        this._clauseId = 0;
        this._filterString = '';
        this.clauses = new Array();
        this.appendFilterClause();
    }
    QueryBuilderComponent.prototype.ngOnInit = function () {
        this.getCollectionMetadata();
    };
    QueryBuilderComponent.prototype.onDatetimePicked = function (datetime, clause) {
        clause.value = datetime.toISOString();
        console.log(datetime.toISOString());
    };
    QueryBuilderComponent.prototype.getCollectionMetadata = function () {
        var _this = this;
        console.debug("getCollectionMetadata running");
        var __mongoQueryObject;
        if (this.collectionID.length) {
            __mongoQueryObject = { displayName: this.collectionID };
        }
        else {
            __mongoQueryObject = {};
        }
        this.queryDataService.getDocuments('collectionmetadata', __mongoQueryObject)
            .subscribe(function (metadata) { return _this._getCollectionMetadataOnSuccess(metadata); }, function (error) { return _this._getCollectionMetadataOnError(error); });
    };
    QueryBuilderComponent.prototype._getCollectionMetadataOnSuccess = function (metadata) {
        if (metadata && metadata.length > 0) {
            this.collectionMetadata = metadata;
            // The following variable will be set again when user select a collection.
            this.selectedCollectionMetadata = this.collectionMetadata[0];
            this.collectionID = this.collectionMetadata._id;
            this.selectedCollectionFieldsNameArray = Object.keys(this.selectedCollectionMetadata.fields);
        }
        else {
            console.error("Invalid metadata:" + JSON.stringify(metadata) + ".");
        }
    };
    QueryBuilderComponent.prototype._getCollectionMetadataOnError = function (error) {
        console.error("Exception occurs when get collection metadata:" + JSON.stringify(error) + ".");
    };
    QueryBuilderComponent.prototype.onSelectCollection = function (metadata) {
        this.selectedCollectionMetadata = metadata;
        this.collectionID = metadata._id;
        this.selectedCollectionFieldsNameArray = Object.keys(metadata.fields);
        // Clear caluses
        this.clauses = null;
    };
    QueryBuilderComponent.prototype.generateClauseId = function () {
        return (new Date()).getTime();
    };
    // getClauses() {
    //    this.refreshClauses();
    //    this.mongoQueryObject= this.generateFilterString_MongoDB();
    //    alert(JSON.stringify(this.mongoQueryObject));
    // }
    QueryBuilderComponent.prototype.getMongoQueryObject = function () {
        this.mongoQueryObject = this.generateFilterString_MongoDB();
    };
    QueryBuilderComponent.prototype.queryData = function () {
        var _this = this;
        this.getMongoQueryObject();
        this.queryDataService.getDocuments(this.selectedCollectionMetadata._id, this.mongoQueryObject)
            .subscribe(function (docs) { return _this._queryDataOnSuccess(docs); }, function (error) { return _this._queryDataOnError(error); });
        ;
    };
    QueryBuilderComponent.prototype._queryDataOnSuccess = function (queryResult) {
        this.queryResultObject = queryResult;
    };
    QueryBuilderComponent.prototype._queryDataOnError = function (error) {
    };
    QueryBuilderComponent.prototype.getClausePositionInGroup = function (filterClause) {
        for (var _i = 0, _a = this.clauses; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item instanceof GroupMarkClause) {
                if (filterClause.clauseId == item.groupMarkStartClauseId) {
                    return ClausePositionInGroup.Start;
                }
                else if (filterClause.clauseId == item.groupMarkEndClauseId) {
                    return ClausePositionInGroup.End;
                }
            }
        }
        return ClausePositionInGroup.Middle;
    };
    QueryBuilderComponent.prototype.refreshClauses = function () {
        var groupStack = new Array();
        var __groupStackForUpdateStartClauseId = new Array();
        var __filterClauseForUpdateGroupEndClauseId;
        this.maxGroupLevel = 0;
        this.maxGroupWidth = 20;
        for (var i = 0; i < this.clauses.length; i++) {
            var item = this.clauses[i];
            if (item instanceof FilterClause) {
                item.selected = false;
                if (__groupStackForUpdateStartClauseId.length > 0) {
                    for (var j = 0; i < __groupStackForUpdateStartClauseId.length; j++) {
                        __groupStackForUpdateStartClauseId[j].groupMarkStartClauseId = item.clauseId;
                        // Update end group mark's start clauseId
                        var groupEndClause = this._getGroupMarkEndClauseById(__groupStackForUpdateStartClauseId[j].clauseId, i + 1);
                        groupEndClause.groupMarkStartClauseId = item.clauseId;
                    }
                    __groupStackForUpdateStartClauseId.length = 0;
                }
                __filterClauseForUpdateGroupEndClauseId = item;
            }
            else if (item instanceof GroupMarkClause) {
                // Remove group who has only one sub-clause 
                if ((i + 2) < this.clauses.length) {
                    if (item.clauseId == this.clauses[i + 2].clauseId) {
                        this.clauses.splice(i, 1);
                        i--;
                        this.clauses.splice(i + 2, 1); ////Because "this.clauses[i]" has been removed, so we should use "i+1" istead of "i+2" 
                        continue;
                    }
                }
                item.groupLevel = 0;
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                    __groupStackForUpdateStartClauseId.push(item);
                    for (var j = 0; j < groupStack.length; j++) {
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
                        for (var j = groupStack.length - 1; j >= 0; j--) {
                            if (j + 1 < groupStack.length) {
                                if (groupStack[j].groupMarkStartClauseId == groupStack[j + 1].groupMarkStartClauseId) {
                                    var newGroupMarkWidth = groupStack[j + 1].groupMarkWidth + this.groupMarkWidthIncrementMax;
                                    if (groupStack[j].groupMarkWidth < newGroupMarkWidth) {
                                        groupStack[j].groupMarkWidth = newGroupMarkWidth;
                                    }
                                    if (this.maxGroupWidth < newGroupMarkWidth) {
                                        this.maxGroupWidth = newGroupMarkWidth;
                                    }
                                }
                                else {
                                    var newGroupMarkWidth = groupStack[j + 1].groupMarkWidth + this.groupMarkWidthIncrementMin;
                                    if (groupStack[j].groupMarkWidth < newGroupMarkWidth) {
                                        groupStack[j].groupMarkWidth = newGroupMarkWidth;
                                    }
                                    if (this.maxGroupWidth < newGroupMarkWidth) {
                                        this.maxGroupWidth = newGroupMarkWidth;
                                    }
                                }
                            }
                        }
                        for (var j = 0; j < groupStack.length; j++) {
                            if (j - 1 >= 0) {
                                if (groupStack[j].groupMarkStartClauseId == groupStack[j - 1].groupMarkStartClauseId) {
                                    groupStack[j].groupMarkHeight = groupStack[j - 1].groupMarkHeight - this.groupMarkHeightIncrement;
                                }
                                else {
                                    groupStack[j].groupMarkHeight = this.groupMarkBaseHeight;
                                }
                            }
                        }
                    }
                }
                else if (item.groupDirection == GroupDirection.End) {
                    __groupStackForUpdateStartClauseId.length = 0;
                    var popedGroupStartedClause = groupStack.pop();
                    if (__filterClauseForUpdateGroupEndClauseId) {
                        item.groupMarkEndClauseId = __filterClauseForUpdateGroupEndClauseId.clauseId;
                        popedGroupStartedClause.groupMarkEndClauseId = __filterClauseForUpdateGroupEndClauseId.clauseId;
                    }
                }
            }
        }
    };
    QueryBuilderComponent.prototype.getParentGroups = function (index) {
        var groupStack = new Array();
        for (var i = 0; i < index; i++) {
            var item = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                }
                else if (item.groupDirection == GroupDirection.End) {
                    groupStack.pop();
                }
            }
        }
        return groupStack;
    };
    QueryBuilderComponent.prototype.validateFilterGroup = function () {
        this.groupValidationResult = this._validateFilterGroup();
    };
    QueryBuilderComponent.prototype._validateFilterGroup = function () {
        var firstSelectedClause = this._getFirstSelectedClause();
        // no selected
        if (firstSelectedClause == null) {
            return false;
        }
        var firstSelectedClauseIndex = this.clauses.indexOf(firstSelectedClause);
        var lastSelectedClause = this._getLastSelectedClause();
        var lastSelectedClauseIndex = this.clauses.indexOf(lastSelectedClause);
        var startGroupStack = this._getImmediateParentStartGroups(firstSelectedClauseIndex);
        var endGroupStack = this._getImmediateParentEndGroups(lastSelectedClauseIndex);
        // only one clause
        if (firstSelectedClauseIndex == lastSelectedClauseIndex) {
            return false;
        }
        // validate duplicate group
        for (var _i = 0, startGroupStack_1 = startGroupStack; _i < startGroupStack_1.length; _i++) {
            var item = startGroupStack_1[_i];
            if (lastSelectedClause.clauseId == item.groupMarkEndClauseId) {
                return false;
            }
        }
        // in different group
        var groupStack = new Array();
        for (var i = (firstSelectedClauseIndex - startGroupStack.length); i <= (lastSelectedClauseIndex + endGroupStack.length); i++) {
            var item = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                }
                else if (item.groupDirection == GroupDirection.End && groupStack.length > 0 && groupStack[groupStack.length - 1].clauseId == item.clauseId) {
                    groupStack.pop();
                }
                else if (item.groupDirection == GroupDirection.End && i < lastSelectedClauseIndex) {
                    groupStack.push(item);
                }
            }
            else if (item instanceof FilterClause) {
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
    };
    QueryBuilderComponent.prototype.removeGroup = function (groupId) {
        for (var i = 0; i < this.clauses.length; i++) {
            var item = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.clauseId == groupId) {
                    this.clauses.splice(i, 1);
                    i--; //Ensure traverse all the elements
                }
            }
        }
        this.refreshClauses();
    };
    QueryBuilderComponent.prototype.createGroup = function () {
        var firstSelectedClause = this._getFirstSelectedClause();
        var firstSelectedClauseIndex = this.clauses.indexOf(firstSelectedClause);
        var lastSelectedClause = this._getLastSelectedClause();
        var lastSelectedClauseIndex = this.clauses.indexOf(lastSelectedClause);
        var startGroupStack = this._getImmediateParentStartGroups(firstSelectedClauseIndex);
        var endGroupStack = this._getImmediateParentEndGroups(lastSelectedClauseIndex);
        var newGroupClauseId = this.generateClauseId();
        // insert group start mark
        if (startGroupStack.length == 0) {
            this.clauses.splice(firstSelectedClauseIndex, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.Start, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
            firstSelectedClauseIndex++;
            lastSelectedClauseIndex++;
        }
        else {
            for (var i = 0; i < startGroupStack.length; i++) {
                var item = startGroupStack[i];
                var groupEndIndex = this._getClauseIndexById(item.groupMarkEndClauseId);
                if (lastSelectedClauseIndex > groupEndIndex) {
                    if (i == (startGroupStack.length - 1)) {
                        this.clauses.splice(this.clauses.indexOf(item), 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.Start, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                        firstSelectedClauseIndex++;
                        lastSelectedClauseIndex++;
                    }
                    continue;
                }
                else if (lastSelectedClauseIndex < groupEndIndex) {
                    this.clauses.splice(this.clauses.indexOf(item) + 1, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.Start, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                    firstSelectedClauseIndex++;
                    lastSelectedClauseIndex++;
                    break;
                }
                else {
                }
            }
        }
        // insert group end mark
        if (endGroupStack.length == 0) {
            this.clauses.splice(lastSelectedClauseIndex + 1, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.End, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
        }
        else {
            for (var i = 0; i < endGroupStack.length; i++) {
                var item = endGroupStack[i];
                var groupStartIndex = this._getClauseIndexById(item.groupMarkStartClauseId);
                if (firstSelectedClauseIndex < groupStartIndex) {
                    if (i == (endGroupStack.length - 1)) {
                        this.clauses.splice(this.clauses.indexOf(item) + 1, 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.End, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                    }
                    continue;
                }
                else if (firstSelectedClauseIndex > groupStartIndex) {
                    this.clauses.splice(this.clauses.indexOf(item), 0, new GroupMarkClause(ClauseCategory.GroupMarkClause, newGroupClauseId, GroupDirection.End, 0, 0, 0, firstSelectedClause.clauseId, lastSelectedClause.clauseId));
                    break;
                }
                else {
                }
            }
        }
        this.refreshClauses();
    };
    QueryBuilderComponent.prototype._getFirstSelectedClause = function () {
        for (var i = 0; i < this.clauses.length; i++) {
            var item = this.clauses[i];
            if (item instanceof FilterClause) {
                if (item.selected) {
                    return item;
                }
            }
        }
        return null; //Not Found
    };
    QueryBuilderComponent.prototype._getLastSelectedClause = function () {
        for (var i = (this.clauses.length - 1); i >= 0; i--) {
            var item = this.clauses[i];
            if (item instanceof FilterClause) {
                if (item.selected) {
                    return item;
                }
            }
        }
        return null; //Not Found
    };
    QueryBuilderComponent.prototype._getImmediateParentStartGroups = function (index) {
        var groupStack = new Array();
        for (var i = (index - 1); i >= 0; i--) {
            var item = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.Start) {
                    groupStack.push(item);
                }
                else if (item.groupDirection == GroupDirection.End) {
                    return groupStack;
                }
            }
            else {
                return groupStack;
            }
        }
        return groupStack;
    };
    QueryBuilderComponent.prototype._getImmediateParentEndGroups = function (index) {
        var groupStack = new Array();
        for (var i = (index + 1); i < this.clauses.length; i++) {
            var item = this.clauses[i];
            if (item instanceof GroupMarkClause) {
                if (item.groupDirection == GroupDirection.End) {
                    groupStack.push(item);
                }
                else if (item.groupDirection == GroupDirection.Start) {
                    return groupStack;
                }
            }
            else {
                return groupStack;
            }
        }
        return groupStack;
    };
    QueryBuilderComponent.prototype._getClauseIndexById = function (clauseId) {
        for (var i = 0; i < this.clauses.length; i++) {
            if (this.clauses[i].clauseId == clauseId) {
                return i;
            }
        }
        return -1; //Not Found
    };
    QueryBuilderComponent.prototype._getFilterClauseById = function (clauseId) {
        for (var _i = 0, _a = this.clauses; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.clauseId == clauseId && item instanceof FilterClause) {
                return item;
            }
        }
        return null; //Not Found
    };
    QueryBuilderComponent.prototype._getGroupMarkStartClauseById = function (clauseId) {
        for (var _i = 0, _a = this.clauses; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.clauseId == clauseId && item instanceof GroupMarkClause && item.groupDirection == GroupDirection.Start) {
                return item;
            }
        }
        return null; //Not Found
    };
    QueryBuilderComponent.prototype._getGroupMarkEndClauseById = function (clauseId, searchStartIndex) {
        for (var i = searchStartIndex; i < this.clauses.length; i++) {
            var item = this.clauses[i];
            if (item.clauseId == clauseId && item instanceof GroupMarkClause && item.groupDirection == GroupDirection.End) {
                return item;
            }
        }
        return null; //Not Found
    };
    QueryBuilderComponent.prototype.insertFilterClause = function (index) {
        // let newClauseId:number =this.generateClauseId();
        while ((index - 1) >= 0) {
            var item = this.clauses[index - 1];
            if (item instanceof GroupMarkClause) {
                //if (this.clauses[index - 1].clauseCategory == ClauseCategory.GroupMarkClause) {
                // if(item.groupDirection==GroupDirection.End)
                // {
                //     item.groupMarkEndClauseId=newClauseId;
                //     let __groupMarkStartClause:GroupMarkClause =  this._getGroupMarkStartClauseById(item.clauseId);
                //     __groupMarkStartClause.groupMarkEndClauseId=newClauseId;
                // }
                index--;
            }
            else {
                break;
            }
        }
        this.clauses.splice(index, 0, new FilterClause(ClauseCategory.FilterClause, this.generateClauseId()));
        this.refreshClauses();
    };
    QueryBuilderComponent.prototype.appendFilterClause = function () {
        this.clauses.push(new FilterClause(ClauseCategory.FilterClause, this.generateClauseId()));
    };
    QueryBuilderComponent.prototype.removeFilterClause = function (index) {
        this.clauses.splice(index, 1);
        this.refreshClauses();
    };
    QueryBuilderComponent.prototype.generateFilterString_MongoDB = function () {
        //return alert(JSON.stringify(this._generateMongoDBFilterObject(0, this.clauses.length - 1)));
        return this._generateMongoDBFilterObject(0, this.clauses.length - 1);
    };
    QueryBuilderComponent.prototype._generateMongoDBFilterObject = function (startClauseIndex, endClauseIndex) {
        var _preAndor = -2;
        var _tempResult = null;
        for (var i = startClauseIndex; i <= endClauseIndex; i++) {
            var item = this.clauses[i];
            if (item instanceof FilterClause) {
                if (_preAndor < 0) {
                    if (_preAndor == -1) {
                        _preAndor = item.andOr;
                        if (_preAndor == AndOr.and) {
                            _tempResult = { $and: [_tempResult, JSON.parse(item.toFilterString())] };
                        }
                        else {
                            _tempResult = { $or: [_tempResult, JSON.parse(item.toFilterString())] };
                        }
                    }
                    else {
                        _tempResult = JSON.parse(item.toFilterString());
                        _preAndor++;
                    }
                }
                else {
                    if (_preAndor == item.andOr) {
                        _tempResult['$' + AndOr[_preAndor]].push(JSON.parse(item.toFilterString()));
                    }
                    else {
                        _preAndor = item.andOr;
                        if (_preAndor == AndOr.and) {
                            _tempResult = { $and: [_tempResult, JSON.parse(item.toFilterString())] };
                        }
                        else {
                            _tempResult = { $or: [_tempResult, JSON.parse(item.toFilterString())] };
                        }
                    }
                }
            }
            else {
                if (item.groupDirection == GroupDirection.Start) {
                    var _groupEndClauseIndex = this._getClauseIndexById(item.groupMarkEndClauseId);
                    var _innerResult = this._generateMongoDBFilterObject(i + 1, _groupEndClauseIndex);
                    if (_preAndor == -2) {
                        _tempResult = _innerResult;
                        _preAndor++;
                    }
                    else if (_innerResult) {
                        if (_preAndor == -1) {
                            _preAndor = this._getFilterClauseById(item.groupMarkStartClauseId).andOr;
                            if (_preAndor == AndOr.and) {
                                _tempResult = { $and: [_tempResult, _innerResult] };
                            }
                            else {
                                _tempResult = { $or: [_tempResult, _innerResult] };
                            }
                        }
                        else {
                            var _curAndor = this._getFilterClauseById(item.groupMarkStartClauseId).andOr;
                            if (_preAndor == _curAndor) {
                                _tempResult['$' + AndOr[_preAndor]].push(_innerResult);
                            }
                            else {
                                _preAndor = _curAndor;
                                if (_preAndor == AndOr.and) {
                                    _tempResult = { $and: [_tempResult, _innerResult] };
                                }
                                else {
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
    };
    QueryBuilderComponent = __decorate([
        core_1.Component({
            templateUrl: '../views/query-builder.component.html',
            styleUrls: ['../css/query-builder.component.css'],
            providers: [query_data_service_1.QueryDataService]
        }), 
        __metadata('design:paramtypes', [query_data_service_1.QueryDataService, core_1.ElementRef])
    ], QueryBuilderComponent);
    return QueryBuilderComponent;
}());
exports.QueryBuilderComponent = QueryBuilderComponent;
var ClausePositionInGroup;
(function (ClausePositionInGroup) {
    ClausePositionInGroup[ClausePositionInGroup["Start"] = 0] = "Start";
    ClausePositionInGroup[ClausePositionInGroup["Middle"] = 1] = "Middle";
    ClausePositionInGroup[ClausePositionInGroup["End"] = 2] = "End";
})(ClausePositionInGroup || (ClausePositionInGroup = {}));
;
var ClauseCategory;
(function (ClauseCategory) {
    ClauseCategory[ClauseCategory["FilterClause"] = 0] = "FilterClause";
    ClauseCategory[ClauseCategory["GroupMarkClause"] = 1] = "GroupMarkClause";
})(ClauseCategory || (ClauseCategory = {}));
;
var GroupDirection;
(function (GroupDirection) {
    GroupDirection[GroupDirection["Start"] = 0] = "Start";
    GroupDirection[GroupDirection["End"] = 1] = "End";
})(GroupDirection || (GroupDirection = {}));
;
var AndOr;
(function (AndOr) {
    AndOr[AndOr["and"] = 0] = "and";
    AndOr[AndOr["or"] = 1] = "or";
})(AndOr || (AndOr = {}));
;
var ClauseBase = (function () {
    function ClauseBase(clauseCategory, clauseId) {
        this.clauseCategory = clauseCategory;
        this.clauseId = clauseId;
    }
    return ClauseBase;
}());
var FilterClause = (function (_super) {
    __extends(FilterClause, _super);
    //public clauseCategory: ClauseCategory;
    //public clauseId: number;
    //public andOr: AndOr;
    //public fieldName: string;
    //public operator: string;
    //public value: string;
    function FilterClause(clauseCategory, clauseId, andOr, 
        //public fieldName: string = null,
        //public operator: string = null,
        field, filterOption, value, selected) {
        if (andOr === void 0) { andOr = AndOr.and; }
        if (field === void 0) { field = null; }
        if (filterOption === void 0) { filterOption = null; }
        if (value === void 0) { value = null; }
        if (selected === void 0) { selected = false; }
        _super.call(this, clauseCategory, clauseId);
        this.clauseCategory = clauseCategory;
        this.clauseId = clauseId;
        this.andOr = andOr;
        this.field = field;
        this.filterOption = filterOption;
        this.value = value;
        this.selected = selected;
        this.toFilterString = function () {
            //return this._stringFormat(this.filterOption ? this.filterOption.operator : '', this.field ? this.field : this.field.fieldName, this.value);
            //return this._stringFormat(this.operator, this.fieldName, this.value);
            return this._stringFormat(this.filterOption ? this.filterOption.stringFormat : '', this.field ? this.field.name : '', this.value);
        };
        this._stringFormat = function (a) {
            var args = arguments;
            return a.replace(/{(\d+)}/g, function (match, number) {
                number = parseInt(number);
                return typeof args[number + 1] != 'undefined' ? args[number + 1] : match;
            });
        };
    }
    return FilterClause;
}(ClauseBase));
exports.FilterClause = FilterClause;
var GroupMarkClause = (function (_super) {
    __extends(GroupMarkClause, _super);
    function GroupMarkClause(clauseCategory, clauseId, groupDirection, groupLevel, groupMarkWidth, // for ui 
        groupMarkHeight, // for UI
        groupMarkStartClauseId, groupMarkEndClauseId) {
        _super.call(this, clauseCategory, clauseId);
        this.clauseCategory = clauseCategory;
        this.clauseId = clauseId;
        this.groupDirection = groupDirection;
        this.groupLevel = groupLevel;
        this.groupMarkWidth = groupMarkWidth;
        this.groupMarkHeight = groupMarkHeight;
        this.groupMarkStartClauseId = groupMarkStartClauseId;
        this.groupMarkEndClauseId = groupMarkEndClauseId;
    }
    return GroupMarkClause;
}(ClauseBase));
exports.GroupMarkClause = GroupMarkClause;
