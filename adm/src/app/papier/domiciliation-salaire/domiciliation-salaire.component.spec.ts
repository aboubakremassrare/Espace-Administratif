import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomiciliationSalaireComponent } from './domiciliation-salaire.component';

describe('DomiciliationSalaireComponent', () => {
  let component: DomiciliationSalaireComponent;
  let fixture: ComponentFixture<DomiciliationSalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomiciliationSalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomiciliationSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
