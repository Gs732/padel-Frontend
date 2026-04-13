import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreDialogComponent } from './membre-dialog.component';

describe('MembreDialogComponent', () => {
  let component: MembreDialogComponent;
  let fixture: ComponentFixture<MembreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembreDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
