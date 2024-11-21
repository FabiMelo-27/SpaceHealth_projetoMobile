import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async signUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "As senhas não coincidem!";
      return;
    }

    try {
      await this.authService.createUser(this.email, this.password);
      this.router.navigate(['/dashboard']);  // Redireciona após o cadastro
    } catch (error) {
      console.error('Erro ao registrar:', error);
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Erro desconhecido ao criar conta.';
      }
      this.presentToast(this.errorMessage);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
