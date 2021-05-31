import { Injectable } from '@angular/core';
import { Extrato } from '../model/extrato';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExtratoService {
  private extratos: Extrato[] = [];
  private listaExtratosAtualizada = new Subject<Extrato[]>();

  constructor(private httpClient: HttpClient) {}

  getExtratos(): void {
    this.httpClient
      .get<{ extratos: Extrato[] }>(`http://localhost:3000/extratos/`)
      .pipe(
        map((extratos: any) => {
          return extratos.map((extrato: any) => {
            return {
              id: extrato.idExtrato,
              nome: extrato.nome,
              descricao: extrato.descricao,
              valor: extrato.valor,
              tipo: extrato.tipo,
            };
          });
        })
      )
      .subscribe((extratos) => {
        this.extratos = extratos;
        this.listaExtratosAtualizada.next([...this.extratos]);
      }, (res) => {
        console.log(res.error.text)
      });
  }

  getListaDeExtratosAtualizadaObservable() {
    return this.listaExtratosAtualizada.asObservable();
  }

  criarExtrato(extrato: Extrato) {
    this.httpClient
      .post(`http://localhost:3000/extrato/`, extrato)
      .subscribe(() => {
        const extratoNovo: Extrato = {
          id: extrato.id,
          nome: extrato.nome,
          descricao: extrato.descricao,
          valor: extrato.valor,
          tipo: extrato.tipo,
        };
        this.extratos.push(extratoNovo);
        this.listaExtratosAtualizada.next([...this.extratos]);
      }, (res) => {
        console.log(res.error.text)
      });
  }

  atualizarExtrato(extrato: Extrato) {
    this.httpClient
      .put(`http://localhost:3000/extratos/${extrato.id}`, extrato)
      .subscribe(() => {
        const copia = [...this.extratos];
        const indice = copia.findIndex((ext) => ext.id === extrato.id);
        const extratoNovo: Extrato = {
          id: extrato.id,
          nome: extrato.nome,
          descricao: extrato.descricao,
          valor: extrato.valor,
          tipo: extrato.tipo,
        };
        copia[indice] = extratoNovo;
        this.extratos = copia;
        this.listaExtratosAtualizada.next([...this.extratos]);
      }, (res) => {
        console.log(res.error.text)
      });
  }

  removerExtrato(id: number) {
    this.httpClient
      .delete(`http://localhost:3000/extratos/${id}`)
      .subscribe(() => {
        this.extratos = this.extratos.filter((ext) => {
          return ext.id !== id;
        });
        this.listaExtratosAtualizada.next([...this.extratos]);
      }, (res) => {
        console.log(res.error.text)
      });
  }
}
