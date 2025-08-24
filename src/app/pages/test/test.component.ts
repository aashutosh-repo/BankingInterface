import { Component, OnInit } from '@angular/core';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipes';
import { CardMask } from '../../shared/pipes/card-mask.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  imports: [PhoneFormatPipe, CardMask,CommonModule,ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
    constructor(private http: HttpClient) {}

  stateControl = new FormControl('');
    allStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi'
  ];
  filteredStates: string[] = [];
  showdropdown = false;

  ngOnInit(): void {
    this.filteredStates = this.allStates;
    this.stateControl.valueChanges.subscribe(value => {
      const searchvalue = value?.toLowerCase() ||'';
      this.filteredStates = this.allStates.filter(state =>
        state.toLowerCase().includes(searchvalue)
      );
      this.showdropdown = searchvalue.length > 0 && this.filteredStates.length > 0;
    });
  }

  selectState(state: string): void {
    this.stateControl.setValue(state, { emitEvent: false });
    this.showdropdown = false;
  }

    onBlur() {
    setTimeout(() => this.showdropdown = false, 150);
  }

  testServiceCall() {
    setTimeout(() => (this.showdropdown = false), 15000);

    console.log('Service call triggered');

    // Make a dummy HTTP calls to trigger loader
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({
      next: (res) => console.log('Response received:', res),
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Request complete')
    });
  }
}
