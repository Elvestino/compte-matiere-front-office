import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEntreeComponent } from './print-entree.component';

describe('PrintEntreeComponent', () => {
  let component: PrintEntreeComponent;
  let fixture: ComponentFixture<PrintEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintEntreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
