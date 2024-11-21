import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Função para login com e-mail e senha
  async login(email: string, password: string): Promise<string> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user?.uid || ''; // Retorna o uid do usuário
    } catch (error) {
      throw error; // Propaga o erro para ser tratado no componente
    }
  }

  // Função para registro de um novo usuário com e-mail e senha
  async createUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      // Cria um novo usuário no Firebase com o e-mail e senha fornecidos
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential; // Retorna o objeto de credenciais do novo usuário
    } catch (error) {
      throw error; // Propaga o erro para ser tratado no componente
    }
  }

  // Função para login com Google
  async googleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const userCredential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return userCredential; // Retorna o objeto de credenciais do Google
    } catch (error) {
      throw error; // Propaga o erro para ser tratado no componente
    }
  }

  // Função para logout do Firebase
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    } catch (error) {
      throw error; // Propaga o erro para ser tratado no componente
    }
  }

  // Função para obter o usuário atual. Retorna uma Promise do tipo User | null
  getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;  // Retorna o usuário atual ou null (isso é uma Promise)
  }
}

