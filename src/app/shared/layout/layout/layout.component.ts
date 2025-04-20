import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
