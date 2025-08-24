
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet, Event as RouterEvent } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoaderService } from './services/utility/loader.service';
import { LoadingComponent } from './shared/dialogs/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet, MatToolbarModule, MatButtonModule,
    CommonModule,
    LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'bank-app';
    loading$: Observable<boolean>;

  constructor(private router: Router,
    private loaderService: LoaderService,
  ) {
    this.loading$ = this.loaderService.loading$
  }

  ngOnInit() {
        this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    });

    // Subscribe to loader state
    // this.loaderService.loading$.subscribe(state => {
    // this.loading$ = this.loaderService.loading$;
    // });
  }
}
