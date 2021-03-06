import { Extrato } from '../model/extrato'

export class MetodosGrafico {
  /**
   * Cria um vetor para a label do gráfico
   * @param extratos Vetor contendo extratos
   * @returns Vetor de string contando mês/ano
   */
   criarLabelDoGrafico(extratos: Extrato[]): string[] {
    let mesesAnos = [];

    // Percorre todos os extratos
    for (let extrato of extratos) {
      let dta: Date = new Date(extrato.data); // Recebe a data do extrato e tranforma no tipo Date
      let mes = ('0' + (dta.getMonth() + 1)).slice(-2); // Faz o tratemento de mês para ficar com 2 digitos Ex.: 2 -> '02'
      let ano = dta.getFullYear();
      let mesAno = ano + '/' + mes; // String contendo ano/mês

      // Compara se não há uma string com o mesmo valor de mesAno no vetor mesesAnos
      if (mesesAnos.indexOf(mesAno) === -1) {
        mesesAnos.push(mesAno);
      }

    }

    mesesAnos.sort(); // Organiza o vetor mesesAnos de acordo com o ano/mês

    // Percorre mesesAnos e inverte ano/mês para mês/ano Ex.: '2021/01' -> '01/2021'
    for (let m = 0; m < mesesAnos.length; m++) {
      let aux = mesesAnos[m].split('/');
      mesesAnos[m] = aux[1] + '/' + aux[0];
    }

    return mesesAnos;
  }


  /**
   * Cria vetores de receitas e despesas baseado no vetor mesesAnos
   * @param extratos Vetor contendo extratos
   * @param mesesAnos Vetor de string contendo mês/ano Ex.: '01/2021'
   * @param tipo String que indica o vetor a retornar ('receitas' ou 'despesas')
   * @returns Vetor com os valores do tipo que você escolheu
   */
  receitaOuDespesaPorMesesAnos(extratos: Extrato[], mesesAnos: string[], tipo: string) {
    let receitas = [];
    let despesas = [];

    // Percorre o vetor de mesesAnos
    for (let m = 0; m < mesesAnos.length; m++) {
      let sm = mesesAnos[m].split('/'); // Transforma a string da posição [m] em um vetor de mês e ano Ex.: '01/2021' -> ['01', '2021']

      // Variáveis para calculo
      let despesa = 0;
      let receita = 0;

      // Percorre todos os extratos
      for (let extrato of extratos) {
        let dt = new Date(extrato.data); // Recebe a data do extrato e tranforma no tipo Date

        // Compara mês e ano de dt(data do extrato) com mês e ano de sm(vetor auxiliar que contém mês e ano)
        if (dt.getMonth() + 1 === Number(sm[0]) && dt.getFullYear() === Number(sm[1])) {

          // Separação de despesas e receitas
          if (extrato.tipo) {
            receita += extrato.valor;
          } else {
            despesa += extrato.valor;
          }
        }

      }

      receitas.push(receita); // Adiciona o cálculo de receita do mês/ano no vetor de receitas
      despesas.push(despesa); // Adiciona o cálculo de despesa do mês/ano no vetor de despesas
    }

    if (tipo === 'receitas') return receitas; // Caso o tipo for 'receitas', retorna receitas
    else if (tipo === 'despesas') return despesas; // Caso o tipo for 'despesas', retorna despesas
  }
}
