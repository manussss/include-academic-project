import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Extrato } from '../model/extrato';
import { ExtratoService } from '../service/extrato.service';
@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css'],
})
export class IncomeExpensesComponent implements OnInit {
  extratos: Extrato[] = [];
  private extratoSubscription: Subscription;

  dados: any;

  opcoes = [
    { rotulo: 'Receita', valor: true }, //true - ganho
    { rotulo: 'Despesa', valor: false }, //false - despesa
  ];

  options: any;

  constructor(private extratoService: ExtratoService) { }

  ngOnInit(): void {
    this.extratoService.getExtratos();
    this.extratoSubscription = this.extratoService
      .getListaDeExtratosAtualizadaObservable()
      .subscribe((extratos: Extrato[]) => {
        this.extratos = extratos;
      });
  }

  adicionarDado(extratoForm) {
    const dado: Extrato = {
      id: 0,
      nome: extratoForm.value.nome,
      descricao: extratoForm.value.dado,
      valor: extratoForm.value.dadoValue,
      tipo: false,
    };
    this.extratos.push(dado);
    extratoForm.resetForm();
  }

  atualizarGrafico() {
    const receita = this.extratos.filter((t) => t.tipo).length;
    const despesa = this.extratos.length - receita;
    this.dados = {
      labels: ['Extratos'],
      datasets: [
        {
          label: 'Receitas',
          backgroundColor: '#42A5F5',
          data: [receita]
        },
        {
          label: 'Despesas',
          backgroundColor: '#FFA726',
          data: [despesa]
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }
}
