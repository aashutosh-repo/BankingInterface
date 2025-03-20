import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../pages/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private dialog = inject(MatDialog);

  showError(errorId: string, errorMessage: string, type: 'Error' | 'Warning' = 'Error') {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: { errorId, errorMessage, type },
    });
  }
}
