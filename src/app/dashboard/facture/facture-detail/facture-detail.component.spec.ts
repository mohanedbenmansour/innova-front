import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureDetailComponent } from './facture-detail.component';

describe('FactureDetailComponent', () => {
  let component: FactureDetailComponent;
  let fixture: ComponentFixture<FactureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
