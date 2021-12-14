import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureUpdateComponent } from './facture-update.component';

describe('FactureUpdateComponent', () => {
  let component: FactureUpdateComponent;
  let fixture: ComponentFixture<FactureUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
