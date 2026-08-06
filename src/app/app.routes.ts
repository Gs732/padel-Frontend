import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MembresComponent } from './pages/membres/membres.component';
import { TerrainsComponent } from './pages/terrains/terrains.component';
import { SiteComponent } from './pages/site/site.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ReservationComponent } from './pages/reservation/reservation.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'membres', component: MembresComponent, canActivate: [authGuard] },
  { path: 'sites', component: SiteComponent, canActivate: [authGuard] },
  { path: 'reservations', component: ReservationComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];