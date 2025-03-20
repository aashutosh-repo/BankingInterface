import { Component } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(private errorService: ErrorService,private dialog: MatDialog) {}

  triggerError() {
    this.errorService.showError('404', 'Page Not Found', 'Error');
  }

  showSuccessDialog() {
    this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }
}
