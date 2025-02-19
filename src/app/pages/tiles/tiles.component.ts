import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.css'
})
export class TilesComponent {
  imageUrl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3-UtWQRqzG5s1R4IFN0QXck5hXvNqsGebllIAqXNeXRFVpx6OESz1fsV7a26OBJv64k0_2tjkTLOZTpTIbHM8HJyJTwoFkeFHHEaE7Kk8b3HySLsDntiKQGaby38ljp5Sicp0molZJtIpQ41vrbZw9kHu7Doq2tU2I0Umk42RjJO0jc9uH35ULBXzsRWT/s320/BankLogo.jpg'
  cards = [
    { title: 'Cuatomer Management', description: 'Customer Details | Address | Nominee ', image: 'customer Management.png', link: '/homepage' },
    { title: 'Account Management', description: 'Account Details | Creation | Update | Delete', image: '1570781597816.png', link: '/allAccountsHome' },
    { title: 'Trade Finance', description: 'LOC | Agreement | Tracking', image: 'Trade-finance.png', link: '#' },
    { title: 'Instruments', description: 'Loan EMI | Currency Conversion | SIP Calculator ', image: 'bankingInstruments.png', link: '#' },
    { title: 'Cash Deposit', description: 'Cash Transaction', image: 'cash-Deposite.png', link: '#' },
    { title: 'Account Transfer ', description: 'Account to Account transfer ', image: 'a2aMoneytransfer.png', link: '#' }  ];
}
