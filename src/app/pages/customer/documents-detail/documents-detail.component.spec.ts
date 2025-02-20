import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDetailComponent } from './documents-detail.component';

describe('DocumentsDetailComponent', () => {
  let component: DocumentsDetailComponent;
  let fixture: ComponentFixture<DocumentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
