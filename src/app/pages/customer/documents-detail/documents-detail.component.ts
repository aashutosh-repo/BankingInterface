import { Component } from '@angular/core';
import {DocumentDTO } from '../../../model/interfaces/DocumentDTO.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-detail',
  imports: [CommonModule,FormsModule],
  templateUrl: './documents-detail.component.html',
  styleUrl: './documents-detail.component.css'
})
export class DocumentsDetailComponent {

  docDto: DocumentDTO = {} as DocumentDTO;
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
    this.router.navigate(['customer/address']);
  }

}
