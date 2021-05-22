import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    IncomeExpensesComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    FormsModule,
    TabViewModule,
    CardModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }