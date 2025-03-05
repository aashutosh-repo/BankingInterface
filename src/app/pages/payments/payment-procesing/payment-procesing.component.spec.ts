import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProcesingComponent } from './payment-procesing.component';

describe('PaymentProcesingComponent', () => {
  let component: PaymentProcesingComponent;
  let fixture: ComponentFixture<PaymentProcesingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentProcesingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentProcesingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
