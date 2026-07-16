import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TerrainDialogComponent } from '../../components/terrain-dialog/terrain-dialog.component';
import { Terrain, TerrainService } from '../../services/terrain.service';

@Component({
    selector: 'app-terrains',
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './terrains.component.html',
    styleUrl: './terrains.component.css'
})
export class TerrainsComponent implements OnInit {

  terrains: Terrain[] = [];
  displayedColumns: string[] = ['id', 'nom', 'type', 'interieur', 'actif', 'siteId', 'actions'];

  constructor(
    private terrainService: TerrainService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTerrains();
  }

  loadTerrains(): void {
    this.terrainService.getAllTerrains().subscribe({
      next: (data: Terrain[]) => this.terrains = data,
      error: (err: any) => console.error('Erreur chargement terrains', err)
    });
  }

  ouvrirDialog(): void {
    const dialogRef = this.dialog.open(TerrainDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Terrain) => {
      if (result) {
        this.terrainService.creerTerrain(result).subscribe({
          next: () => this.loadTerrains(),
          error: (err: any) => console.error('Erreur création terrain', err)
        });
      }
    });
  }

  supprimerTerrain(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce terrain ?')) {
      this.terrainService.supprimerTerrain(id).subscribe({
        next: () => this.loadTerrains(),
        error: (err: any) => console.error('Erreur suppression terrain', err)
      });
    }
  }
}