import { Component, inject } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';
import { IUserDTO, UserRequest } from '../../model/interfaces/UserDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';

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
  user: UserRequest ={
    username: '',
    password: ''
  }

  verifyUser() {
    this.loginservice.login(this.user).subscribe({
      next: (response) => {      if (response.errorId === "404") { // ✅ Error object received via Observable
        this.errorService.showError(response.errorId, response.message);
      } else {
        sessionStorage.setItem('userDetails', JSON.stringify(response));
        this.route.navigate(["/main"]);
      }
      },
      error: (err) => {
        debugger
        if (err.status === 404) {
          this.errorService.showError("404", "User Not Found");
        } else {
          this.errorService.showError("500", "Something went wrong. Please try again.");
        }
      }
    });
  }

}
