"use strict";
var router_1 = require('@angular/router');
var query_builder_component_1 = require('./query-builder.component');
var appRoutes = [
    {
        path: 'query-builder',
        component: query_builder_component_1.QueryBuilderComponent
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
