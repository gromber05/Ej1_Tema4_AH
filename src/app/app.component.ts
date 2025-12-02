import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <h1>Ej1 Tema 4 - Gonzalo Romero Bernal</h1>
      <nav>
        <a routerLink="/earthquake" routerLinkActive="active">Terremotos</a>
        <a routerLink="/spring" routerLinkActive="active">API Spring Boot</a>
      </nav>
    </header>

    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      background-color: #222;
      color: #fff;
    }

    nav {
      display: flex;
      gap: 1rem;
    }

    a {
      color: #ddd;
      text-decoration: none;
    }

    a.active {
      font-weight: bold;
      text-decoration: underline;
    }

    .container {
      padding: 1.5rem;
    }
  `]
})
export class AppComponent { }
