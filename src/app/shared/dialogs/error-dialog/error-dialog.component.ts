import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-error-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { errorId: string; errorMessage: string; type: 'Error' | 'Warning' }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
