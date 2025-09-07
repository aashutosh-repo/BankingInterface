import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkPaymentsComponent } from './bulk-payments.component';

describe('BulkPaymentsComponent', () => {
  let component: BulkPaymentsComponent;
  let fixture: ComponentFixture<BulkPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
