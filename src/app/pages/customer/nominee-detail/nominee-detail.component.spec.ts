import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeDetailComponent } from './nominee-detail.component';

describe('NomineeDetailComponent', () => {
  let component: NomineeDetailComponent;
  let fixture: ComponentFixture<NomineeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomineeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomineeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
