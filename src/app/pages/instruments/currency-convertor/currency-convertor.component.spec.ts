import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConvertorComponent } from './currency-convertor.component';

describe('CurrencyConvertorComponent', () => {
  let component: CurrencyConvertorComponent;
  let fixture: ComponentFixture<CurrencyConvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyConvertorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
