import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUserDTO } from '../../model/interfaces/UserDetails.model';


@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit{

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  showUserDetails: boolean = false; // To toggle user details visibility
  userDetails: IUserDTO | null = null;
  userDTO : IUserDTO ={
    errorId:'',
    message:'',
    userId: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    lastLogin: ''
  };
  imageUrl = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3-UtWQRqzG5s1R4IFN0QXck5hXvNqsGebllIAqXNeXRFVpx6OESz1fsV7a26OBJv64k0_2tjkTLOZTpTIbHM8HJyJTwoFkeFHHEaE7Kk8b3HySLsDntiKQGaby38ljp5Sicp0molZJtIpQ41vrbZw9kHu7Doq2tU2I0Umk42RjJO0jc9uH35ULBXzsRWT/s320/BankLogo.jpg'
  cards = [
    { title: 'Cuatomer Management', description: 'Customer Details | Address | Nominee ', image: 'customer Management.png', link: '/customer/customerSearch' },
    { title: 'Account Management', description: 'Account Details | Creation | Update | Delete', image: '1570781597816.png', link: '/allAccountsHome' },
    { title: 'Trade Finance', description: 'LOC | Agreement | Tracking', image: 'Trade-finance.png', link: '#' },
    { title: 'Instruments', description: 'Loan EMI | Currency Conversion | SIP Calculator ', image: 'bankingInstruments.png', link: '#' },
    { title: 'Cash Deposit', description: 'Cash Transaction', image: 'cash-Deposite.png', link: '#' },
    { title: 'Account Transfer ', description: 'Account to Account transfer ', image: 'a2aMoneytransfer.png', link: '#' }  ];

    showuserDetail() {
      if (isPlatformBrowser(this.platformId)) {
        const myUser = sessionStorage.getItem('userDetails');
        if (myUser) {
          this.userDetails = JSON.parse(myUser) as IUserDTO;
          if (Array.isArray(this.userDetails?.lastLogin)) {
            this.userDetails.lastLogin = new Date(
              this.userDetails.lastLogin[0],  // Year
              this.userDetails.lastLogin[1] - 1, // Month (convert 1-based to 0-based)
              this.userDetails.lastLogin[2],  // Day
              this.userDetails.lastLogin[3],  // Hours
              this.userDetails.lastLogin[4],  // Minutes
              this.userDetails.lastLogin[5],  // Seconds
              this.userDetails.lastLogin[6] / 1e6 // Convert nanoseconds to milliseconds
            );
          }
          console.log(this.userDetails); // For debugging
        } else {
          console.log('No user details found.');
        }
      }
    }
  
    // Toggle visibility of user details
    toggleUserDetails() {
      this.showUserDetails = !this.showUserDetails;
    }
  
    ngOnInit(): void {
      this.showuserDetail(); // Fetch user details when the component initializes
    }
  }
