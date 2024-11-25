
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  // Método de login com e-mail e senha
  async login() {
    this.email = this.email.trim();

    if (!this.isValidEmail(this.email)) {
      this.presentToast('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/dashboard']); // Redireciona para o dashboard
    } catch (error: any) { // Aqui especificamos que o erro é de tipo `any`
      console.error('Erro de login:', error);
      if (error.code === 'auth/user-not-found') {
        this.registerUser(); // Registra usuário se não encontrado
      } else {
        // this.presentToast('E-mail ou senha inválidos. Verifique suas credenciais e tente novamente. Caso não tenha cadastro, crie sua conta.');
         // Exibe o primeiro toast
  this.presentToast('E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.')
  .then(() => {
    // Aguarda um pequeno intervalo e exibe o segundo toast
    setTimeout(() => {
      this.presentToast('Caso não tenha cadastro, crie sua conta.');
    }, 2000); // Intervalo de 2 segundos entre os toasts
  });
      }
    }
  }

  // Método de login com Google
  googleLogin() {
    this.authService.googleLogin()
      .then((userCredential) => {
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard após login bem-sucedido
        this.presentToast('Login com Google bem-sucedido!');
      })
      .catch((error: any) => { // Aqui também especificamos que o erro é de tipo `any`
        console.error('Erro no login com Google:', error);
        this.presentToast('Erro ao realizar login com Google.');
      });
  }

  // Função para redirecionar para a tela de cadastro
  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  // Função de registro de novo usuário caso não exista
  async registerUser() {
    try {
      await this.authService.createUser(this.email, this.password);
      this.presentToast('Cadastro bem-sucedido! Você foi registrado automaticamente.');
      this.router.navigate(['/dashboard']); // Redireciona para o dashboard após o cadastro
    } catch (error: any) { // Aqui também especificamos que o erro é de tipo `any`
      console.error('Erro ao registrar:', error);
      this.presentToast('Erro ao criar conta: ' + error.message);
    }
  }

  // Exibir mensagem via toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Função de validação do formato do e-mail
  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Limpar campos de input
  clearFields() {
    this.email = '';
    this.password = '';
  }
}

