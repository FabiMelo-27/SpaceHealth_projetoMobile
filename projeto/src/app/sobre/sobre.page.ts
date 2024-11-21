import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage {
  membros = [
    {
      nome: 'Fabíola Melo',
      matricula: '22205531',
      resumo: 'Estudante de Análise e Desenvolvimento de Sistemas, sou entusiasta de tecnologia e fã do universo Harry Potter. Apaixonado por séries e filmes, busco constantemente aprender e evoluir em minhas        habilidades',
      foto: 'assets/img/fabi.jpg', // Altere o caminho conforme necessário
    },
    {
      nome: 'Renan Reis',
      matricula: '654321',
      resumo: 'Estudante de Análise e Desenvolvimento de Sistemas, apaixonado por jogos eletrônicos e desenho. Gosto de explorar novas tecnologias e me expressar através da arte',
      foto: 'assets/img/renan.jpg',
    },
    {
      nome: 'Ícaro Ramos ',
      matricula: '22204490',
      resumo: 'Estudante de tecnologia no último período de análise e desenvolvimento de sistema, meu hobby é ficar com a família, assistir séries e filmes.',
      foto: 'assets/img/icaro.jpg',
    },
  ];

  constructor() {}
}
