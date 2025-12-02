import { Routes } from '@angular/router';
import { EarthquakePageComponent } from './pages/earthquake-page/earthquake-page.component';
import { SpringPageComponent } from './pages/spring-page/spring-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'earthquake', pathMatch: 'full' },
  { path: 'earthquake', component: EarthquakePageComponent },
  { path: 'spring', component: SpringPageComponent },
  { path: '**', redirectTo: 'earthquake' },
];
