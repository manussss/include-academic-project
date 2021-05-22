import { Component, OnInit } from '@angular/core';
import { Extrato } from '../model/extrato';
@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})
export class IncomeExpensesComponent implements OnInit {
  extrato:Extrato[]=[]
  constructor() { }

  ngOnInit(): void {
  }

  adicionarDado(extratoForm){
    const dado: Extrato = {
      descricao: extratoForm.value.dado,
      valor:extratoForm.value.dadoValue,
      tipo: false
      };
      this.extrato.push(dado);
      extratoForm.resetForm();
      
    }
  

}
