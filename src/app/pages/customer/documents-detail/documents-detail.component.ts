import { Component, EventEmitter, Output } from '@angular/core';
import {DocumentDTO } from '../../../model/interfaces/DocumentDTO.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENTS_TYPES } from '../../../constants/dropdowns/CommonDropDowns';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-documents-detail',
  standalone:true,
  imports: [CommonModule,FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  MatIconModule
  ],
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.scss']
})
export class DocumentsDetailComponent {

  docDto: DocumentDTO = {} as DocumentDTO;
  documentType: string[] = DOCUMENTS_TYPES;
  @Output() nextStepToNomineeDetails = new EventEmitter<void>(); // Event to notify parent

  docDtoTest: DocumentDTO =
  {
    "custId": 1001,
    "docDescription": "Passport",
    "docIdentificationNumber": "A1234567",
    "docType": "Government ID",
    "docTypeCode": "PP",
    "issueDate": "2020-06-15",
    "expiryDate": "2030-06-15"
  }
  

  constructor(private router: Router) {}

  nextStep() {
    // Save data to session storage
    sessionStorage.setItem('docDto', JSON.stringify(this.docDtoTest));
    console.log(this.docDto)
    // this.router.navigate(['customer/address']);
    this.nextStepToNomineeDetails.emit();

  }

}
