import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from '../../../pages/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserResponse } from '../../../model/interfaces/security/UserDetails.model';
import { MatOptionModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatFormFieldModule, MatToolbarModule, MatButtonModule, 
    MatIconModule, MatSidenavModule, MatOptionModule, MatSelectModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog,
              private router: Router
  ) {}
  isExpanded = false;
  userDetails: UserResponse | null = null;
  showUserDetails: boolean = false;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  toggleUserDetails() {
    this.showUserDetails = !this.showUserDetails;
  }
  
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
        width: '400px',
        height: '520px',
        disableClose: false
      });
      dialogRef.afterClosed().subscribe((userRes: UserResponse) => {
        if (userRes) {
          this.userDetails = userRes;
          console.log('User details from dialog:', this.userDetails);
        }
      });
  }
  onMenuSelect(event: MatSelectChange) {
    const option = event.value;
  switch (option) {
    case 'home':
      this.router.navigate(['/home']);
      break;
    case 'docs':
      this.router.navigate(['/docs']);
      break;
    case 'shortcut':
      this.router.navigate(['/shortcut']);
      break;
    case 'about':
      this.router.navigate(['/about']);
      break;
  }
}
}
