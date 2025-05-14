import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchDialogComponent } from './customer-search-dialog.component';

describe('CustomerSearchDialogComponent', () => {
  let component: CustomerSearchDialogComponent;
  let fixture: ComponentFixture<CustomerSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSearchDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
