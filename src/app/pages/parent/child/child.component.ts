import { Component, EventEmitter, input, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRequest } from '../../../model/interfaces/security/UserDetails.model';

@Component({
  selector: 'app-child',
  imports: [FormsModule, CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  @Input() user: UserRequest = { username: '', password: '' };
  @Output() userChange = new EventEmitter<UserRequest>();
  @Input() buttonFlag: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      console.log('Child received user:', this.user);
    }
  }

  updateUser() {
    const updatedUser: UserRequest = {
      username: 'updated_' + this.user.username,
      password: this.user.password + '_updated'
    };
    this.userChange.emit(updatedUser);
  }
}
