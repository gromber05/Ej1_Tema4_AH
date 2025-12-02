import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-spring-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <section class="card">
      <h2>Datos desde API Spring Boot (Render)</h2>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Angular_full_color_logo.svg"
        alt="Imagen secundaria"
        class="second-image"
      />

      <button (click)="loadSpringData()" [disabled]="loading">
        {{ loading ? 'Cargando...' : 'Obtener datos de mi API' }}
      </button>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="data" class="result">
        <h3>Respuesta de la API:</h3>
        <pre>{{ data | json }}</pre>
      </div>
    </section>
  `,
  styles: [`
    .card {
      max-width: 600px;
      margin: 0 auto;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      text-align: center;
    }

    .second-image {
      max-width: 200px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }

    .error {
      color: #b00020;
      font-weight: 500;
    }

    .result {
      width: 100%;
      text-align: left;
    }

    pre {
      background: #f5f5f5;
      padding: 0.75rem;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class SpringPageComponent {

  data: any = null;
  loading = false;
  error: string | null = null;

  // TODO: cambia esta URL por la de tu API en Render
  private springApiUrl = 'https://TU_URL_DE_RENDER/api/loquesea';

  constructor(private http: HttpClient) {}

  loadSpringData(): void {
    this.loading = true;
    this.error = null;
    this.data = null;

    this.http.get(this.springApiUrl).subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al conectar con la API de Spring Boot.';
        this.loading = false;
      }
    });
  }
}
