import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Extrato } from '../model/extrato';
import { ExtratoService } from '../service/extrato.service';
import { MetodosGrafico } from './metodosGrafico'
@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css'],
})
export class IncomeExpensesComponent implements OnInit {
  extratos: Extrato[] = [];
  private extratoSubscription: Subscription;
  private metodosGrafico: MetodosGrafico = new MetodosGrafico();

  dados: any;

  opcoes = [
    { rotulo: 'Receita', valor: true }, //true - ganho
    { rotulo: 'Despesa', valor: false }, //false - despesa
  ];

  options: any;

  constructor(private extratoService: ExtratoService) {}

  ngOnInit(): void {
    this.extratoService.getExtratos();
    this.extratoSubscription = this.extratoService
      .getListaDeExtratosAtualizadaObservable()
      .subscribe((extratos: Extrato[]) => {
        this.extratos = extratos;
      });
  }

  adicionarDado(extratoForm) {
    let data: Date = extratoForm.value.data;
    const dado: Extrato = {
      id: 0,
      nome: extratoForm.value.nome,
      descricao: extratoForm.value.dado,
      valor: extratoForm.value.dadoValue,
      tipo: false,
      data: data,
    };
    this.extratoService.criarExtrato(dado);
    extratoForm.resetForm();
    this.extratoService.getExtratos();
  }

  atualizar(extrato: Extrato) {
    this.extratoService.atualizarExtrato(extrato);
  }

  atualizarGrafico() {
    let mesesAnos = this.metodosGrafico.criarLabelDoGrafico(this.extratos);
    let receitas = this.metodosGrafico.receitaOuDespesaPorMesesAnos(this.extratos, mesesAnos, 'receitas');
    let despesas = this.metodosGrafico.receitaOuDespesaPorMesesAnos(this.extratos, mesesAnos, 'despesas');
    this.dados = {
      labels: mesesAnos,
      datasets: [
        {
          label: 'Receitas',
          backgroundColor: '#42A5F5',
          data: receitas,
        },
        {
          label: 'Despesas',
          backgroundColor: '#FFA726',
          data: despesas,
        },
      ],
    };
    this.options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }
}
