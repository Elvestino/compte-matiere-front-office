import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreeComponent } from './entree.component';

describe('EntreeComponent', () => {
  let component: EntreeComponent;
  let fixture: ComponentFixture<EntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
