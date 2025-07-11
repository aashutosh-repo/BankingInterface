import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsHomeComponent } from './instruments-home.component';

describe('InstrumentsHomeComponent', () => {
  let component: InstrumentsHomeComponent;
  let fixture: ComponentFixture<InstrumentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
