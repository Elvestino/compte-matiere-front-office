import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOrdreComponent } from './print-ordre.component';

describe('PrintOrdreComponent', () => {
  let component: PrintOrdreComponent;
  let fixture: ComponentFixture<PrintOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintOrdreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
