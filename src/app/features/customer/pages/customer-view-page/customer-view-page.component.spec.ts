import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewPageComponent } from './customer-view-page.component';

describe('CustomerViewPageComponent', () => {
  let component: CustomerViewPageComponent;
  let fixture: ComponentFixture<CustomerViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
