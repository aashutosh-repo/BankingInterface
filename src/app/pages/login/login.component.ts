import { Component, inject, Optional } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';
import { IUserDTO, UserRequest, UserResponse } from '../../model/interfaces/UserDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';
import { Oauth2Service } from '../../services/security/oauth2.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginservice = inject(LoginServicesService);
  route = inject(Router);
 errorService = inject(ErrorService);
 errorMessage: string = '';
  user: UserRequest ={
    username: '',
    password: ''
  }

  constructor(private Oauth2Service: Oauth2Service,
    @Optional() private dialogRef: MatDialogRef<LoginComponent>
    //Note : MatDialogRef is optional because this component may be used in different contexts
  ) {}



  verifyUser(): void {
    this.Oauth2Service.login(this.user)?.subscribe(
      (response) => {
        console.log('Login successful, Response :', response);
        this.Oauth2Service.saveToken(response.token);
        this.dialogRef.close(response)
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
