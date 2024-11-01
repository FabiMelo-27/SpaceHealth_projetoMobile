import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service'; // Corrigido: adicionado "from"

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nome: string = "";
  telefone: number | null = null;
  dataNascimento: string | null = null; // Corrigido: alterado para string se a data for formatada
  email: string = "";
  planoSaude: string = "";
  tipoPlano: string = "";
  novoMedicamento: string = "";
  novaPatologia: string = "";
  alergias: string = "";
  outrosDados: string = "";
  contatoNome: string = "";
  contatoTelefone: string = "";
  contatoParentesco: string = "";
  perfil: { id: string, data: Perfil }[] = [];
  perfilSelecionadaId: string | null = null; // Adicionado para evitar erros

  form: FormGroup;
  isEditing: boolean = false;

  patologiasDisponiveis = [
    'Hipertensão',
    'Diabetes',
    'Asma',
    'Alergia alimentar',
    'Outras'
  ];

  medicamentosDisponiveis = [
    'Paracetamol',
    'Ibuprofeno',
    'Aspirina',
    'Metformina',
    'Losartana',
    'Outros'
  ];

  patologiasSelecionadas: string[] = [];
  medicamentosSelecionados: string[] = [];
  contatosEmergencia: { nome: string; telefone: string; parentesco: string }[] = [];

  constructor(private perfilService: PerfilService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      // Inicialização do formulário
      nome: [''],
      telefone: [''],
      dataNascimento: [''],
      email: [''],
      planoSaude: [''],
      tipoPlano: [''],
      novoMedicamento: [''],
      novaPatologia: [''],
      contatoNome: [''],
      contatoTelefone: [''],
      contatoParentesco: ['']
    });
  }

  ngOnInit() {
    this.perfilService.getPerfil().subscribe((data) => {
      this.perfil = data;
      console.log('Dados do perfil:', this.perfil);
    });
  }




  salvarPerfil() {
    if (this.nome && this.telefone && this.dataNascimento && this.email && this.planoSaude && this.tipoPlano && this.novaPatologia && this.novoMedicamento && this.alergias && this.outrosDados && this.contatoTelefone !== null && this.contatoNome && this.contatoParentesco) { // Corrigido: condicional ajustada
      const perfil = new Perfil(this.nome, this.telefone, this.dataNascimento, this.email, this.planoSaude, this.tipoPlano, this.novaPatologia, this.novoMedicamento, this.alergias, this.outrosDados, this.contatoTelefone, this.contatoNome, this.contatoParentesco);

      if (this.perfilSelecionadaId) {
        this.perfilService.updatePerfil(this.perfilSelecionadaId, perfil).then(() => {
          console.log('Dados atualizados com sucesso!');
          this.limparCampos();
        });
      } else {
        this.perfilService.addPerfil(perfil).then(() => {
          console.log('Dados adicionados com sucesso!');
          this.limparCampos();
        });
      }
    } else {
      console.error('Por favor, preencha todos os campos!');
    }
  }

  formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}-${mes}-${ano}`;
  }

  editarPerfil() {
    this.isEditing = true;
  }

  selecionarPerfil(id: string, perfil: Perfil) {
    this.perfilSelecionadaId = id;
    this.nome = perfil.nome;
    this.telefone = perfil.telefone;
    this.dataNascimento = perfil.dataNascimento; // Se dataNascimento for uma string
    this.email = perfil.email;
    this.planoSaude = perfil.planoSaude;
    this.tipoPlano = perfil.tipoPlano;
    this.novaPatologia = perfil.novaPatologia;
    this.novoMedicamento = perfil.novoMedicamento;
    this.alergias = perfil.alergias;
    this.outrosDados = perfil.outrosDados;
    this.contatoNome = perfil.contatoNome;
    this.contatoTelefone = perfil.contatoTelefone;
    this.contatoParentesco = perfil.contatoParentesco;

    console.log('Perfil selecionado:', perfil);
  console.log('Nome:', this.nome);
  }

  // adicionarPatologia(patologia: string) {
  //   if (patologia && !this.patologiasSelecionadas.includes(patologia)) {
  //     this.patologiasSelecionadas.push(patologia);
  //     this.form.patchValue({ novaPatologia: '' });
  //   }
  // }

  // adicionarMedicamento(medicamento: string) {
  //   if (medicamento && !this.medicamentosSelecionados.includes(medicamento)) {
  //     this.medicamentosSelecionados.push(medicamento);
  //     this.form.patchValue({ novoMedicamento: '' });
  //   }
  // }

  // removerPatologia(patologia: string) {
  //   this.patologiasSelecionadas = this.patologiasSelecionadas.filter(d => d !== patologia);
  // }

  // removerMedicamento(medicamento: string) {
  //   this.medicamentosSelecionados = this.medicamentosSelecionados.filter(m => m !== medicamento);
  // }

  adicionarContatoEmergencia(nome: string, telefone: string, parentesco: string) {
    if (nome && telefone && parentesco) {
      this.contatosEmergencia.push({ nome, telefone, parentesco });
      this.form.patchValue({ contatoNome: '', contatoTelefone: '', contatoParentesco: '' });
    }
  }

  removerContatoEmergencia(contato: { nome: string; telefone: string; parentesco: string }) {
    this.contatosEmergencia = this.contatosEmergencia.filter(c => c !== contato);
  }

  excluirPerfil(id: string) {
    this.perfilService.deletePerfil(id).then(() => {
      console.log('Dados excluídos com sucesso!');
      this.limparCampos();
    });
  }

  limparCampos() { // Corrigido: função renomeada de "imparCampos" para "limparCampos"
    this.nome = '';
    this.telefone = null;
    this.dataNascimento = null;
    this.email = '';
    this.planoSaude = '';
    this.tipoPlano = '';
    this.novaPatologia = '';
    this.novoMedicamento = '';
    this.alergias = '';
    this.outrosDados = '';
    this.contatoNome = '';
    this.contatoTelefone = '';
    this.contatoParentesco = '';
    this.patologiasSelecionadas = [];
    this.medicamentosSelecionados = [];
    this.contatosEmergencia = [];
    this.isEditing = false;
    this.perfilSelecionadaId = null;
  }
}
