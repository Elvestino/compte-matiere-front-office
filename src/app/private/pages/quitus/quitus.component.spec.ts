import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitusComponent } from './quitus.component';

describe('QuitusComponent', () => {
  let component: QuitusComponent;
  let fixture: ComponentFixture<QuitusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuitusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuitusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
