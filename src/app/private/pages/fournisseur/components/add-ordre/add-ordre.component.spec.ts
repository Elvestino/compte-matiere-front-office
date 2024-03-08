import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdreComponent } from './add-ordre.component';

describe('AddOrdreComponent', () => {
  let component: AddOrdreComponent;
  let fixture: ComponentFixture<AddOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrdreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
