import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MembresComponent } from './pages/membres/membres.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { TerrainsComponent } from './pages/terrains/terrains.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'membres', component: MembresComponent },
    { path: 'terrains', component: TerrainsComponent },
    { path: 'reservations', component: ReservationsComponent },
    { path: '**', redirectTo: '' }
    
];
