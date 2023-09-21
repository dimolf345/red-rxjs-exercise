import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <a class="header__logo" routerLink="/">
        <img src="../assets/logo.svg" alt="RED software system logo" />
      </a>
      <h1 class="header__title h1">RxDB Library</h1>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
