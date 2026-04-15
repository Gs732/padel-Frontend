import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MembreDialogComponent } from '../../components/membre-dialog/membre-dialog.component';
import { Membre, MembreService } from '../../services/membre.service';

@Component({
  selector: 'app-membres',
  standalone: true,
  imports: [CommonModule, MatTableModule,
    MatButtonModule, MatIconModule, MatDialogModule],
    templateUrl: './membres.component.html',
    styleUrl: './membres.component.scss'
})

export class MembresComponent implements OnInit {
  membres: Membre[] = [];
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'telephone', 'solde', 'actif', 'actions'];

  constructor( private membreService: MembreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this. loadMembres();
  }

loadMembres(): void {
  this.membreService.getMembres().subscribe({
    next: (data: Membre[]) => this.membres = data,
    error: (err: any) => console.error('Erreur chargement membres', err)
  });

}

ouvrirDialog(): void {
  const dialogRef = this.dialog.open(MembreDialogComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe((result: Membre) => {
    if (result) {
      this.membreService.creerMembre(result).subscribe({
        next: () => this.loadMembres(),
        error: (err: any) => console.error('Erreur création membre', err)
      });
    }
  });
}
supprimerMembre(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer ce membre ?')) {
    this.membreService.supprimerMembre(id).subscribe({
      next: () => this.loadMembres(),
      error: (err: any) => console.error('Erreur suppression membre', err)
    });
  }
}

}

