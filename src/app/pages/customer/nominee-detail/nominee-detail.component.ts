import { Component } from '@angular/core';
import { NomineeDetails } from '../../../model/interfaces/nomineeDetails.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nominee-detail',
  imports: [FormsModule,CommonModule],
  templateUrl: './nominee-detail.component.html',
  styleUrl: './nominee-detail.component.css'
})
export class NomineeDetailComponent {

  nomineeDetail: NomineeDetails = {} as NomineeDetails;

  constructor(private router: Router) {}

  submit() {
    // Save data to session storage
    sessionStorage.setItem('nomineeDetails', JSON.stringify(this.nomineeDetail));

    console.log(this.nomineeDetail)
    // Navigate to submission or confirmation page
    this.router.navigate(['/customer-details/submit']);
  }

}
