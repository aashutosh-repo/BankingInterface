import { Component, inject } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';
import { IUserDTO, UserRequest, UserResponse } from '../../model/interfaces/UserDetails.model';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';
import { Oauth2Service } from '../../services/security/oauth2.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  dialogRef = inject(MatDialogRef<LoginComponent>, { optional: true });

  loginservice = inject(LoginServicesService);
  route = inject(Router);
  errorService = inject(ErrorService);
  errorMessage: string = '';
  user: UserRequest ={
    username: '',
    password: ''
  }

  constructor(private Oauth2Service: Oauth2Service,
  ) {}

  verifyUser(): void {
    this.Oauth2Service.login(this.user)?.subscribe(
      (response) => {
        console.log('Login successful, Token:', response.token);
        this.Oauth2Service.saveToken(response.token);

        const userResponse: UserResponse = {
          token: response.token,
          userName: this.user.username,
          firstName: response.firstName,
          lastName: response.lastName,
          lastLogin: response.lastLogin,
        };

        console.log(response.token)
        if(this.dialogRef){
          this.dialogRef.close(userResponse);
        }else{
          this.route.navigate(['/main']); // Redirect after login
        }
      },  
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

  // verifyUser() {
  //   this.Oauth2Service.login(this.user)?.subscribe({
  //     next: (response) => {
  //       debugger;
  //       if (response.token === null) { // ✅ Error object received via Observable
  //         this.errorService.showError('401','Invalid Credentials');
  //       } else {
  //         sessionStorage.setItem('userDetails', JSON.stringify(response));
  //         this.route.navigate(["/main"]);
  //       }
  //       },
  //       error: (err) => {
  //         if (err.status === 404) {
  //           this.errorService.showError("404", "User Not Found");
  //         } else {
  //           this.errorService.showError("500", "Something went wrong. Please try again.");
  //         }
  //       }
  //     });




  //   this.loginservice.login(this.user).subscribe({
  //     next: (response) => {      if (response.errorId === "404") { // ✅ Error object received via Observable
  //       this.errorService.showError(response.errorId, response.message);
  //     } else {
  //       sessionStorage.setItem('userDetails', JSON.stringify(response));
  //       this.route.navigate(["/main"]);
  //     }
  //     },
  //     error: (err) => {
  //       if (err.status === 404) {
  //         this.errorService.showError("404", "User Not Found");
  //       } else {
  //         this.errorService.showError("500", "Something went wrong. Please try again.");
  //       }
  //     }
  //   });
  // }

}
