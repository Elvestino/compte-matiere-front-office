import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintQuitusComponent } from './print-quitus.component';

describe('PrintQuitusComponent', () => {
  let component: PrintQuitusComponent;
  let fixture: ComponentFixture<PrintQuitusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintQuitusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintQuitusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
