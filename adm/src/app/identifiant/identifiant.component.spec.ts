import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiantComponent } from './identifiant.component';

describe('IdentifiantComponent', () => {
  let component: IdentifiantComponent;
  let fixture: ComponentFixture<IdentifiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
