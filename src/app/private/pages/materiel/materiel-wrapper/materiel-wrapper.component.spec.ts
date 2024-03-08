import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielWrapperComponent } from './materiel-wrapper.component';

describe('MaterielWrapperComponent', () => {
  let component: MaterielWrapperComponent;
  let fixture: ComponentFixture<MaterielWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterielWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterielWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
