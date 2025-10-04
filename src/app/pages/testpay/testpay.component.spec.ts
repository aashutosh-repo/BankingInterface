import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpayComponent } from './testpay.component';

describe('TestpayComponent', () => {
  let component: TestpayComponent;
  let fixture: ComponentFixture<TestpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestpayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
