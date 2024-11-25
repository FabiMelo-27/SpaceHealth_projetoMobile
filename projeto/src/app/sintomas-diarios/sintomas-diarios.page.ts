import { Component, OnInit } from '@angular/core';
import { SintomasService } from '../services/sintomas.service';
import { Sintoma } from './../models/sintoma';
import { RegistroPressao } from './../models/registro-pressao';
import { RegistroDiabetes } from './../models/registro-diabetes';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

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

  userId: string | null = null;  // Variável para armazenar o ID do usuário logado

  sintomasComuns: string[] = [
    'Azia', 'Calafrios', 'Constipação', 'Cólica', 'Cólica Menstrual', 'Diarreia', 'Dor de barriga', 'Dor de cabeça',
    'Dor de Garganta', 'Dor no peito', 'Dor abdominal', 'Dor nas articulações', 'Fadiga', 'Falta de ar', 'Febre', 'Gases',
    'Náusea', 'Tontura', 'Tosse seca', 'Tosse com catarro', 'Dificuldade para respirar', 'Congestão nasal', 'Vômito'
  ];

  sintomaSelecionadaId: string | null = null;
  pressaoSelecionadaId: string | null = null;
  diabeteSelecionadaId: string | null = null;

  constructor(
    private sintomasService: SintomasService,
    private afAuth: AngularFireAuth,      // Injeção do serviço de autenticação Firebase
    private platform: Platform,
  ) {}

  // Função para verificar a situação da pressão arterial
  verificarPressao(sistolica: number, diastolica: number) {
    if (sistolica !== null && diastolica !== null) {
      if (sistolica >= 140 || diastolica >= 90) {
        return 'Pressão muito alta - Procure ajuda médica!';
      } else if ((sistolica >= 130 && sistolica < 140) || (diastolica >= 80 && diastolica < 90)) {
        return 'Pressão alta - Procure se cuidar!';
      } else if (sistolica >= 120 && sistolica < 130 && diastolica < 80) {
        return 'Pressão alta - Fique atento!';
      }
    }
    return '';  // Se estiver tudo normal, retorna vazio
  }

  // Função para verificar a situação do diabetes
  verificarDiabetes(glicose: number) {
    if (glicose !== null) {
      if (glicose >= 126) {
        return 'Glicose muito alta - Procure ajuda médica!';
      } else if (glicose >= 100 && glicose < 126) {
        return 'Glicose alta - Cuidado com sua alimentação!';
      }
    }
    return '';  // Se estiver tudo normal, retorna vazio
  }

  ngOnInit(): void {
    // Verificar o usuário logado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;  // Armazenar o ID do usuário logado
        this.loadUserData();  // Carregar os dados associados ao usuário logado
      }
    });
  }

  // Carregar os dados do usuário logado
  loadUserData() {
    if (this.userId) {
      this.sintomasService.getSintomasByUser(this.userId).subscribe((data) => {
        this.sintomas = data || [];
      });
      this.sintomasService.getRegistrosPressaoByUser(this.userId).subscribe((data) => {
        this.registrosPressao = data || [];
      });
      this.sintomasService.getRegistrosDiabetesByUser(this.userId).subscribe((data) => {
        this.registrosDiabetes = data || [];
      });
    }
  }

  registrarSintomas() {
    if (this.sintomaSelecionado && this.intensidade && this.dataSintoma && this.userId) {
      const sintoma = new Sintoma(this.sintomaSelecionado, this.intensidade, this.dataSintoma);
      if (this.sintomaSelecionadaId) {
        this.sintomasService.updateSintoma(this.sintomaSelecionadaId, sintoma, this.userId).then(() => {
          console.log('Sintoma atualizado com sucesso!');
          this.limparCampos();
        });
      } else {
        this.sintomasService.addSintoma(sintoma, this.userId).then(() => {
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
    if (this.userId) {
      this.sintomasService.deleteSintoma(this.sintomas[index].id, this.userId).then(() => {
        console.log('Sintoma excluído com sucesso!');
        this.limparCampos();
      });
    }
  }

  registrarPressao() {
    if (this.dataPressao && this.pressaoSistolica !== null && this.pressaoDiastolica !== null && this.userId) {
      const registroPressao = new RegistroPressao(this.dataPressao, this.pressaoSistolica, this.pressaoDiastolica);
      if (this.pressaoSelecionadaId) {
        this.sintomasService.updateRegistroPressao(this.pressaoSelecionadaId, registroPressao, this.userId).then(() => {
          console.log('Pressão atualizada com sucesso!');
          this.limparCampos();
        });
      } else {
        this.sintomasService.addRegistroPressao(registroPressao, this.userId).then(() => {
          console.log('Pressão adicionada com sucesso!');
          this.limparCampos();
        });
      }
    } else {
      console.error('Por favor, preencha todos os campos!');
    }
  }

  excluirPressao(index: number) {
    if (this.userId) {
      this.sintomasService.deleteRegistroPressao(this.registrosPressao[index].id, this.userId).then(() => {
        console.log('Pressão excluída com sucesso!');
        this.limparCampos();
      });
    }
  }

  registrarDiabetes() {
    if (this.dataDiabetes && this.nivelGlicose !== null && this.userId) {
      const registroDiabetes = new RegistroDiabetes(this.dataDiabetes, this.nivelGlicose);
      if (this.diabeteSelecionadaId) {
        this.sintomasService.updateRegistroDiabetes(this.diabeteSelecionadaId, registroDiabetes, this.userId).then(() => {
          console.log('Diabetes atualizado com sucesso!');
          this.limparCampos();
        });
      } else {
        this.sintomasService.addRegistroDiabetes(registroDiabetes, this.userId).then(() => {
          console.log('Diabetes adicionado com sucesso!');
          this.limparCampos();
        });
      }
    } else {
      console.error('Por favor, preencha todos os campos!');
    }
  }

  excluirDiabetes(index: number) {
    if (this.userId) {
      this.sintomasService.deleteRegistroDiabetes(this.registrosDiabetes[index].id, this.userId).then(() => {
        console.log('Registro de diabetes excluído com sucesso!');
        this.limparCampos();
      });
    }
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


     // Função para gerar o PDF
     gerarPDF() {
      const doc = new jsPDF();

      // Definir o título do documento
      doc.setFontSize(14);
      doc.text('Relatório de Saúde', 20, 20);

      let yOffset = 30;  // Posição inicial para o primeiro conteúdo

      // Adicionando uma linha em branco antes dos títulos
      doc.text('', 20, yOffset);  // Linha em branco
      yOffset += 10;

      // Adicionando dados de Sintomas
      doc.setFontSize(12);
      doc.text('Sintomas Registrados', 20, yOffset);
      yOffset += 10; // Pular uma linha antes do conteúdo
      doc.setFontSize(11);

      if (this.sintomas.length > 0) {
        this.sintomas.forEach(sintoma => {
          const sintomaTexto = sintoma.data.sintoma || 'Desconhecido';
          const intensidadeTexto = sintoma.data.intensidade || 'Desconhecida';
          const dataTexto = sintoma.data.data || 'Desconhecida';

          doc.text(`Sintoma: ${sintomaTexto}`, 20, yOffset);
          doc.text(`Intensidade: ${intensidadeTexto}`, 20, yOffset + 10);
          doc.text(`Data: ${dataTexto}`, 20, yOffset + 20);
          yOffset += 30;  // Espaço para o próximo sintoma

          // Adicionando uma linha de separação após cada registro de sintoma
          doc.line(20, yOffset, 180, yOffset);  // Linha de separação
          yOffset += 10;  // Espaçamento após a linha
        });
      } else {
        doc.text('Nenhum sintoma registrado.', 20, yOffset);
        yOffset += 10;
      }

      // Adicionar uma linha em branco entre os grupos de dados
      doc.text('', 20, yOffset);  // Linha em branco entre grupos
      yOffset += 10;

      // Adicionando dados de Pressão
      doc.setFontSize(12);
      doc.text('Pressão Arterial Registrada', 20, yOffset);
      yOffset += 10;  // Pular uma linha antes do conteúdo
      doc.setFontSize(11);

      if (this.registrosPressao.length > 0) {
        this.registrosPressao.forEach(registro => {
          const sistolica = registro.data.pressaoSistolica || 'Desconhecida';
          const diastolica = registro.data.pressaoDiastolica || 'Desconhecida';
          const data =  registro.data.data || 'Desconhecida';

          doc.text(`Sistólica: ${sistolica}`, 20, yOffset);
          doc.text(`Diastólica: ${diastolica}`, 20, yOffset + 10);
          doc.text(`Data: ${data}`, 20, yOffset + 20);
          yOffset += 30;  // Espaço para o próximo registro de pressão

          // Adicionando uma linha de separação após o registro de pressão
          doc.line(20, yOffset, 180, yOffset);  // Linha de separação
          yOffset += 10;  // Espaçamento após a linha
        });
      } else {
        doc.text('Nenhuma pressão registrada.', 20, yOffset);
        yOffset += 10;
      }

      // Adicionar uma linha em branco entre os grupos de dados
      doc.text('', 20, yOffset);  // Linha em branco entre grupos
      yOffset += 10;

      // Adicionando dados de Diabetes
      doc.setFontSize(12);
      doc.text('Níveis de Glicose Registrados (Diabetes)', 20, yOffset);
      yOffset += 10;  // Pular uma linha antes do conteúdo
      doc.setFontSize(11);

      if (this.registrosDiabetes.length > 0) {
        this.registrosDiabetes.forEach(registro => {
          const nivelGlicose = registro.data.nivelGlicose|| 'Desconhecido';
          const data = registro.data.data || 'Desconhecida';

          doc.text(`Nível de Glicose: ${nivelGlicose}`, 20, yOffset);
          doc.text(`Data: ${data}`, 20, yOffset + 10);
          yOffset += 30;  // Espaço para o próximo registro de diabetes

          // Adicionando uma linha de separação após o registro de diabetes
          doc.line(20, yOffset, 180, yOffset);  // Linha de separação
          yOffset += 10;  // Espaçamento após a linha
        });
      } else {
        doc.text('Nenhum registro de glicose encontrado.', 20, yOffset);
        yOffset += 10;
      }

      // Gerar e salvar o PDF dependendo da plataforma
      this.salvarPDF(doc);
    }

    // Função para salvar o PDF
    salvarPDF(doc: jsPDF) {
      if (this.platform.is('android')) {
        // Salvar PDF no dispositivo Android
        const pdfBase64 = doc.output('datauristring');
        Filesystem.writeFile({
          path: 'relatorio-saude.pdf',
          data: pdfBase64.split(',')[1], // Remove o prefixo "data:application/pdf;base64,"
          directory: Directory.Documents
        }).then(result => {
          console.log('PDF salvo em Android:', result.uri);
        }).catch(error => {
          console.error('Erro ao salvar PDF:', error);
        });
      } else {
        // No navegador, tenta salvar diretamente
        try {
          doc.save('relatorio-saude.pdf');
        } catch (error) {
          console.error('Erro ao salvar PDF no navegador:', error);

          // Caso o doc.save() falhe, criar um link manual para download
          const pdfBlob = doc.output('blob');
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = 'relatorio-saude.pdf';
          link.click();  // Acionar o download
          URL.revokeObjectURL(link.href);  // Limpar o objeto URL após o download
        }
      }
    }
  }
