import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {QueryBuilderComponent} from './query-builder.component'


const appRoutes:Routes = [
{
	path:'query-builder',
	component:QueryBuilderComponent
}
]
export const appRoutingProviders:any[]=[

]

export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);