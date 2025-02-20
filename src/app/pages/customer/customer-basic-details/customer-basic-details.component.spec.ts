import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBasicDetailsComponent } from './customer-basic-details.component';

describe('CustomerBasicDetailsComponent', () => {
  let component: CustomerBasicDetailsComponent;
  let fixture: ComponentFixture<CustomerBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerBasicDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
