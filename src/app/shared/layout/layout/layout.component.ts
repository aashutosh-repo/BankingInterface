import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer/footer.component';


@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
