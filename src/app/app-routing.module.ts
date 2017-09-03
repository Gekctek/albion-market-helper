import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { CraftingCalcComponent }   from './crafting-calc.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/crafting-calc', pathMatch: 'full' },
  { path: 'crafting-calc',  component: CraftingCalcComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}