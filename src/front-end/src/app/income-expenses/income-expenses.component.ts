import { Component, OnInit } from '@angular/core';
import { Extrato } from '../model/extrato';
@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})
export class IncomeExpensesComponent implements OnInit {

  extrato: Extrato[]=[]

  dados: any;

  opcoes = [
    {rotulo: "Receita", valor: true}, //true - ganho
    {rotulo: "Despesa", valor: false} //false - despesa
  ]

  constructor() { }

  ngOnInit(): void {
  }

  adicionarDado(extratoForm){
    const dado: Extrato = {
        nome: extratoForm.value.nome,
        descricao: extratoForm.value.dado,
        valor:extratoForm.value.dadoValue,
        tipo: false
    };
      this.extrato.push(dado);
      extratoForm.resetForm();
    }

  atualizarGrafico(){
    const receita = this.extrato.filter(t => t.tipo).length;
    const despesa = this.extrato.length - receita;
    this.dados = {
      labels: ["Receitas", "Despesas"],
      datasets: [
        {
          data:[receita, despesa],
          backgroundColor: [
            '#2196F3', //azul para concluídas
            '#F44336', //vermelho para pendentes
          ]
        }
      ]
    }
  }
}
