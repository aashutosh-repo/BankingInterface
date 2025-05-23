import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFailureChartComponent } from './success-failure-chart.component';

describe('SuccessFailureChartComponent', () => {
  let component: SuccessFailureChartComponent;
  let fixture: ComponentFixture<SuccessFailureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessFailureChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessFailureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
