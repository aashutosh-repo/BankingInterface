import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, 
    MatIconModule, MatSidenavModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isExpanded = false;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
