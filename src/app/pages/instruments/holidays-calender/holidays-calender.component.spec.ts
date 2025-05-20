import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysCalenderComponent } from './holidays-calender.component';

describe('HolidaysCalenderComponent', () => {
  let component: HolidaysCalenderComponent;
  let fixture: ComponentFixture<HolidaysCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidaysCalenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidaysCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
