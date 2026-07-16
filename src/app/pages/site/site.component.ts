import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SiteDialogComponent } from '../../components/site-dialog/site-dialog.component';
import { Site, SiteService } from '../../services/site.service';

@Component({
    selector: 'app-site',
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './site.component.html',
    styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {

  sites: Site[] = [];
  displayedColumns: string[] = ['id', 'nom', 'adresse', 'ville', 'telephone', 'actif', 'actions'];

  constructor(
    private siteService: SiteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSites();
  }

  loadSites(): void {
    this.siteService.getAllSites().subscribe({
      next: (data: Site[]) => this.sites = data,
      error: (err: any) => console.error('Erreur chargement sites', err)
    });
  }

  ouvrirDialog(): void {
    const dialogRef = this.dialog.open(SiteDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Site) => {
      if (result) {
        this.siteService.creerSite(result).subscribe({
          next: () => this.loadSites(),
          error: (err: any) => console.error('Erreur création site', err)
        });
      }
    });
  }

  supprimerSite(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce site ?')) {
      this.siteService.supprimerSite(id).subscribe({
        next: () => this.loadSites(),
        error: (err: any) => console.error('Erreur suppression site', err)
      });
    }
  }
}