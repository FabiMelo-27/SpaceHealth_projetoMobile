// import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   email: string ='';
//   password: string ='';

//   constructor(private authService: AuthService) {}

//   login() {
//     this.authService.login(this.email, this.password);
//   }

//   googleLogin() {
//     this.authService.googleLogin();
//   }
// }


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

  async login() {
    // Remova espaços em branco do e-mail
    this.email = this.email.trim();

    // Validação do e-mail
    if (!this.isValidEmail(this.email)) {
      this.presentToast('Por favor, insira um e-mail válido.');
      return;
    }

    console.log('Email:', this.email); // Debugging

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login error:', error); // Log do erro
      this.presentToast('E-mail ou senha incorretos. Tente novamente.');
    }
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  isValidEmail(email: string): boolean {
    // RegEx simples para validação de e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  clearFields() {
    this.email = '';
    this.password = '';
  }
}
