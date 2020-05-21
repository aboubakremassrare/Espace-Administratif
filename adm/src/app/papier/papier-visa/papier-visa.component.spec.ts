import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PapierVisaComponent } from './papier-visa.component';

describe('PapierVisaComponent', () => {
  let component: PapierVisaComponent;
  let fixture: ComponentFixture<PapierVisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PapierVisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PapierVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
