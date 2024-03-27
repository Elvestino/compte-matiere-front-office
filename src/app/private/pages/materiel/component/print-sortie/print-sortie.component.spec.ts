import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSortieComponent } from './print-sortie.component';

describe('PrintSortieComponent', () => {
  let component: PrintSortieComponent;
  let fixture: ComponentFixture<PrintSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintSortieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
