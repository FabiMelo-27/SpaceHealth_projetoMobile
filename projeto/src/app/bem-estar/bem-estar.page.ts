
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bem-estar',
  templateUrl: './bem-estar.page.html',
  styleUrls: ['./bem-estar.page.scss'],
})
export class BemEstarPage implements OnInit {
  peso: number = 0;
  altura: number = 0;
  imc: number = 0;
  upc: string = '';
  itemInfo: any;
  exercicio: string = '';
  caloriasQueimadas: number = 0;
  exercicioData: any;
  appId: string = 'b546ec91';
  appKey: string = '879e22e10e29d8527b13ddba2d568667';
  nomeMedicamento: string = '';

  // Lista de mensagens motivacionais
  mensagensMotivacionais: string[] = [
    'Acredite em si mesmo e todo o resto virá!',
    'Não pare até se orgulhar!',
    'A cada passo, você está mais perto do seu objetivo.',
    'Hoje é um ótimo dia para começar!',
    'Você é mais forte do que pensa.',
    'Foque no progresso, não na perfeição.',
    'Seja a melhor versão de você mesmo todos os dias.',
    'O sucesso vem de persistência e trabalho árduo.',
    'Grandes coisas nunca vêm de zonas de conforto.',
    'Não espere por uma oportunidade, crie-a.',
    'Você tem o poder de transformar sua vida.',
    'Acredite no processo e confie em sua jornada.',
    'Pequenos passos todos os dias levam a grandes conquistas.',
    'O único limite é você mesmo.',
    'A verdadeira mudança começa de dentro para fora.',
    'Não olhe para trás, você não está indo naquela direção.',
    'O fracasso não é o oposto do sucesso, é parte dele.',
    'Sua única competição é você mesmo.',
    'Nunca desista de algo que você realmente quer.',
    'Os desafios fazem parte da jornada, não desista.',
    'A jornada é tão importante quanto o destino.',
    'Você é capaz de mais do que imagina.',
    'O melhor ainda está por vir.',
    'Se você pode sonhar, você pode realizar.',
    'Acredite em suas habilidades e veja os resultados.',
    'A persistência é o caminho do sucesso.',
    'Seu esforço de hoje determinará seu sucesso amanhã.',
    'Ação é a chave para o sucesso.',
    'Seja paciente, as coisas boas vêm com o tempo.',
    'Não importa a velocidade, o importante é não parar.',
    'Cada dia é uma nova oportunidade.',
    'Não tenha medo de recomeçar.',
    'O sucesso é a soma de pequenos esforços repetidos.',
    'Coragem é estar disposto a tentar.',
    'Acredite no impossível e ele se tornará possível.',
    'Hoje é o dia perfeito para começar.',
    'Não pare até estar orgulhoso.',
    'Seja você mesmo, todos os outros já existem.',
    'Você é mais forte do que qualquer obstáculo.',
    'Poderoso é aquele que nunca desiste.',
    'Não há limites para o que você pode conquistar.',
    'Vença seus medos e alcance seus sonhos.',
    'Sua atitude determina sua direção.',
    'Os sonhos não têm prazo de validade.',
    'Não importa onde você está, mas onde você vai.',
    'O sucesso não é final, o fracasso não é fatal: o que conta é a coragem de continuar.',
    'Você pode não ver os resultados agora, mas está indo bem.',
    'Nunca desista de algo que você não pode passar um dia sem pensar.',
    'Cada desafio é uma oportunidade para aprender.',
    'Tenha fé no seu potencial, ele é ilimitado.',
    'Acredite no seu esforço e no seu trabalho.',
    'Cada passo é uma conquista.',
    'Seu esforço será recompensado em breve.',
    'Acredite que você pode e você já está no meio do caminho.'
  ];

  // Lista de dicas de saúde
  dicasSaude: string[] = [
    'Beba pelo menos 2 litros de água por dia.',
    'Durma de 7 a 9 horas todas as noites para recuperação do corpo.',
    'Coma mais alimentos frescos e naturais, como frutas e vegetais.',
    'Pratique atividades físicas regularmente, pelo menos 3 vezes por semana.',
    'Faça pausas durante o dia para alongar o corpo e evitar dores musculares.',
    'Evite o consumo excessivo de açúcar para manter a saúde em dia.',
    'Faça exames regulares para monitorar sua saúde.',
    'Evite o consumo de alimentos ultraprocessados e fast food.',
    'Pratique meditação ou mindfulness para reduzir o estresse.',
    'Evite o consumo excessivo de álcool e cigarro.',
    'Inclua fibras na sua alimentação para melhorar a digestão.',
    'Coma porções menores, mas com maior frequência, para melhorar o metabolismo.',
    'Não pule refeições, especialmente o café da manhã.',
    'Mantenha um peso saudável para prevenir doenças.',
    'Evite alimentos ricos em gorduras saturadas e trans.',
    'Realize atividades ao ar livre para aproveitar a vitamina D.',
    'Mantenha-se ativo mentalmente, lendo ou aprendendo algo novo.',
    'Pratique exercícios de alongamento para manter a flexibilidade.',
    'Consuma alimentos ricos em antioxidantes para combater os radicais livres.',
    'Evite o estresse, pois ele pode prejudicar sua saúde mental e física.',
    'Inclua proteínas magras na sua alimentação para fortalecer músculos.',
    'Beba chá verde, que possui propriedades antioxidantes.',
    'Aumente o consumo de cálcio para garantir ossos saudáveis.',
    'Pratique a higiene adequada, lavando as mãos regularmente.',
    'Faça atividades que tragam prazer para sua saúde mental.',
    'Evite dietas restritivas sem acompanhamento profissional.',
    'Mantenha sua saúde bucal em dia, escovando os dentes após as refeições.',
    'Evite o sedentarismo, levante-se regularmente durante o trabalho.',
    'Mantenha uma rotina de cuidados com a pele, protegendo-se do sol.',
    'Faça exames de saúde preventiva para identificar doenças precocemente.',
    'Realize atividades que ajudem a melhorar sua postura.',
    'Mantenha-se conectado com pessoas queridas para saúde emocional.',
    'Inclua peixes ricos em ômega-3 na alimentação para a saúde do coração.',
    'Pratique a gratidão diariamente para melhorar a saúde mental.',
    'Evite consumir cafeína antes de dormir para garantir uma boa noite de sono.',
    'Realize atividades físicas em ambientes naturais para relaxar a mente.',
    'Não se esqueça de tomar suplementos vitamínicos quando necessário.',
    'Use protetor solar para evitar o envelhecimento precoce da pele.',
    'Tenha um horário fixo para dormir, criando uma rotina de sono saudável.',
    'Se sentir alguma dor, não ignore, procure orientação médica.',
    'Alimente-se de forma equilibrada, incluindo todas as vitaminas e minerais essenciais.',
    'Cuidado com o consumo excessivo de carboidratos simples.',
    'Inclua alimentos anti-inflamatórios na sua alimentação, como cúrcuma e gengibre.',
    'Pratique a respiração profunda para reduzir o estresse.',
    'Tire um tempo para descansar e recuperar sua energia.',
    'Evite o consumo excessivo de sal para manter a pressão arterial equilibrada.',
    'Aproveite a luz do sol para melhorar o humor e a saúde mental.'
  ];

  mensagemMotivacional: string = '';
  dicaSaude: string = '';

  constructor(private alertController: AlertController, private http: HttpClient) {}

  ngOnInit() {
    this.obterMensagemMotivacional(); // Carrega uma mensagem motivacional e uma dica de saúde ao iniciar a página
  }

  // Função para obter uma mensagem motivacional e uma dica de saúde aleatórias
  obterMensagemMotivacional() {
    this.mensagemMotivacional = this.obterMensagemAleatoria(this.mensagensMotivacionais);
    this.dicaSaude = this.obterMensagemAleatoria(this.dicasSaude);
  }

  // Função para obter uma mensagem aleatória de uma lista
  obterMensagemAleatoria(lista: string[]): string {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
  }

  calcularIMC() {
    if (this.peso && this.altura) {
      this.imc = this.peso / ((this.altura / 100) ** 2);
    }
  }

  getImcClassification(): string {
    if (this.imc < 18.5) return 'Abaixo do peso';
    if (this.imc < 24.9) return 'Peso normal';
    if (this.imc < 29.9) return 'Sobrepeso';
    return 'Obesidade';
  }

  async apresentarAlerta(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  }

  calcularExercicio() {
    if (this.exercicio) {
      const url = `https://trackapi.nutritionix.com/v2/natural/exercise`;
      const body = { query: this.exercicio };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-app-id': this.appId,
        'x-app-key': this.appKey,
      });

      this.http.post(url, body, { headers }).subscribe(
        (response: any) => {
          if (response.exercises && response.exercises.length > 0) {
            const exerciseData = response.exercises[0];
            this.caloriasQueimadas = exerciseData.nf_calories || 0;
            this.exercicioData = exerciseData;
            console.log('Informações do exercício:', exerciseData);
          } else {
            this.apresentarAlerta('Exercício não encontrado');
          }
        },
        (error) => {
          console.error('Erro ao calcular exercício:', error);
        }
      );
    }
  }

  buscarMedicamentos(medicamento: string) {
    const url = `https://api.fda.gov/drug/label.json?search=${medicamento}&limit=1`;

    this.http.get(url).subscribe(
      (response: any) => {
        console.log(response);
        if (response.results && response.results.length > 0) {
          const infoMedicamento = response.results[0];
          this.showAlert(infoMedicamento.openfda.brand_name, infoMedicamento.description);
        } else {
          this.apresentarAlerta('Medicamento não encontrado');
        }
      },
      (error) => {
        console.error('Erro ao buscar informações do medicamento:', error);
        this.apresentarAlerta('Falha na busca');
      }
    );
  }

  async showAlert(nomeMedicamento: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: `Medicamento: ${nomeMedicamento}`,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
}
