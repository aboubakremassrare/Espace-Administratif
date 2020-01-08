import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationSalaireComponent } from './attestation-salaire.component';

describe('AttestationSalaireComponent', () => {
  let component: AttestationSalaireComponent;
  let fixture: ComponentFixture<AttestationSalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationSalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
