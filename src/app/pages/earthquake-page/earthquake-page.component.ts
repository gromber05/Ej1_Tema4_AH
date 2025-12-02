import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface EarthquakeProperties {
  mag: number;
  place: string;
  time: number;
  url: string;
}

interface EarthquakeFeature {
  properties: EarthquakeProperties;
}

interface EarthquakeResponse {
  features: EarthquakeFeature[];
}

@Component({
  selector: 'app-earthquake-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <section class="card">
      <h2>Información del último terremoto registrado</h2>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
        alt="Planeta Tierra"
        class="earth-image"
      />

      <button (click)="loadLastEarthquake()" [disabled]="loading">
        {{ loading ? 'Cargando...' : 'Obtener último terremoto' }}
      </button>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="earthquake" class="result">
        <h3>Último terremoto:</h3>
        <p><strong>Magnitud:</strong> {{ earthquake.mag }}</p>
        <p><strong>Lugar:</strong> {{ earthquake.place }}</p>
        <p><strong>Fecha y hora:</strong> {{ earthquake.time | date:'short' }}</p>
        <p>
          <strong>Más información:</strong>
          <a [href]="earthquake.url" target="_blank" rel="noopener noreferrer">USGS</a>
        </p>
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

    .earth-image {
      max-width: 250px;
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
  `]
})
export class EarthquakePageComponent {

  earthquake: EarthquakeProperties | null = null;
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  loadLastEarthquake(): void {
    this.loading = true;
    this.error = null;
    this.earthquake = null;

    // API USGS - último terremoto (formato GeoJSON)
    const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query' +
      '?format=geojson&orderby=time&limit=1';

    this.http.get<EarthquakeResponse>(url).subscribe({
      next: (response) => {
        if (response.features && response.features.length > 0) {
          this.earthquake = response.features[0].properties;
        } else {
          this.error = 'No se han encontrado datos de terremotos.';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Ha ocurrido un error al obtener los datos.';
        this.loading = false;
      }
    });
  }
}
