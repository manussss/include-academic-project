import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChartModule } from 'primeng/chart';

import { AppComponent } from './app.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    IncomeExpensesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    FormsModule,
    TabViewModule,
    CardModule,
    ChartModule,
    SelectButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
