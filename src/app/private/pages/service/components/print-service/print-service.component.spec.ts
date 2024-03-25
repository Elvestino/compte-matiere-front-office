import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintServiceComponent } from './print-service.component';

describe('PrintServiceComponent', () => {
  let component: PrintServiceComponent;
  let fixture: ComponentFixture<PrintServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
