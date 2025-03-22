import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCustomerDetailsComponent } from './preview-customer-details.component';

describe('PreviewCustomerDetailsComponent', () => {
  let component: PreviewCustomerDetailsComponent;
  let fixture: ComponentFixture<PreviewCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCustomerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
