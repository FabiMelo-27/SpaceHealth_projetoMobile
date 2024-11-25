// import { Component, OnInit } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Perfil } from '../models/perfil';
// import { PerfilService } from '../services/perfil.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { jsPDF } from 'jspdf';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


// @Component({
//   selector: 'app-perfil',
//   templateUrl: './perfil.page.html',
//   styleUrls: ['./perfil.page.scss'],
// })
// export class PerfilPage implements OnInit {
//   nome: string = "";
//   telefone: string = "";
//   dataNascimento: string = "";
//   email: string = "";
//   planoSaude: string = "";
//   tipoPlano: string = "";
//   novoMedicamento: string = "";
//   novaPatologia: string = "";
//   alergias: string = "";
//   tipoSanguineo: string = "";
//   cirurgiasRealizadas: string = "";
//   outrosDados: string = "";
//   contatoNome: string = "";
//   contatoTelefone: string = "";
//   contatoParentesco: string = "";
//   perfil: { id: string, data: Perfil }[] = [];
//   perfilSelecionadaId: string | null = null;
//   contatosEmergencia: { nome: string; telefone: string; parentesco: string }[] = [];

//   form: FormGroup;
//   isEditing: boolean = false;

//   constructor(
//     private perfilService: PerfilService,
//     private formBuilder: FormBuilder,
//     private afAuth: AngularFireAuth
//   ) {
//     this.form = this.formBuilder.group({
//       nome: [''],
//       telefone: [''],
//       dataNascimento: [''],
//       email: [''],
//       planoSaude: [''],
//       tipoPlano: [''],
//       novoMedicamento: [''],
//       novaPatologia: [''],
//       tipoSanguineo: [''],
//       cirurgiasRealizadas: [''],
//       alergias: [''],
//       outrosDados: [''],
//       contatoNome: [''],
//       contatoTelefone: [''],
//       contatoParentesco: ['']
//     });
//   }

//   ngOnInit() {
//     this.afAuth.user.subscribe((user) => {
//       if (user) {
//         this.perfilService.getUserPerfil(user.uid).subscribe((data) => {
//           this.perfil = data;
//           console.log('Dados do perfil:', this.perfil);
//         });
//       }
//     });
//   }

//   salvarPerfil() {
//     this.afAuth.user.subscribe((user) => {
//       if (user) {
//         const perfil = new Perfil(
//           this.nome,
//           this.telefone,
//           this.dataNascimento,
//           this.email,
//           this.planoSaude,
//           this.tipoPlano,
//           this.novaPatologia,
//           this.novoMedicamento,
//           this.alergias,
//           this.tipoSanguineo,
//           this.cirurgiasRealizadas,
//           this.outrosDados,
//           this.contatoTelefone,
//           this.contatoNome,
//           this.contatoParentesco,
//           user.uid // Adiciona o userId do usuário logado
//         );

//         if (this.perfilSelecionadaId) {
//           this.perfilService.updatePerfil(this.perfilSelecionadaId, perfil).then(() => {
//             console.log('Dados atualizados com sucesso!');
//             this.limparCampos();
//           });
//         } else {
//           this.perfilService.addPerfil(perfil).then(() => {
//             console.log('Dados adicionados com sucesso!');
//             this.limparCampos();
//           });
//         }
//       }
//     });
//   }

//   formatarData(data: string): string {
//     const [ano, mes, dia] = data.split('-');
//     return `${dia}-${mes}-${ano}`;
//   }

//   editarPerfil() {
//     this.isEditing = true;
//   }

//   selecionarPerfil(id: string, perfil: Perfil) {
//     this.perfilSelecionadaId = id;
//     this.nome = perfil.nome;
//     this.telefone = perfil.telefone;
//     this.dataNascimento = perfil.dataNascimento;
//     this.email = perfil.email;
//     this.planoSaude = perfil.planoSaude;
//     this.tipoPlano = perfil.tipoPlano;
//     this.novaPatologia = perfil.novaPatologia;
//     this.novoMedicamento = perfil.novoMedicamento;
//     this.alergias = perfil.alergias;
//     this.tipoSanguineo = perfil.tipoSanguineo;
//     this.cirurgiasRealizadas = perfil.cirurgiasRealizadas;
//     this.outrosDados = perfil.outrosDados;
//     this.contatoNome = perfil.contatoNome;
//     this.contatoTelefone = perfil.contatoTelefone;
//     this.contatoParentesco = perfil.contatoParentesco;
//   }

//   excluirPerfil(id: string) {
//     this.perfilService.deletePerfil(id).then(() => {
//       console.log('Dados excluídos com sucesso!');
//       this.limparCampos();
//     });
//   }

//   limparCampos() {
//     this.nome = '';
//     this.telefone = "";
//     this.dataNascimento = "";
//     this.email = '';
//     this.planoSaude = '';
//     this.tipoPlano = '';
//     this.novaPatologia = '';
//     this.novoMedicamento = '';
//     this.alergias = '';
//     this.tipoSanguineo = '';
//     this.cirurgiasRealizadas = '';
//     this.outrosDados = '';
//     this.contatoNome = '';
//     this.contatoTelefone = '';
//     this.contatoParentesco = '';
//     this.isEditing = false;
//     this.perfilSelecionadaId = null;
//   }

//   // Função para gerar o PDF
//   gerarPDF() {
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.text('Dados do Perfil', 20, 20);

//     const dados = this.perfil[0].data;
//     let yOffset = 30;

//     const camposOrdem = [
//       'nome', 'telefone', 'dataNascimento', 'email', 'planoSaude',
//       'tipoPlano', 'novaPatologia', 'novoMedicamento', 'alergias',
//       'tipoSanguineo', 'cirurgiasRealizadas', 'outrosDados',
//       'contatoNome', 'contatoTelefone', 'contatoParentesco',
//     ];

//     camposOrdem.forEach((campo) => {
//       const valor = dados[campo as keyof Perfil] || 'Sem dados';
//       const label = campo.replace(/([A-Z])/g, ' $1').toUpperCase();
//       doc.text(`${label}: ${valor}`, 20, yOffset);
//       yOffset += 10;
//     });

//     // Gerar PDF em Base64 (string codificada)
//     const pdfBase64 = doc.output('datauristring');

//     // Salvar o PDF no dispositivo com a string Base64
//     Filesystem.writeFile({
//       path: 'perfil-dados.pdf',
//       data: pdfBase64.split(',')[1], // Remove o prefixo "data:application/pdf;base64,"
//       directory: Directory.Documents
//     }).then(result => {
//       console.log('PDF salvo em: ', result.uri);
//       // Você pode abrir ou compartilhar o arquivo aqui
//     }).catch(error => {
//       console.error('Erro ao salvar PDF: ', error);
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../services/perfil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nome: string = "";
  telefone: string = "";
  dataNascimento: string = "";
  email: string = "";
  planoSaude: string = "";
  tipoPlano: string = "";
  novoMedicamento: string = "";
  novaPatologia: string = "";
  alergias: string = "";
  tipoSanguineo: string = "";
  cirurgiasRealizadas: string = "";
  outrosDados: string = "";
  contatoNome: string = "";
  contatoTelefone: string = "";
  contatoParentesco: string = "";
  perfil: { id: string, data: Perfil }[] = [];
  perfilSelecionadaId: string | null = null;
  contatosEmergencia: { nome: string; telefone: string; parentesco: string }[] = [];

  form: FormGroup;
  isEditing: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) {
    this.form = this.formBuilder.group({
      nome: [''],
      telefone: [''],
      dataNascimento: [''],
      email: [''],
      planoSaude: [''],
      tipoPlano: [''],
      novoMedicamento: [''],
      novaPatologia: [''],
      tipoSanguineo: [''],
      cirurgiasRealizadas: [''],
      alergias: [''],
      outrosDados: [''],
      contatoNome: [''],
      contatoTelefone: [''],
      contatoParentesco: ['']
    });
  }

  ngOnInit() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.perfilService.getUserPerfil(user.uid).subscribe((data) => {
          this.perfil = data;
          console.log('Dados do perfil:', this.perfil);
        });
      }
    });
  }

  salvarPerfil() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        const perfil = new Perfil(
          this.nome,
          this.telefone,
          this.dataNascimento,
          this.email,
          this.planoSaude,
          this.tipoPlano,
          this.novaPatologia,
          this.novoMedicamento,
          this.alergias,
          this.tipoSanguineo,
          this.cirurgiasRealizadas,
          this.outrosDados,
          this.contatoTelefone,
          this.contatoNome,
          this.contatoParentesco,
          user.uid // Adiciona o userId do usuário logado
        );

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
      }
    });
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
    this.dataNascimento = perfil.dataNascimento;
    this.email = perfil.email;
    this.planoSaude = perfil.planoSaude;
    this.tipoPlano = perfil.tipoPlano;
    this.novaPatologia = perfil.novaPatologia;
    this.novoMedicamento = perfil.novoMedicamento;
    this.alergias = perfil.alergias;
    this.tipoSanguineo = perfil.tipoSanguineo;
    this.cirurgiasRealizadas = perfil.cirurgiasRealizadas;
    this.outrosDados = perfil.outrosDados;
    this.contatoNome = perfil.contatoNome;
    this.contatoTelefone = perfil.contatoTelefone;
    this.contatoParentesco = perfil.contatoParentesco;
  }

  excluirPerfil(id: string) {
    this.perfilService.deletePerfil(id).then(() => {
      console.log('Dados excluídos com sucesso!');
      this.limparCampos();
    });
  }

  limparCampos() {
    this.nome = '';
    this.telefone = "";
    this.dataNascimento = "";
    this.email = '';
    this.planoSaude = '';
    this.tipoPlano = '';
    this.novaPatologia = '';
    this.novoMedicamento = '';
    this.alergias = '';
    this.tipoSanguineo = '';
    this.cirurgiasRealizadas = '';
    this.outrosDados = '';
    this.contatoNome = '';
    this.contatoTelefone = '';
    this.contatoParentesco = '';
    this.isEditing = false;
    this.perfilSelecionadaId = null;
  }

  // Função para gerar o PDF
  gerarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Dados do Perfil', 20, 20);

    const dados = this.perfil[0].data;
    let yOffset = 30;

    const camposOrdem = [
      'nome', 'telefone', 'dataNascimento', 'email', 'planoSaude',
      'tipoPlano', 'novaPatologia', 'novoMedicamento', 'alergias',
      'tipoSanguineo', 'cirurgiasRealizadas', 'outrosDados',
      'contatoNome', 'contatoTelefone', 'contatoParentesco',
    ];

    camposOrdem.forEach((campo) => {
      const valor = dados[campo as keyof Perfil] || 'Sem dados';
      const label = campo.replace(/([A-Z])/g, ' $1').toUpperCase();
      doc.text(`${label}: ${valor}`, 20, yOffset);
      yOffset += 10;
    });

    // Verificar se estamos no navegador
    if (typeof window !== 'undefined' && window.document) {
      // No navegador, podemos gerar e exibir o PDF diretamente
      doc.save('perfil-dados.pdf');
    } else {
      // Em dispositivos móveis, salva o PDF no diretório de documentos
      const pdfBase64 = doc.output('datauristring');  // Gerar PDF como string Base64

      Filesystem.writeFile({
        path: 'perfil-dados.pdf',
        data: pdfBase64.split(',')[1], // Remove o prefixo "data:application/pdf;base64,"
        directory: Directory.Documents
      }).then(result => {
        console.log('PDF salvo em: ', result.uri);
      }).catch(error => {
        console.error('Erro ao salvar PDF: ', error);
      });
    }
  }
}
