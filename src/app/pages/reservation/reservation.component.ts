import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerrainService, Terrain } from '../../services/terrain.service';
import { MembreService, Membre } from '../../services/membre.service';
import {
  RencontreService,
  Creneau,
  RencontreResponse,
} from '../../services/rencontre.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  terrains: Terrain[] = [];
  membres: Membre[] = [];
  creneaux: Creneau[] = [];

  terrainId: number | null = null;
  date: string = '';
  organisateurId: number | null = null;
  visibilite: string = 'PRIVE';

  creneauChoisi: Creneau | null = null;
  message: string = '';
  erreur: string = '';

  constructor(
    private terrainService: TerrainService,
    private membreService: MembreService,
    private rencontreService: RencontreService,
  ) {}

  ngOnInit(): void {
    this.terrainService.getAllTerrains().subscribe({
      next: (data) => (this.terrains = data),
      error: () => (this.erreur = 'Impossible de charger les terrains.'),
    });
    this.membreService.getMembres().subscribe({
      next: (data) => (this.membres = data),
      error: () => (this.erreur = 'Impossible de charger les membres.'),
    });
  }

  chargerCreneaux(): void {
    this.message = '';
    this.erreur = '';
    this.creneauChoisi = null;
    this.creneaux = [];

    if (!this.terrainId || !this.date) {
      this.erreur = 'Choisissez un terrain et une date.';
      return;
    }

    this.rencontreService.getCreneaux(this.terrainId, this.date).subscribe({
      next: (data) => {
        this.creneaux = data;
        if (data.length === 0) {
          this.message = 'Aucun créneau (site fermé ce jour-là ?).';
        }
      },
      error: (err) => {
        this.erreur =
          err.error?.message || 'Erreur lors du chargement des créneaux.';
      },
    });
  }

  choisirCreneau(creneau: Creneau): void {
    if (!creneau.disponible) return;
    this.creneauChoisi = creneau;
    this.message = '';
    this.erreur = '';
  }

  reserver(): void {
    this.message = '';
    this.erreur = '';

    if (!this.creneauChoisi || !this.terrainId || !this.organisateurId) {
      this.erreur = 'Sélectionnez un créneau et un organisateur.';
      return;
    }

    this.rencontreService
      .creerRencontre({
        organisateurId: this.organisateurId,
        terrainId: this.terrainId,
        debut: this.creneauChoisi.debut,
        visibilite: this.visibilite,
      })
      .subscribe({
        next: (res: RencontreResponse) => {
          this.message = `Réservation confirmée : ${res.terrainNom} le ${res.debut} (${res.visibilite}).`;
          this.chargerCreneaux(); // rafraîchit pour montrer le créneau désormais pris
        },
        error: (err) => {
          this.erreur = err.error?.message || 'Réservation impossible.';
        },
      });
  }

  // Affiche juste l'heure "08:00" à partir de "2026-09-01T08:00:00"
  heure(iso: string): string {
    return iso.substring(11, 16);
  }
}