import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  constructor(private router: Router) {}

  navegarParaPerfil() {
    this.router.navigate(['/perfil']);
  }



  sair() {
    // Lógica para sair (por exemplo, limpar autenticação)
    // Redirecionar para a página de login ou inicial
    this.router.navigate(['/login']);
  }

  
  
}

