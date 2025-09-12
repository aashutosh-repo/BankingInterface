import { Component } from '@angular/core';
import { ChildComponent } from './child/child.component';
import { UserRequest } from '../../model/interfaces/security/UserDetails.model';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

  user: UserRequest = {
    username: 'aashu',
    password: 'password123'
  };
  buttonFlag:boolean = false;
  toggleButton() {
    this.buttonFlag = !this.buttonFlag;
  }

  updateUser() {
    this.user = {
      username: 'parent_updated_' + this.user.username,
      password: this.user.password + '_parent'
    };
    console.log('Parent updated user:', this.user);
    this.buttonFlag = true;
  }

  onUserChange(updatedUser: UserRequest) {
    this.user = updatedUser;
    console.log('Parent received updated user:', this.user);
  }
}