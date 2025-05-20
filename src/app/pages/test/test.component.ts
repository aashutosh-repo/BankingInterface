import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';



@Component({
  selector: 'app-test',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    QRCodeComponent ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent{
  qrData: string = '';
  showQR = false;
    private fb = inject(FormBuilder); // ✅ Proper DI in standalone


  paymentForm = this.fb.group({
    customerName: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]]
  });


  generateQR() {
    if (this.paymentForm.valid) {
      const { customerName, amount } = this.paymentForm.value;
      this.qrData = JSON.stringify({ customerName, amount });
      this.showQR = true;
    }
  }
}