import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { CraftingService }  from './crafting.service';
 
import { AppComponent }  from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { CraftingCalcComponent } from "./crafting-calc.component";
import { CeilNumberPipe } from "./ceil-number.pipe"
import { FloorNumberPipe } from "./floor-number.pipe"




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [
    AppComponent,
    CraftingCalcComponent,
    CeilNumberPipe,
    FloorNumberPipe
  ],
  providers: [ CraftingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }