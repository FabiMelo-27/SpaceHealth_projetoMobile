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

  constructor(private alertController: AlertController, private http: HttpClient) {}

  ngOnInit() {
    console.log('Teste');
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
