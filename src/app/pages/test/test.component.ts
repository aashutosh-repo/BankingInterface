import { Component, OnInit } from '@angular/core';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipes';
import { CardMask } from '../../shared/pipes/card-mask.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tokenizeCard } from '../../sdk/sdk';



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

    // this.tokenizeCard(this.cardsdata).forEach(res => console.log(res));
    // this.doTokenize().then(res => console.log(res));
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

  cardsdata ={ cardNumber: '4111111111111111', expiry: '12/25', cvv: '123' };

  private apiUrl = 'http://localhost:4000/tokenize';
  //   tokenizeCard(card: { cardNumber: string; expiry: string; cvv: string }): Observable<TokenResponse> {
  //   return this.http.post<TokenResponse>(this.apiUrl, card);
  // }

  async doTokenize() {
    debugger;
  const res = await tokenizeCard({
    cardNumber: '4111111111111111',
    expiry: '12/29',
    cvv: '123'
  });
  console.log('Token:', res);
  return res;
}

}

export interface TokenResponse {
  token: string;
  last4: string;
  scheme: string;
  expiry: string;
}