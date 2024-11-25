import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage {
  email: string = '';


  constructor(
    private toastController: ToastController, // Para mostrar as mensagens de erro e sucesso
    private router: Router // Para navegar entre as páginas
  ) {}

  async enviarLinkRecuperacao() {
    if (!this.email) {
      const toast = await this.toastController.create({
        message: 'Por favor, insira seu e-mail.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    try {
      const auth = getAuth(); // Obtendo a instância de autenticação
      await sendPasswordResetEmail(auth, this.email); // Enviando o link de recuperação
      const toast = await this.toastController.create({
        message: 'Link de redefinição de senha enviado!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/login']); // Redireciona para a página de login após o envio
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Erro ao enviar o link. Tente novamente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
