import { Component, inject } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';
import { Oauth2Service } from '../../services/security/oauth2.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRequest, UserResponse } from '../../model/interfaces/security/UserDetails.model';

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
  user: UserRequest = {
    username: '',
    password: ''
  }

  userResponse!: UserResponse;

  constructor(private oauth2Service: Oauth2Service,
  ) {}

  verifyUser(): void {
    console.log("Existing Token ",this.oauth2Service.getToken());
    this.oauth2Service.login(this.user)?.subscribe(
      (response: UserResponse) => {
        console.log('Login successful...');
        this.oauth2Service.saveToken(response.token);
        this.oauth2Service.setExpiryTime(response);
        this.userResponse= response;
        if(this.dialogRef){
          this.dialogRef.close(this.userResponse);
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
}