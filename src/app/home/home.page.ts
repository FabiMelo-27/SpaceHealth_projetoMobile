// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
// })
// export class HomePage {
//   constructor(private router: Router) {}

//   goToLogin() {
//     this.router.navigate(['login']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 5000);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
