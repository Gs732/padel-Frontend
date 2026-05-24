import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainDialogComponent } from './terrain-dialog.component';

describe('TerrainDialogComponent', () => {
  let component: TerrainDialogComponent;
  let fixture: ComponentFixture<TerrainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerrainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
