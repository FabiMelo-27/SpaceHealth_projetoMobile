// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';
// import firebase from 'firebase/compat/app';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private afAuth: AngularFireAuth, private router: Router) { }

//   async login(email: string, password: string) {
//     try {
//       await this.afAuth.signInWithEmailAndPassword(email, password);
//       this.router.navigate(['success']);
//     } catch (error) {
//       this.router.navigate(['failure']);
//     }
//   }

//   async googleLogin() {
//     try {
//       await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
//       this.router.navigate(['success']);
//     } catch (error) {
//       this.router.navigate(['failure']);
//     }
//   }

//   logout() {
//     this.afAuth.signOut();
//   }
// }


import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['dashboard']); // Redireciona apenas se o login for bem-sucedido
    } catch (error) {
      throw new Error('Login failed'); // Lança um erro se a autenticação falhar
    }
  }

  async googleLogin() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['dashboard']);
    } catch (error) {
      throw new Error('Google login failed'); // Lança um erro se a autenticação falhar
    }
  }

  logout() {
    return this.afAuth.signOut();
  }
}
