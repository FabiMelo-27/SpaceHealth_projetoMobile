// src/app/pages/sintomas-diarios.page.ts
import { Sintoma } from './../models/sintoma';
import { RegistroPressao } from './../models/registro-pressao';
import { RegistroDiabetes } from './../models/registro-diabetes';
import { Component, OnInit } from '@angular/core';
import { SintomasService } from '../services/sintomas.service';

@Component({
  selector: 'app-sintomas-diarios',
  templateUrl: './sintomas-diarios.page.html',
  styleUrls: ['./sintomas-diarios.page.scss'],
})
export class SintomasDiariosPage implements OnInit {
  formularioTipo: string = 'sintomas';
  sintomas: any[] = [];
  registrosPressao: any[] = [];
  registrosDiabetes: any[] = [];
  sintomaSelecionado: string = '';
  sintomaPersonalizado: string = '';
  intensidade: string = '';
  sintomaEditando: number | null = null;

  dataAtual: string = new Date().toISOString();
  dataSintoma: string = this.dataAtual;
  dataPressao: string = this.dataAtual;
  pressaoSistolica: number | null = null;
  pressaoDiastolica: number | null = null;
  dataDiabetes: string = this.dataAtual;
  nivelGlicose: number | null = null;

  sintomasComuns: string[] = [
    'Azia',
    'Calafrios',
    'Constipação',
    'Cólica',
    'Cólica Menstrual',
    'Diarreia',
    'Dor de barriga',
    'Dor de cabeça',
    'Dor de Garganta',
    'Dor no peito',
    'Dor abdominal',

    'Dor nas articulações',
    'Fadiga',
    'Falta de ar',
    'Febre',
    'Gases',
    'Náusea',
    'Tontura',
    'Tosse seca',
    'Tosse com catarro',
    'Dificuldade para respirar',
    'Congestão nasal',

    'Vômito',

];


  sintomaSelecionadaId: string | null = null;
  pressaoSelecionadaId: string | null = null;
  diabeteSelecionadaId: string | null = null;

  constructor(private sintomasService: SintomasService) {}

  ngOnInit(): void {
    this.sintomasService.getSintomas().subscribe((data) => {
      this.sintomas = data || [];
    });
    this.sintomasService.getRegistrosPressao().subscribe((data) => {
      this.registrosPressao = data || [];
    });
    this.sintomasService.getRegistrosDiabetes().subscribe((data) => {
      this.registrosDiabetes = data || [];
    });
  }

  registrarSintomas() {
    if (this.sintomaSelecionado && this.intensidade && this.dataSintoma) {
      const sintoma = new Sintoma(this.sintomaSelecionado, this.intensidade, this.dataSintoma);
      if (this.sintomaSelecionadaId) {
        this.sintomasService.updateSintoma(this.sintomaSelecionadaId, sintoma).then(() => {
          console.log('Sintoma atualizado com sucesso!');
          this.limparCampos();
        });
      } else {
        this.sintomasService.addSintoma(sintoma).then(() => {
          console.log('Sintoma adicionado com sucesso!');
          this.limparCampos();
        });
      }
    } else {
      console.error('Por favor, preencha todos os campos!');
    }
  }

  selecionarSintomas(id: string, sintoma: Sintoma) {
    this.sintomaSelecionadaId = id;
    this.sintomaSelecionado = sintoma.sintoma;
    this.intensidade = sintoma.intensidade;
    this.dataSintoma = sintoma.data;
  }

  excluirSintoma(index: number) {
    this.sintomasService.deleteSintoma(this.sintomas[index].id).then(() => {
      console.log('Sintoma excluído com sucesso!');
      this.limparCampos();
    });
  }

  registrarPressao() {
    if (this.dataPressao && this.pressaoDiastolica !== null && this.pressaoSistolica !== null) {
      const registroPressao = new RegistroPressao(this.dataPressao, this.pressaoDiastolica, this.pressaoSistolica);
      if (this.pressaoSelecionadaId) {
        this.sintomasService.updateRegistroPressao(this.pressaoSelecionadaId, registroPressao).then(() => {
          console.log('Pressão atualizada com sucesso!');
          this.limparCampos();
        });
      } else {
        this.sintomasService.addRegistroPressao(registroPressao).then(() => {
          console.log('Pressão adicionada com sucesso!');
          this.limparCampos();
        });
      }
    } else {
      console.error('Por favor, preencha todos os campos!');
    }
  }

  excluirPressao(index: number) {
    this.sintomasService.deleteRegistroPressao(this.registrosPressao[index].id).then(() => {
      console.log('Pressão excluída com sucesso!');
      this.limparCampos();
    });
  }

  registrarDiabetes() {
    if (this.dataDiabetes && this.nivelGlicose !== null) {
      const registroDiabetes = new RegistroDiabetes(this.dataDiabetes, this.nivelGlicose);
      if (this.diabeteSelecionadaId) {
        this.sintomasService.updateRegistroDiabetes(this.diabeteSelecionadaId, registroDiabetes).then(() => {
          console.log('Diabetes atualizado com sucesso!');
          this.limparCampos();
        });
      } else {
        this.sintomasService.addRegistroDiabetes(registroDiabetes).then(() => {
          console.log('Diabetes adicionado com sucesso!');
          this.limparCampos();
        });
      }
    } else {
      console.error('Por favor, preencha todos os campos!');
    }
  }

  excluirDiabetes(index: number) {
    this.sintomasService.deleteRegistroDiabetes(this.registrosDiabetes[index].id).then(() => {
      console.log('Registro de diabetes excluído com sucesso!');
      this.limparCampos();
    });
  }

  limparCampos() {
    this.sintomaSelecionado = '';
    this.sintomaPersonalizado = '';
    this.intensidade = '';
    this.dataSintoma = this.dataAtual;
    this.pressaoSistolica = null;
    this.pressaoDiastolica = null;
    this.nivelGlicose = null;
    this.sintomaSelecionadaId = null;
    this.pressaoSelecionadaId = null;
    this.diabeteSelecionadaId = null;
  }


  onSegmentChange(event: any) {
    this.formularioTipo = event.detail.value; // Atualiza o tipo de formulário baseado na seleção
  }

}

