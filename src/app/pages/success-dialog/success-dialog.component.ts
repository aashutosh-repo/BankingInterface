import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-dialog',
  standalone:true,
  imports: [CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {
  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
