import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModifyAccountComponent } from './create-modify-account.component';

describe('CreateModifyAccountComponent', () => {
  let component: CreateModifyAccountComponent;
  let fixture: ComponentFixture<CreateModifyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModifyAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
