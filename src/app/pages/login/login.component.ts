import { Component, inject } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';
import { IUserDTO } from '../../model/interfaces/UserDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  
  user: IUserDTO ={
    username: '',
    password: '',
  }

  verifyUser(){
    console.log(this.user)
    this.loginservice.login(this.user).subscribe({
      next: (response) => {
        if(response.password === this.user.password && response.username === this.user.username){
          this.route.navigate(["/main"]);
        }
        console.log(response);
      }
    });
  }

}
