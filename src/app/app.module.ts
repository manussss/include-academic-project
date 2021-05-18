import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    IncomeExpensesComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
